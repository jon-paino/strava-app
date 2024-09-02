import React from 'react';

interface FilterProps {
    selectedTypes: string[];
    onFilterChange: (selectedTypes: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedTypes, onFilterChange }) => {
    const activityTypes = ['run', 'swim', 'ride'];

    const handleCheckboxChange = (type: string) => {
        if (selectedTypes.includes(type)) {
            // Remove type from selectedTypes
            onFilterChange(selectedTypes.filter(t => t !== type));
        } else {
            // Add type to selectedTypes
            onFilterChange([...selectedTypes, type]);
        }
    };

    return (
        <div style={{ padding: '10px', backgroundColor: '#f7f7f7', width: '20vw', height: '80vh' }}>
            <h3>Filter Activities</h3>
            {activityTypes.map(type => (
                <div key={type}>
                    <label>
                        <input
                            type="checkbox"
                            value={type}
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleCheckboxChange(type)}
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize first letter */}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Filter;
