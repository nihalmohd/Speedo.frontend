import React, { useState } from 'react'
import { GoUpload } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import * as XLSX from 'xlsx';
import { getDistance } from 'geolib';

const Modal = () => {
    const navigate = useNavigate()
    const fileInputRef = useRef(null);
    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically click the file input
        }
        const [fileData, setFileData] = useState(null);
        const [report, setReport] = useState(null);
        const speedLimit = 60; // Define your speed limit for over-speeding

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                setFileData(worksheet); // Store the parsed Excel data
                calculateMetrics(worksheet);
            };

            reader.readAsArrayBuffer(file);
        };

        const calculateMetrics = (data) => {
            let totalDistance = 0;
            let totalDuration = 0;
            let overSpeedDuration = 0;
            let overSpeedDistance = 0;
            let stoppedDuration = 0;

            let lastPoint = null;
            let overSpeedStart = null;
            let stopStart = null;

            data.forEach((row, index) => {
                const { latitude, longitude, timestamp, speed, ignition } = row;

                // Parse the timestamp into a Date object
                const currentTime = new Date(timestamp);

                // Calculate distance from last point
                if (lastPoint) {
                    const distance = getDistance(
                        { latitude: lastPoint.latitude, longitude: lastPoint.longitude },
                        { latitude, longitude }
                    );
                    totalDistance += distance; // Total distance traveled

                    const timeDiff = (currentTime - lastPoint.time) / 1000; // Time difference in seconds
                    totalDuration += timeDiff; // Total travel duration

                    // Check for over-speeding
                    if (speed > speedLimit) {
                        if (!overSpeedStart) overSpeedStart = lastPoint.time; // Start of over-speeding
                        overSpeedDistance += distance; // Add distance traveled while over-speeding
                        overSpeedDuration += timeDiff; // Add time spent over-speeding
                    } else {
                        overSpeedStart = null; // End of over-speeding
                    }

                    // Check for stopped duration
                    if (speed === 0 && ignition === 'on') {
                        if (!stopStart) stopStart = lastPoint.time;
                        stoppedDuration += timeDiff;
                    } else {
                        stopStart = null; // End of stop
                    }
                }

                lastPoint = {
                    latitude,
                    longitude,
                    time: currentTime,
                };
            });

            // Set calculated results
            setReport({
                totalDistance: (totalDistance / 1000).toFixed(2), // Convert to km
                totalDuration: (totalDuration / 3600).toFixed(2), // Convert to hours
                overSpeedDuration: (overSpeedDuration / 3600).toFixed(2), // Convert to hours
                overSpeedDistance: (overSpeedDistance / 1000).toFixed(2), // Convert to km
                stoppedDuration: (stoppedDuration / 3600).toFixed(2), // Convert to hours
            });
        }
    };
    return (
        <div>
            <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white  ">
                                <div className="w-full h-10  flex justify-end items-end ">
                                    <div className="w-8 h-8 text-[#162D3A] " onClick={() => { navigate('/Home') }}>
                                        <IoIosClose className='w-8 h-8' />
                                    </div>
                                </div>
                                <div className="w-full h-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="w-full h-10 ">
                                        <input type="text" className=' w-full h-full border border-[#949494] rounded-md font-roboto text-[16px] pl-2' placeholder='Trip Name* ' />
                                    </div>
                                    <div className="w-full h-32 b mt-9 border-2 border-[#00B2FF] rounded-md" onClick={handleDivClick}>
                                        <div className="w-full h-24  flex justify-center items-center">
                                            <div className="w-20 h-20 ">
                                                <GoUpload className='w-20 h-20 text-[#00B2FF]' />
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                // accept=".xls, .xlsx, .doc, .docx"
                                                className="hidden"
                                            />
                                        </div>
                                        <div className="w-full h-7 flex justify-center items-center">
                                            <h1 className='font-roboto text-[14px] text-[#00B2FF]'>Click here to upload the <span className='underline cursor-pointer'>Excel</span> sheet of your trip</h1>
                                        </div>
                                    </div>
                                    <div className="w-full h-16 flex justify-center items-end gap-3">
                                        <button className="w-1/2 h-10  rounded-md font-roboto text-[20px] text-[#162D3A] border-2 border-[#162D3A] hover:bg-[#162D3A]   hover:text-[#ffff] hover:shadow-md" onClick={() => { navigate('/Home') }}>Cancel</button>
                                        <button className="w-1/2 h-10  bg-[#162D3A] rounded-md font-roboto text-[20px] text-[#FFFFFF] hover:bg-white hover:border-2 hover:border-[#162D3A] hover:text-[#162D3A] hover:shadow-md " onClick={() => { navigate('/Home') }}>Save</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal