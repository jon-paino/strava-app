import React, { useState, useEffect } from 'react';

interface FilterProps {
    selectedTypes: string[];
    onFilterChange: (types: string[]) => void;
    onRunFilterChange: (filters: { duration?: number; mph?: number; miles?: number }) => void;
    onRideFilterChange: (filters: { duration?: number; mph?: number; miles?: number }) => void;
    onSwimFilterChange: (filters: { duration?: number; mph?: number; miles?: number }) => void;
}

const Filter = ({
    selectedTypes,
    onFilterChange,
    onRunFilterChange,
    onRideFilterChange,
    onSwimFilterChange,
}: FilterProps) => {
    const [runFiltersVisible, setRunFiltersVisible] = useState(false);
    const [rideFiltersVisible, setRideFiltersVisible] = useState(false);
    const [swimFiltersVisible, setSwimFiltersVisible] = useState(false);

    const [runFilters, setRunFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});
    const [rideFilters, setRideFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});
    const [swimFilters, setSwimFilters] = useState<{ duration?: number; mph?: number; miles?: number }>({});

    const handleCheckboxChange = (type: string) => {
        const newSelectedTypes = selectedTypes.includes(type)
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];

        onFilterChange(newSelectedTypes);

        // Show specialized filters for 'run', 'ride', and 'swim'
        if (type === 'run') {
            setRunFiltersVisible(newSelectedTypes.includes('run'));
        }
        if (type === 'ride') {
            setRideFiltersVisible(newSelectedTypes.includes('ride'));
        }
        if (type === 'swim') {
            setSwimFiltersVisible(newSelectedTypes.includes('swim'));
        }
    };

    const handleSliderChange = (filterName: string, value: number, activityType: string) => {
        if (activityType === 'run') {
            setRunFilters(prev => ({ ...prev, [filterName]: value }));
        } else if (activityType === 'ride') {
            setRideFilters(prev => ({ ...prev, [filterName]: value }));
        } else if (activityType === 'swim') {
            setSwimFilters(prev => ({ ...prev, [filterName]: value }));
        }
    };

    // Debounce slider updates for run, ride, and swim
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            onRunFilterChange(runFilters);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [runFilters, onRunFilterChange]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            onRideFilterChange(rideFilters);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [rideFilters, onRideFilterChange]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            onSwimFilterChange(swimFilters);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [swimFilters, onSwimFilterChange]);

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
                            onChange={(e) => handleSliderChange('duration', Number(e.target.value), 'run')}
                        />
                    </label>
                    <label>
                        Speed (mph): {runFilters.mph || 0}
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={runFilters.mph || 0}
                            onChange={(e) => handleSliderChange('mph', Number(e.target.value), 'run')}
                        />
                    </label>
                    <label>
                        Distance (miles): {runFilters.miles || 0}
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={runFilters.miles || 0}
                            onChange={(e) => handleSliderChange('miles', Number(e.target.value), 'run')}
                        />
                    </label>
                </div>
            )}
            <label>
                <input
                    type="checkbox"
                    checked={selectedTypes.includes('ride')}
                    onChange={() => handleCheckboxChange('ride')}
                />
                Ride
            </label>
            {rideFiltersVisible && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px' }}>
                    <label>
                        Duration (min): {rideFilters.duration || 0}
                        <input
                            type="range"
                            min="0"
                            max="300"
                            value={rideFilters.duration || 0}
                            onChange={(e) => handleSliderChange('duration', Number(e.target.value), 'ride')}
                        />
                    </label>
                    <label>
                        Speed (mph): {rideFilters.mph || 0}
                        <input
                            type="range"
                            min="0"
                            max="40"
                            value={rideFilters.mph || 0}
                            onChange={(e) => handleSliderChange('mph', Number(e.target.value), 'ride')}
                        />
                    </label>
                    <label>
                        Distance (miles): {rideFilters.miles || 0}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={rideFilters.miles || 0}
                            onChange={(e) => handleSliderChange('miles', Number(e.target.value), 'ride')}
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
            {swimFiltersVisible && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px' }}>
                    <label>
                        Duration (min): {swimFilters.duration || 0}
                        <input
                            type="range"
                            min="0"
                            max="120"
                            value={swimFilters.duration || 0}
                            onChange={(e) => handleSliderChange('duration', Number(e.target.value), 'swim')}
                        />
                    </label>
                    <label>
                        Speed (mph): {swimFilters.mph || 0}
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={swimFilters.mph || 0}
                            onChange={(e) => handleSliderChange('mph', Number(e.target.value), 'swim')}
                        />
                    </label>
                    <label>
                        Distance (miles): {swimFilters.miles || 0}
                        <input
                            type="range"
                            min="0"
                            max="5"
                            value={swimFilters.miles || 0}
                            onChange={(e) => handleSliderChange('miles', Number(e.target.value), 'swim')}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default Filter;

