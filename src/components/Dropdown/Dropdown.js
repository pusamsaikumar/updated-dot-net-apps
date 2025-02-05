import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select an option');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="box_dropdown" ref={dropdownRef}>
      <dt onClick={toggleDropdown}>
        <span>{selectedItem}</span>
        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
      </dt>
      {isOpen && (
        <dd>
          <ul>
            <li onClick={() => handleItemClick('Option 1')}>Option 1</li>
            <li onClick={() => handleItemClick('Option 2')}>Option 2</li>
            <li onClick={() => handleItemClick('Option 3')}>Option 3</li>
          </ul>
        </dd>
      )}
    </div>
  );
};

export default Dropdown;
