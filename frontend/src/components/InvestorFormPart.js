import React from 'react';

const SelectOptions = ({ title, options, selectedOptions, setSelectedOptions, handleClick }) => {
  return (
    <div className='options-container'>
      <h3>{title} </h3>
        {options.map((option, index) => (
          <div
            key={index}
            className={selectedOptions.includes(option) ? 'selected' : ''}
            onClick={() => handleClick(option, selectedOptions, setSelectedOptions)}
          >
            {option}
          </div>
        ))}
        <div className={selectedOptions.length===options.length ? 'selected' : ''} onClick={() => setSelectedOptions(options)}>All</div>
    </div>
  );
};

export default SelectOptions;
