import { useState, useEffect } from 'react';
import ApiService from 'services/apiservice'; // Adjust import path as needed

const useGenericFilter = (initialFilters = {}, endpoints = {}) => {
    const [filters, setFilters] = useState(initialFilters);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // State for dropdown data
    const [dropdownData, setDropdownData] = useState({
        classes: [],
        academicYears: [],
        terms: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch dropdown data if endpoints are provided
                if (endpoints) {
                    const promises = Object.keys(endpoints).map(async key => {
                        const response = await ApiService.get(endpoints[key]);
                        return { key, data: response.data };
                    });

                    const results = await Promise.all(promises);

                    // Update dropdown data state
                    const updatedDropdownData = results.reduce((acc, { key, data }) => ({
                        ...acc,
                        [key]: data,
                    }), {});

                    setDropdownData(updatedDropdownData);
                }
            } catch (error) {
                console.error('Error fetching dropdown data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoints]);

    const applyFilters = (item) => {
        return Object.keys(filters).every(key => {
            if (!filters[key]) return true; // Skip empty filters
            return item[key] === filters[key];
        });
    };

    const filterData = () => {
        return data.filter(item => applyFilters(item));
    };

    const setFilter = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    const setDataToFilter = (newData) => {
        setData(newData);
    };

    return {
        filters,
        setFilter,
        resetFilters,
        data,
        loading,
        dropdownData,
        filterData,
        setDataToFilter,
    };
};

export default useGenericFilter;
