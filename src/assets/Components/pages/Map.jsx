import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import Pagination from '../Pagingation/Pagination';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';





const Map = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const position = [40.7128, -74.0060];
    // Your list of names for the navbar
    const Tripnames = ['Colaba', 'Marain drive', 'Nariman Point', 'Malabar Hills', 'Bandra', 'Anderi'];
    const navigate = useNavigate()

    return (
        <div>
            <Navbar />
            <div className="w-full h-auto    flex justify-center items-center">
                <div className="w-9/12 h-full  ">
                    <div className="w-full h-8  mt-2 " onClick={()=>{navigate('/Home')}}>
                        <div className="w-10 h-8  flex justify-center items-center">
                            <h1 className='text-xl font-bold'><FaArrowLeft /></h1>
                        </div>
                    </div>
                    <div className="w-full h-16  border-2 border-[#A9A9A9] rounded-xl mt-2 flex justify-between items-center ">

                        <div className="w-full h-full  flex justify-start items-center ml-3">
                            <h1 className='font-roboto  text-[#000000D9] font-semibold '>Colaba</h1>
                        </div>
                        <button className="w-2/12 h-10  flex justify-center items-center bg-[#162D3A] mr-2 rounded-md text-white font-roboto" onClick={() => { navigate("/Modal") }}>
                            New
                        </button>
                    </div>

                    <div className="w-full h-8  mt-2 flex items-center gap-1 ">
                        <div className="w-5 h-5 bg-[#0038FF] rounded-full"> </div>
                        <div className="w-1/12 h-5  ">
                            <h1 className='font-roboto text-[14px]'>Stopped</h1>
                        </div>
                        <div className="w-5 h-5 bg-[#FF00B8] rounded-full"> </div>
                        <div className="w-10 h-5 ">
                            <h1 className='font-roboto text-[14px]'>idle</h1>
                        </div>
                        <div className="w-5 h-5 bg-[#00FFD1] rounded-full"> </div>
                        <div className="w-28 h-5  ">
                            <h1 className='font-roboto text-[14px]'>Over speeding</h1>
                        </div>
                    </div>
                    <div className="w-full h-96  mt-2 border border-black">
                        <div className="w-full h-full">
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                {/* Tile Layer for the map (you can use different providers like OpenStreetMap, Google Maps, etc.) */}
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />

                                {/* Marker at the specified position */}
                                <Marker position={position}>
                                    <Popup>
                                        A marker at New York City!
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                    <div className="w-full h-16  flex items-end  ">
                        <div className="w-full h-7 flex justify-between items-center border-b-2 border-[#E0E0E0]">
                            <div className="flex  space-x-8">
                                <div className="w-7 h-7  flex justify-center items-center border border-[#BFBFBF]">
                                    <h1 className='text-[#BFBFBF] text-[24px]'> <MdOutlineKeyboardArrowLeft /></h1>

                                </div>
                                {Tripnames.map((Tripnames, index) => (
                                    <div key={index} className="relative ">
                                        <button
                                            className={`text-lg font-roboto text-[12px] ${activeIndex === index ? 'text-[#1890FF]' : 'text-[#00000040]'
                                                }`}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            {Tripnames}
                                        </button>

                                        {/* Blue line below the active name */}
                                        {activeIndex === index && (
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>
                                        )}
                                    </div>
                                ))}

                            </div>
                            <div className="w-7 h-7  flex justify-center items-center border border-[#BFBFBF]">
                                <h1 className='text-[#BFBFBF] text-[24px]'><MdKeyboardArrowRight /></h1>

                            </div>
                        </div>
                    </div>

                    <div className="w-full h-44  flex  items-end">
                        <div className="w-full h-40  grid grid-cols-5 gap-2 pt-2">
                            <div className="w-auto h-24 border border-[#A9A9A9] rounded-md ">
                                <div className="w-full h-8  mt-1">
                                    <div className="w-8 h-8  ml-1 ">
                                        <h1 className='w-full h-full text-lg text-[#00B2FF] flex justify-center items-center '><MdLocationPin /></h1>
                                    </div>
                                    <div className="w-full h-8  flex justify-center items-center">
                                        <h1 className='font-roboto text-[20px] font-semibold '>63 KM</h1>
                                    </div>
                                    <div className="w-full h-5  flex justify-center items-start">
                                        <h1 className=' font-roboto text-[13px] '>Total Distanced Travelled </h1>
                                    </div>
                                </div>
                            </div>
                            <div className="w-auto h-24 border border-[#A9A9A9] rounded-md ">
                                <div className="w-full h-8  mt-1">
                                    <div className="w-8 h-8  ml-1 flex justify-center items-center">
                                        <h1 className='w-full h-full flex justify-center text-[#00B2FF] items-center '><FaClock /></h1>                                    </div>
                                </div>
                                <div className="w-full h-8  flex justify-center items-center">
                                    <h1 className='font-roboto text-[20px] font-semibold '>1 Hr 36 Mns</h1>
                                </div>
                                <div className="w-full h-5  flex justify-center items-start">
                                    <h1 className=' font-roboto text-[13px] '>Total Travelled Duration  </h1>
                                </div>
                            </div>
                            <div className="w-auto h-24 border border-[#A9A9A9] rounded-md ">
                                <div className="w-full h-8  mt-1">
                                    <div className="w-8 h-8  ml-1 flex justify-center items-center">
                                        <h1 className='w-full h-full flex justify-center text-[#00FFD1] items-center '><FaClock /></h1>                                    </div>
                                </div>
                                <div className="w-full h-8  flex justify-center items-center">
                                    <h1 className='font-roboto text-[20px] font-semibold '>41 Mns</h1>
                                </div>
                                <div className="w-full h-5  flex justify-center items-start">
                                    <h1 className=' font-roboto text-[13px] '>Over Speeding Duration  </h1>
                                </div>
                            </div>
                            <div className="w-auto h-24 border border-[#A9A9A9] rounded-md ">
                                <div className="w-full h-8  mt-1">
                                    <div className="w-8 h-8  ml-1 flex justify-center items-center">
                                        <h1 className='w-full h-full flex justify-center text-xl items-center text-[#00FFD1] '><MdLocationPin /></h1>                                    </div>
                                </div>
                                <div className="w-full h-8  flex justify-center items-center">
                                    <h1 className='font-roboto text-[20px] font-semibold '>20.3 KM</h1>
                                </div>
                                <div className="w-full h-5  flex justify-center items-start">
                                    <h1 className=' font-roboto text-[13px] '>Over Speeding Distance  </h1>
                                </div>
                            </div>
                            <div className="w-auto h-24 border border-[#A9A9A9] rounded-md ">
                                <div className="w-full h-8  mt-1">
                                    <div className="w-8 h-8  ml-1 flex justify-center items-center">
                                        <h1 className='w-full h-full flex justify-center items-center text-[#0038FF] '><FaClock /></h1>                                    </div>
                                </div>
                                <div className="w-full h-8  flex justify-center items-center">
                                    <h1 className='font-roboto text-[20px] font-semibold '>41 Mins</h1>
                                </div>
                                <div className="w-full h-5  flex justify-center items-start">
                                    <h1 className=' font-roboto text-[13px] '>Stopped Duration  </h1>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            {/* Table Head */}
                            <thead>
                                <tr className="bg-[#FAFAFA]">
                                    <th className="border border-gray-300 px-4 py-2 w-2/12 font-roboto text-[13px]">Time</th>
                                    <th className="border border-gray-300 px-4 py-2 w-52 font-roboto text-[13px]">Point</th>
                                    <th className="border border-gray-300 px-4 py-2 w-16 font-roboto text-[13px]">Ignition</th>
                                    <th className="border border-gray-300 px-4 py-2 w-28 font-roboto text-[13px]">Speed</th>
                                    <th className="border border-gray-300 px-4 py-2 font-roboto text-[13px]"></th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                <tr className="text-center">
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]">11:30:24 PM</td>
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]">40.7128° N, 74.0060° W</td>
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]">On</td>
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]">28.5 KM/H</td>
                                    <td className="px-4 py-2 font-roboto text-[12px] ">
                                        <div className="w-full h-3 flex justify-center items-center">
                                            Travel Duration :20 Mins
                                        </div><div className="w-full h-3  flex justify-center items-center">
                                            Travel Duration :20 Mins
                                        </div>
                                    </td>
                                </tr>

                                <tr className="text-center">
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]">11:30:24 PM</td>
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]">40.7128° N, 74.0060° W</td>
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]"></td>
                                    <td className="border border-gray-300 px-4 py-2 font-roboto text-[12px]">28.5 KM/H</td>
                                    {/* <td className="border border-gray-300 px-4 py-2"></td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full h-10 ">
                        <Pagination />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Map