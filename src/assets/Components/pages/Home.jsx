import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate()
    const [Tripcount,setTripCount] = useState(1)
    return (
        <div>
            <Navbar />
            <div className="w-full  h-screen md:h-auto  flex justify-center items-center ">
                <div className="w-9/12 h-full ">
                    <div className="w-full h-12  border-2 border-[#A9A9A9] rounded-xl mt-8 flex ">
                        <div className="w-14 h-10  flex justify-end">
                            <img src="\cc0de79f0e3bb67e5550f2ef527dd83b.png" className='h-10' alt="" />
                        </div>
                        <div className="w-56 h-10  flex  items-center ml-2">
                            <h1 className='font-roboto text-[20px] font-semibold'>Welcome User</h1>
                        </div>
                    </div>
                    {
                        Tripcount === 0 ? (<>
                            <div className="w-full h-72  border-2 border-[#A9A9A9] rounded-xl mt-8">
                                <div className="w-full h-48  flex justify-center items-center">
                                    <div className="w-44 h-44 ">
                                        <img src="\Screenshot 2024-10-04 002713.png" className='w-fit h-fit' alt="" />
                                    </div>
                                </div>
                                <div className="w-full h-24  ">
                                    <div className="w-full h-14  flex justify-center">
                                        <button className='w-[186px] h-[52px] bg-[#162D3A] rounded-md text-white' onClick={() => { navigate("/Modal") }}>Upload trip</button>
                                    </div>
                                    <div className="w-full h-10  flex justify-center items-center">
                                        <h1 className='font-roboto text-[14px] bold-[400] text-[#9C9C9C] '>Upload the  <span className='underline cursor-pointer'>Excel</span> sheet of your trip</h1>
                                    </div>

                                </div>
                            </div>

                        </>) :
                            (<>
                                <div className="w-full h-16  border-2 border-[#A9A9A9] rounded-xl mt-2 flex justify-center items-center ">
                                    <button className="w-3/12 h-10  flex justify-center items-center bg-[#162D3A] ml-2 rounded-md text-white font-roboto" onClick={() => { navigate("/Modal") }}>
                                        Upload Trip
                                    </button>
                                    <div className="w-full h-full  flex justify-start items-center ml-2">
                                        <h1 className='font-roboto text-[14px] text-[#9C9C9C] '>Upload the <span className='underline cursor-pointer'>Excel</span> sheet of your trip</h1>
                                    </div>
                                </div>
                                <div className="w-full h-16  flex justify-between items-center gap-2">
                                    <div className="w-1/2 h-full  flex items-center">
                                        <h1 className='font-roboto text-[20px] text-[#000000] font-semibold'>Your Trips</h1>
                                    </div>
                                    <div className="w-1/2 h-full  flex justify-end items-center gap-2">
                                        <button className="w-3/12 h-8  rounded-md border border-[#162D3A] font-roboto hover:bg-[#162D3A] hover:text-white"> Delete</button>
                                        <button className="w-3/12 h-8 bg-[#162D3A] rounded-md text-white font-roboto hover:border hover:border-[#162D3A] hover:bg-white hover:text-black " onClick={()=>{navigate('/Map')}}>Open</button>
                                    </div>
                                </div>
                                <div className="w-full h-10 bg-[#FAFAFA] flex items-center p-2">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-black" />
                                    </label>
                                    <div className="w-full h-full  ml-3 flex items-center">
                                        <h1 className='font-roboto text-[14px] text-[#000000D9] font-semibold'>Trips</h1>
                                    </div>
                                </div>
                                <div className="w-full h-10 border flex items-center p-2">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-black" />
                                    </label>

                                    <div className="w-full h-full  ml-3 flex items-center">
                                        <h1 className='font-roboto text-[14px] text-[#000000D9] '>Banglore-Mysore</h1>
                                    </div>


                                </div>
                                <div className="w-full h-10 border flex items-center p-2">
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 text-black" />
                                    </label>

                                    <div className="w-full h-full= ml-3 flex items-center">
                                        <h1 className='font-roboto text-[14px] text-[#000000D9] '>Banglore-Mysore</h1>
                                    </div>


                                </div>
                            </>)
                    }

                </div>
            </div>
        </div>
    )
}

export default Home