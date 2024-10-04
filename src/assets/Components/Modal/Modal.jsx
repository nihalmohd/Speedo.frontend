import React from 'react'

const Modal = () => {
    return (
        <div>
            <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="w-full h-10 bg-green-200">
                                <input type="text" className=' w-full h-full border border-[#949494] rounded-md font-roboto text-[16px] pl-2' placeholder='Trip name* ' />
                               </div>
                               <div className="w-full h-32 bg-green-200 mt-9 border-2 border-[#00B2FF] rounded-md">
                                  <div className="w-full h-24 bg-red-200 flex justify-center items-center"></div>
                                  <div className="w-full h-7 bg-red-400 flex justify-center items-center"></div>
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