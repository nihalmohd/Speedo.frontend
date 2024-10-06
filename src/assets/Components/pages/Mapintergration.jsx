import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as XLSX from 'xlsx';
const Mapintergration = () => {

    const [data, setData] = useState([]);
    const [results, setResults] = useState({
        TotalDistanceTravelled: 0,
        totalDuration: 0,
        overSpeedDuration: 0,
        overSpeedDistance: 0,
        stoppedDuration: 0,
    });
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

        data.forEach(row => {
            const { speed, distance, duration, isStopped } = row;

            totalDistance += distance || 0; // Accumulate total distance
            totalDuration += duration || 0; // Accumulate total duration

            // Calculate overspeed metrics (assuming speed limit is defined)
            if (speed > SPEED_LIMIT) {
                overSpeedDur += duration || 0;
                overSpeedDist += distance || 0;
            }

            // Calculate stopped duration
            if (isStopped) {
                stoppedDur += duration || 0;
            }
        });

        setResults({
            TotalDistanceTravelled: totalDistance,
            totalDuration: totalDuration,
            overSpeedDuration: overSpeedDur,
            overSpeedDistance: overSpeedDist,
            stoppedDuration: stoppedDur,
        });
    };
  return (
    <div>
    <h1>Excel Data Processor</h1>
    <input type="file" onChange={handleFileUpload} />
    <div>
        <h2>Results:</h2>
        <p>Total Distance Travelled: {results.TotalDistanceTravelled}</p>
        <p>Total Duration: {results.totalDuration}</p>
        <p>Over Speed Duration: {results.overSpeedDuration}</p>
        <p>Over Speed Distance: {results.overSpeedDistance}</p>
        <p>Stopped Duration: {results.stoppedDuration}</p>
    </div>
</div>
  )
}

export default Mapintergration