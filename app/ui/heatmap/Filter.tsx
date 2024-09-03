import React, { useState, useEffect } from 'react';

interface FilterProps {
    selectedTypes: string[];
    onFilterChange: (types: string[]) => void;
    onRunFilterChange: (filters: { duration?: number; mph?: number; miles?: number }) => void;
}

const Filter = ({ selectedTypes, onFilterChange, onRunFilterChange }: FilterProps) => {
    const [runFiltersVisible, setRunFiltersVisible] = useState(false);
    const [runFilters, setRunFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});

    const handleCheckboxChange = (type: string) => {
        const newSelectedTypes = selectedTypes.includes(type)
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];

        onFilterChange(newSelectedTypes);

        // Show specialized filters for 'run'
        if (type === 'run') {
            setRunFiltersVisible(newSelectedTypes.includes('run'));
        }
    };

    const handleSliderChange = (filterName: string, value: number) => {
        setRunFilters(prev => ({ ...prev, [filterName]: value }));
    };

    // Debounce slider updates
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            onRunFilterChange(runFilters);
        }, 500); // 500ms debounce time

        return () => clearTimeout(debounceTimeout);
    }, [runFilters, onRunFilterChange]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
            <label>
                <input
                    type="checkbox"
                    checked={selectedTypes.includes('run')}
                    onChange={() => handleCheckboxChange('run')}
                />
                Run
            </label>
            {runFiltersVisible && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px' }}>
                    <label>
                        Duration (min): {runFilters.duration || 0}
                        <input
                            type="range"
                            min="0"
                            max="300"
                            value={runFilters.duration || 0}
                            onChange={(e) => handleSliderChange('duration', Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Speed (mph): {runFilters.mph || 0}
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={runFilters.mph || 0}
                            onChange={(e) => handleSliderChange('mph', Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Distance (miles): {runFilters.miles || 0}
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={runFilters.miles || 0}
                            onChange={(e) => handleSliderChange('miles', Number(e.target.value))}
                        />
                    </label>
                </div>
            )}
            <label>
                <input
                    type="checkbox"
                    checked={selectedTypes.includes('swim')}
                    onChange={() => handleCheckboxChange('swim')}
                />
                Swim
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={selectedTypes.includes('ride')}
                    onChange={() => handleCheckboxChange('ride')}
                />
                Ride
            </label>
        </div>
    );
};

export default Filter;
