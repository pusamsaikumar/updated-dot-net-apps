import React, { useState } from 'react';


const ToggleButton = () => {
  const [isMoved, setIsMoved] = useState(false);

  const handleToggle = () => {
    setIsMoved(!isMoved);
  };

  return (
    <div>
      <button onClick={handleToggle} className="toggle-btn">
        {isMoved ? 'Move Back' : 'Move Left'}
      </button>
      <div className={`page-content ${isMoved ? 'moved' : ''}`}>
        <h1>This is your web page content</h1>
        <p>Click the button to move the page!</p>
      </div>
    </div>
    
  );
};

export default ToggleButton;
