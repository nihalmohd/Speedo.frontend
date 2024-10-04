import React from 'react'
import Navbar from '../Navbar/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="w-full  h-screen md:h-auto  flex justify-center items-center">
            <div className="w-9/12 h-full ">
             <div className="w-full h-12  border-2 border-[#A9A9A9] rounded-xl mt-8 flex ">
                <div className="w-14 h-10  flex justify-end">
                <img src="\cc0de79f0e3bb67e5550f2ef527dd83b.png" className='h-10' alt="" />
                </div>
                <div className="w-56 h-10  flex  items-center ml-2">
                    <h1 className='font-roboto text-[20px] font-semibold'>Welcome User</h1>
                </div>
             </div>
             <div className="w-full h-72  border-2 border-[#A9A9A9] rounded-xl mt-8">
                <div className="w-full h-48  flex justify-center items-center">
                    <div className="w-44 h-44 ">
                        <img src="\Screenshot 2024-10-04 002713.png" className='w-fit h-fit' alt="" />
                    </div>
                </div>
                <div className="w-full h-24  ">
                    <div className="w-full h-14  flex justify-center">
                    <button className='w-[186px] h-[52px] bg-[#162D3A] rounded-md text-white'>Upload trip</button>
                    </div>
                    <div className="w-full h-10  flex justify-center items-center">
                        <h1 className='font-roboto text-[14px] bold-[400] text-[#9C9C9C] '>Upload the  <span className='underline cursor-pointer'>Excel</span> sheet of your trip</h1>
                    </div>
                    
                </div>
             </div>
            </div>
        </div>
    </div>
  )
}

export default Home