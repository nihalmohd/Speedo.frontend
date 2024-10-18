import React, { useState, useRef } from 'react';
import { GoUpload } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Modal = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [tripName, settripName] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [report, setReport] = useState(null);
    const speedLimit = 60; 

    const userId = localStorage.getItem("User");
    console.log(tripName);
    const cleanUserId = userId.replace(/['"]/g, '');

 
    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };

    const [data, setData] = useState([]);
    const [results, setResults] = useState({
        TotalDistanceTravelled: 0,
        totalDuration: 0,
        overSpeedDuration: 0,
        overSpeedDistance: 0,
        stoppedDuration: 0,
    });

    const [locations, setLocations] = useState([]); 

    const SPEED_LIMIT = 60; 

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
            calculateMetrics(jsonData);
        };

        reader.readAsBinaryString(file);
    };

    const calculateMetrics = (data) => {
        let totalDistance = 0;
        let totalDuration = 0;
        let overSpeedDur = 0;
        let overSpeedDist = 0;
        let stoppedDur = 0;
        const locs = []; 

        let prevLat = null;
        let prevLong = null;
        let prevTimestamp = null;
        let prevIgnition = null;

        data.forEach((row, index) => {
            const { latitude, longitude, timestamp, ignition } = row;

            
            let currentTimestamp;
            if (typeof timestamp === 'number') {
                
                currentTimestamp = new Date((timestamp - 25569) * 86400 * 1000); 
            } else {
                
                const timestampString = typeof timestamp === 'string' ? timestamp : timestamp.toString();
                currentTimestamp = new Date(timestampString.replace(' ', 'T')); 
            }

            if (isNaN(currentTimestamp)) {
                console.error(`Invalid timestamp at row ${index + 1}: ${timestamp}`);
                return; 
            }

           
            locs.push({ latitude, longitude, });

           
            if (prevLat !== null && prevLong !== null && prevTimestamp !== null) {
                const duration = calculateDuration(prevTimestamp, currentTimestamp); 
                
                if (ignition === 'off' && latitude === prevLat && longitude === prevLong) {
                    stoppedDur += duration; 
                } else {
                    
                    const distance = calculateDistance(prevLat, prevLong, latitude, longitude);
                    totalDistance += distance; 
                    totalDuration += duration; 

                    
                    const speed = (distance / (duration / 3600)); 
                    if (speed > SPEED_LIMIT) {
                        overSpeedDur += duration; 
                        overSpeedDist += distance; 
                    }

                    
                    totalDuration += duration;
                }
            }

           
            prevLat = latitude;
            prevLong = longitude;
            prevTimestamp = currentTimestamp;
            prevIgnition = ignition;
        });

        setResults({
            TotalDistanceTravelled: totalDistance,
            totalDuration: totalDuration,
            overSpeedDuration: overSpeedDur,
            overSpeedDistance: overSpeedDist,
            stoppedDuration: stoppedDur,
        });

        setLocations(locs); 
        console.log(stoppedDur, "this is stopped ");
        console.log(overSpeedDist, "this is overspeed distance ");
        console.log(overSpeedDur, "this is overspeed duration ");
        console.log(totalDuration, "this is total duration ");
        console.log(totalDistance, "this is total distance ");
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; 
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; 
    };

    const calculateDuration = (prevTimestamp, currentTimestamp) => {
        return (currentTimestamp - prevTimestamp) / 1000; 
    };

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hr ${minutes} min`;
    };

    const submitMapData = async (userId, tripName, report) => {
        try {
            const mapData = {
                userId: cleanUserId,
                tripName,
                totalDistanceTravelled: results.TotalDistanceTravelled,
                totalDuration: results.totalDuration,
                overSpeedDuration: results.overSpeedDuration,
                overSpeedDistance: results.overSpeedDistance,
                stoppedDuration: results.stoppedDuration,
                locations: data.map(row => ({
                    latitude: row.latitude,
                    longitude: row.longitude,
                    timestamp: row.timestamp, 
                    ignition: row.ignition,  
                })) 
            };

            const response = await axios.post('http://localhost:5000/mapdata', mapData);
            if (response) {
                alert("Data Added successfully");
                navigate("/Home");
            } else {
                console.log("Network error");
            }

            console.log('Data successfully submitted:', response.data);
        } catch (error) {
            console.error('Error submitting map data:', error);
        }
    };


    return (
        <div>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center  justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white">
                                <div className="w-full h-10 flex justify-end items-end">
                                    <div className="w-8 h-8 text-[#162D3A]" onClick={() => navigate(-1)}>
                                        <IoIosClose className='w-8 h-8' />
                                    </div>
                                </div>
                                <div className="w-full h-full px-9 md:px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <form action="">
                                    <div className="w-full h-10">
                                        <input type="text" className='w-full h-full border border-[#949494] rounded-md font-roboto text-[16px] pl-2' placeholder='Trip Name*' required onChange={(e) => { settripName(e.target.value) }} />
                                    </div>
                                    <div className="w-full h-32 mt-9 border-2 border-[#00B2FF] rounded-md" onClick={handleDivClick}>
                                        <div className="w-full h-24 flex justify-center items-center">
                                            <div className="w-20 h-20">
                                                <GoUpload className='w-20 h-20 text-[#00B2FF]' />
                                            </div>
                                            <input
                                            required
                                                type="file"
                                                ref={fileInputRef}
                                                accept=".csv"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                        </div>
                                        <div className="w-full h-7 flex justify-center items-center">
                                            <h1 className='font-roboto text-[14px] text-[#00B2FF]'>
                                                Click here to upload the <span className='underline cursor-pointer'>Excel</span> sheet of your trip
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-full h-16 flex justify-center items-end gap-3">
                                        <button className="w-1/2 h-10 rounded-md font-roboto text-[20px] text-[#162D3A] border-2 border-[#162D3A] hover:bg-[#162D3A] hover:text-white hover:shadow-md" onClick={() => navigate('/Home')}>Cancel</button>
                                        <button className="w-1/2 h-10 bg-[#162D3A] rounded-md font-roboto text-[20px] text-white hover:bg-white hover:border-2 hover:border-[#162D3A] hover:text-[#162D3A] hover:shadow-md" onClick={() => { submitMapData(userId, tripName, report) }}>Save</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
