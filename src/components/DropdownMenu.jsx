import { useState, useRef, useEffect } from 'react';

export default function DropdownMenu({ children, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <div onClick={toggleDropdown}>{children}</div>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1'>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                item.action(e); // Pass the event to the action if needed
                setIsOpen(false);
              }}
              className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                item.className || ''
              }`}
            >
              <div className='flex items-center'>
                {item.icon}
                {item.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
