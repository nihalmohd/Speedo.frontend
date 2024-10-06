import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelDataProcessor = () => {
    const [data, setData] = useState([]);
    const [results, setResults] = useState({
        TotalDistanceTravelled: 0,
        totalDuration: 0,
        overSpeedDuration: 0,
        overSpeedDistance: 0,
        stoppedDuration: 0,
    });

    const SPEED_LIMIT = 60; // Speed limit in km/h

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

        let prevLat = null;
        let prevLong = null;
        let prevTimestamp = null;
        let prevIgnition = null;

        data.forEach((row, index) => {
            const { latitude, longitude, timestamp, ignition } = row;

            // Check if timestamp is numeric (Excel date format)
            let currentTimestamp;
            if (typeof timestamp === 'number') {
                // Convert Excel numeric date to JS date
                currentTimestamp = new Date((timestamp - 25569) * 86400 * 1000); // Convert Excel date to JS date
            } else {
                // Handle string timestamp
                const timestampString = typeof timestamp === 'string' ? timestamp : timestamp.toString();
                currentTimestamp = new Date(timestampString.replace(' ', 'T')); // Replace space with 'T' for proper parsing
            }

            if (isNaN(currentTimestamp)) {
                console.error(`Invalid timestamp at row ${index + 1}: ${timestamp}`);
                return; // Skip this row if the timestamp is invalid
            }

            // Calculate distance and duration only if previous data exists
            if (prevLat !== null && prevLong !== null && prevTimestamp !== null) {
                const duration = calculateDuration(prevTimestamp, currentTimestamp); // Duration in seconds

                // Check if the vehicle is stopped
                if (ignition === 'off' && latitude === prevLat && longitude === prevLong) {
                    stoppedDur += duration; // Add duration to stopped duration
                } else {
                    // Only accumulate total distance and duration if the vehicle is moving
                    const distance = calculateDistance(prevLat, prevLong, latitude, longitude);
                    totalDistance += distance; // Accumulate total distance
                    totalDuration += duration; // Accumulate total duration

                    // Calculate overspeed metrics
                    const speed = (distance / (duration / 3600)); // Speed in km/h
                    if (speed > SPEED_LIMIT) {
                        overSpeedDur += duration; // Accumulate duration when over speed
                        overSpeedDist += distance; // Accumulate distance when over speed
                    }

                    // If not stopped, add duration to total duration
                    totalDuration += duration; 
                }
            }

            // Update previous values for next iteration
            prevLat = latitude;
            prevLong = longitude;
            prevTimestamp = currentTimestamp;
            prevIgnition = ignition;
        });

        // Set the results state including stopped duration
        setResults({
            TotalDistanceTravelled: totalDistance,
            totalDuration: totalDuration,  // Includes only active duration
            overSpeedDuration: overSpeedDur,
            overSpeedDistance: overSpeedDist,
            stoppedDuration: stoppedDur,  // Stopped duration is now captured here
        });
        console.log(stoppedDur,"this is sotped ");
        
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };

    const calculateDuration = (prevTimestamp, currentTimestamp) => {
        return (currentTimestamp - prevTimestamp) / 1000; // Duration in seconds
    };

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hr ${minutes} min`;
    };
    console.log(results)
    return (
        <div>
            <h1>Excel Data Processor</h1>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <div>
                <h2>Results:</h2>
                <p>Total Distance Travelled: {results.TotalDistanceTravelled.toFixed(2)} km</p>
                <p>Total Duration: {formatDuration(results.totalDuration)}</p>
                <p>Over Speed Duration: {formatDuration(results.overSpeedDuration)}</p>
                <p>Over Speed Distance: {results.overSpeedDistance.toFixed(2)} km</p>
                <p>Stopped Duration: {formatDuration(results.stoppedDuration)}</p> {/* Display stopped duration */}
            </div>
        </div>
    );
};

export default ExcelDataProcessor;
