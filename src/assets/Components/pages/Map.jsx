import React from 'react'
import Navbar from '../Navbar/Navbar'
import { FaArrowLeft } from "react-icons/fa6";


const Map = () => {
    return (
        <div>
            <Navbar />
            <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
                <div className="w-9/12 h-full bg-green-200 ">
                    <div className="w-full h-8 bg-red-200 mt-2">
                        <div className="w-10 h-8 bg-green-100 flex justify-center items-center">
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

                    <div className="w-full h-8 bg-red-200 mt-2 flex items-center gap-1 ">
                    <div className="w-5 h-5 bg-[#0038FF] rounded-full"> </div>
                    <div className="w-1/12 h-5 bg-red-800 ">
                    <h1 className='font-roboto text-[14px]'>Stopped</h1>
                     </div>
                    <div className="w-5 h-5 bg-[#FF00B8] rounded-full"> </div>
                    <div className="w-10 h-5 bg-red-800 ">
                    <h1 className='font-roboto text-[14px]'>idle</h1>
                     </div>
                    <div className="w-5 h-5 bg-[#00FFD1] rounded-full"> </div>
                    <div className="w-2/12 h-5 bg-red-800 "> 
                    <h1 className='font-roboto text-[14px]'>Over speeding</h1>
                    </div>
                    </div>
                    <div className="w-full h-96 bg-yellow-300 mt-2"></div>

                </div>
            </div>

        </div>
    )
}

export default Map