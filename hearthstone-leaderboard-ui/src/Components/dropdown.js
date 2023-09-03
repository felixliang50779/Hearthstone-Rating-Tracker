import React from 'react';

function Dropdown({ fetchResult, selectedOption, setSelectedOption }) {
        
    if (!fetchResult) {
        return null; // or a loading state
    }
    const handleDropdownChange = (event) => {
        if (event.target && event.target.value) {
          const selectedValue = event.target.value;
          setSelectedOption(selectedValue);
        }
      };
  return (
    <select id="dropdown" onChange={handleDropdownChange} value={selectedOption}>
      {Object.keys(fetchResult.data).map((propertyName) => (
        <option key={propertyName} value={propertyName}>
          {propertyName}
        </option>
      ))}
    </select>
  );
}

export { Dropdown };