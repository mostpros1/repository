import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FilterBar.css';

function FilterDropdown({ label, selectedValue, options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (item) => {
        onSelect(item);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="filter-dropdown">
            <p className="filter-label">{label}</p>
            <div className="filter-selector" onClick={toggleDropdown}>
                <p className="selected-value">{selectedValue}</p>
                <ExpandMoreIcon className="expand-icon" />
            </div>
            {isOpen && (
                <ul className="filter-options">
                    {options.map((item) => (
                        <li key={item} onClick={() => handleItemClick(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FilterDropdown;