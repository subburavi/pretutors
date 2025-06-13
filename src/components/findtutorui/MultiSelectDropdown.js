// 3. MultiSelectDropdown.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const MultiSelectDropdown = ({ label, options, selected, onToggle, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-xs text-left border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between"
      >
        <span className="truncate ">
          {selected.length === 0 ? placeholder : `${selected.length} selected`}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map(option => (
            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
