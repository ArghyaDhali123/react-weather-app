import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue, loadedOptions) => {
        const url = `${GEO_API_URL}/cities?namePrefix=${inputValue}&minPopulation=100000&q=${inputValue}`;
        const requestOptions = {
            method: 'GET',
            headers: geoApiOptions.headers,
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            const formattedOptions = result.data.map(item => ({
                // value2: item.latitude ,
                value: `${item.latitude} ${item.longitude}`,
                label: `${item.name},${item.countryCode}`,
            }));
            return {
                options: formattedOptions,
                hasMore: true 
            };
        } catch (error) {
            console.error("Error fetching data:", error);
            return {
                options: [],
                hasMore: false
            };
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
