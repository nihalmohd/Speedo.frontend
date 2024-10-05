import React from 'react'
import { useState } from 'react';

const Check = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Your list of names for the navbar
    const names = ['Home', 'About', 'Services', 'Contact'];
  
    return (
      <div className="w-full h-16 flex items-center justify-center shadow-md bg-white">
        <div className="flex space-x-8">
          {names.map((name, index) => (
            <div key={index} className="relative">
              {/* Name (NavLink) */}
              <button
                className={`text-lg font-medium ${
                  activeIndex === index ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {name}
              </button>
  
              {/* Blue line below the active name */}
              {activeIndex === index && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  
}

export default Check