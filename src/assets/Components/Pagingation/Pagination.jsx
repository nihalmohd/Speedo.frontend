import { useState } from 'react';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Left Arrow Button with Border */}
      <button
        className={`px-1 py-1  border border-gray-300 rounded text-xs ${
          currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'text-black'
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        
        <h1 className='text-sm'><MdOutlineKeyboardArrowLeft/></h1>
      </button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-2 py-1  border border-gray-300 rounded text-xs ${
            currentPage === index + 1
              ? 'border-blue-500 text-blue-500'
              : 'border-gray-300 text-black'
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* Right Arrow Button with Border */}
      <button
        className={` px-1 py-1 border border-gray-300 rounded text-xs ${
          currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'text-black'
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <h1 className='text-sm'><MdKeyboardArrowRight/></h1>
        
      </button>
    </div>
  );
}

export default Pagination;
