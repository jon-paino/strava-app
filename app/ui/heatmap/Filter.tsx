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
    const [runFiltersVisible, setRunFiltersVisible] = useState(true);
    const [rideFiltersVisible, setRideFiltersVisible] = useState(true);
    const [swimFiltersVisible, setSwimFiltersVisible] = useState(true);

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

    const handleInputChange = (filterName: string, value: string, activityType: string) => {
        const numericValue = Number(value.replace(/^0+/, '')); // Remove leading zeros
        if (activityType === 'run') {
            setRunFilters(prev => ({ ...prev, [filterName]: numericValue }));
        } else if (activityType === 'ride') {
            setRideFilters(prev => ({ ...prev, [filterName]: numericValue }));
        } else if (activityType === 'swim') {
            setSwimFilters(prev => ({ ...prev, [filterName]: numericValue }));
        }
    };

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
        <div className="flex flex-col items-start gap-4">
            <label className="checkbox-button">
                <input
                    type="checkbox"
                    checked={selectedTypes.includes('run')}
                    onChange={() => handleCheckboxChange('run')}
                />
                Run
            </label>
            {runFiltersVisible && (
                <div className="flex flex-col gap-4 ml-5">
                    <label className="flex items-center">
                        Duration (min):
                        <input
                            type="number"
                            min="0"
                            max="300"
                            value={runFilters.duration || ''}
                            onChange={(e) => handleInputChange('duration', e.target.value, 'run')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="300"
                            value={runFilters.duration || 0}
                            onChange={(e) => handleSliderChange('duration', Number(e.target.value), 'run')}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center">
                        Speed (mph):
                        <input
                            type="number"
                            min="0"
                            max="20"
                            value={runFilters.mph || ''}
                            onChange={(e) => handleInputChange('mph', e.target.value, 'run')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={runFilters.mph || 0}
                            onChange={(e) => handleSliderChange('mph', Number(e.target.value), 'run')}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center">
                        Distance (miles):
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={runFilters.miles || ''}
                            onChange={(e) => handleInputChange('miles', e.target.value, 'run')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={runFilters.miles || 0}
                            onChange={(e) => handleSliderChange('miles', Number(e.target.value), 'run')}
                            className="w-full"
                        />
                    </label>
                </div>
            )}
            <label className="checkbox-button">
                <input
                    type="checkbox"
                    checked={selectedTypes.includes('ride')}
                    onChange={() => handleCheckboxChange('ride')}
                />
                Ride
            </label>
            {rideFiltersVisible && (
                <div className="flex flex-col gap-4 ml-5">
                    <label className="flex items-center">
                        Duration (min):
                        <input
                            type="number"
                            min="0"
                            max="300"
                            value={rideFilters.duration || ''}
                            onChange={(e) => handleInputChange('duration', e.target.value, 'ride')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="300"
                            value={rideFilters.duration || 0}
                            onChange={(e) => handleSliderChange('duration', Number(e.target.value), 'ride')}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center">
                        Speed (mph):
                        <input
                            type="number"
                            min="0"
                            max="20"
                            value={rideFilters.mph || ''}
                            onChange={(e) => handleInputChange('mph', e.target.value, 'ride')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={rideFilters.mph || 0}
                            onChange={(e) => handleSliderChange('mph', Number(e.target.value), 'ride')}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center">
                        Distance (miles):
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={rideFilters.miles || ''}
                            onChange={(e) => handleInputChange('miles', e.target.value, 'ride')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={rideFilters.miles || 0}
                            onChange={(e) => handleSliderChange('miles', Number(e.target.value), 'ride')}
                            className="w-full"
                        />
                    </label>
                </div>
            )}
            <label className="checkbox-button">
                <input
                    type="checkbox"
                    checked={selectedTypes.includes('swim')}
                    onChange={() => handleCheckboxChange('swim')}
                />
                Swim
            </label>
            {swimFiltersVisible && (
                <div className="flex flex-col gap-4 ml-5">
                    <label className="flex items-center">
                        Duration (min):
                        <input
                            type="number"
                            min="0"
                            max="300"
                            value={swimFilters.duration || ''}
                            onChange={(e) => handleInputChange('duration', e.target.value, 'swim')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="300"
                            value={swimFilters.duration || 0}
                            onChange={(e) => handleSliderChange('duration', Number(e.target.value), 'swim')}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center">
                        Speed (mph):
                        <input
                            type="number"
                            min="0"
                            max="20"
                            value={swimFilters.mph || ''}
                            onChange={(e) => handleInputChange('mph', e.target.value, 'swim')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={swimFilters.mph || 0}
                            onChange={(e) => handleSliderChange('mph', Number(e.target.value), 'swim')}
                            className="w-full"
                        />
                    </label>
                    <label className="flex items-center">
                        Distance (miles):
                        <input
                            type="number"
                            min="0"
                            max="50"
                            value={swimFilters.miles || ''}
                            onChange={(e) => handleInputChange('miles', e.target.value, 'swim')}
                            className="w-16 ml-2 mr-4 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={swimFilters.miles || 0}
                            onChange={(e) => handleSliderChange('miles', Number(e.target.value), 'swim')}
                            className="w-full"
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default Filter;

