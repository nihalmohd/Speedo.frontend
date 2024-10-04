import React from 'react'

const Navbar = () => {
  return (
<div className="w-full h-16 shadow-md top-0 left-0 bg-white ">
    <div className="w-3/12 h-full ">
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-3/6 h-10 flex justify-end items-end mb-1">
          <img src="\Vector.png" alt="" />
        </div>
        <div className="w-3/6 h-16 flex items-end">
          <h1 className="font-squada text-[24px] font-bold">Speedo</h1>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Navbar