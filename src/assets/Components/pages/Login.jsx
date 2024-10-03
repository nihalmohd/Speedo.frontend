import React from 'react'

const Login = () => {
  return (
    <div>
        <div className="w-full h-screen bg-gradient-to-b from-[#AFDCB1]  to-[#82C4DA] flex justify-center items-center">
            <div className="w-[550px] h-[400px] bg-white shadow-xl rounded-lg p-3">
                <div className="w-full h-full   ">
                    <div className="w-full h-24  mb-1 flex justify-center items-end">
                        <div className="w-1/2 h-20  flex justify-center items-end">
                        <div className="w-3/6 h-16 flex justify-end items-end mb-1">
                         <img src="\Vector.png" alt="" />
                        </div>
                        <div className="w-3/6 h-16  flex items-end ">
                        <h1 className='font-squada text-[24px] bold-[400] '> Speedo</h1>
                        </div>
                        </div>

                    </div>
                    <div className="w-full h-60  flex justify-center items-center mt-4">
                        <div className="w-9/12 h-full  grid grid-rows-3 gap-1">
                            <div className="-full h-20  ">
                                <div className="w-1/2 h-7 ">
                                Email
                                </div>
                                <div className="w-full h-12 ">
                                    <input type="text" className='w-full h-full rounded-md  border-2 p-2 bg-[#F7FBFF]' placeholder='you@example.com' />
                                </div>
                            </div>
                            <div className="-full h-20  ">
                                <div className="w-1/2 h-7 ">
                                Password
                                </div>
                                <div className="w-full h-12 ">
                                    <input type="text" className='w-full h-full rounded-md  border-2 p-2 bg-[#F7FBFF]' placeholder='At least 8 charector' />
                                </div>
                            </div>
                            <div className="-full h-16  flex justify-center items-center">
                                <button className='w-full h-10 bg-black rounded-md text-white font-semibold text-xl'>Sign in</button>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login