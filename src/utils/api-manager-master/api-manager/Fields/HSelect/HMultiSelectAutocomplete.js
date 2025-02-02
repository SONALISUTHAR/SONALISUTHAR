import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';
import useApi from '../../Helper/useApi';

const HMultiSelectAutocomplete = (props) => {
    const {
        apiUrl,
        displayKey,
        valueKey,
        onValueChange,
        inputName,
        variant,
        label,
        sameAsSeen,
        defaultObj,
        onBlur,
        onFocus,
        options: propOptions
    } = props;

    const [options, setOptions] = useState(propOptions || []);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState(defaultObj || []);
    const { Get } = useApi();

    useEffect(() => {
        setLoading(true);
        getSearchData(apiUrl);
    }, [apiUrl]);

    const handleInputChange = (event, newValue) => {
        getSearchData(apiUrl + "?search=" + newValue);
        setInputValue(newValue);
    };

    const getSearchData = async (api) => {
        await Get(api)
            .then(response => {
                (response.results) ? setOptions(response.results) : setOptions(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const handleOptionSelect = (event, newValues) => {
        setSelectedOptions(newValues);
        onValueChange(newValues, inputName);
    };

    const handleBlur = (event) => {
        const { value } = event.target;
        if (Array.isArray(value)) {
            value.forEach(val => {
                if (typeof val === 'string') {
                }
            });
        } else if (typeof value === 'string') {
            value.trim();
        }
        onBlur && onBlur(event);
    };

    return (
        <>
            <Autocomplete
                multiple
                value={selectedOptions}
                onChange={handleOptionSelect}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={options}
                loading={loading}
                getOptionLabel={(option) => option ? option[displayKey] : ''}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant={variant}
                        onBlur={handleBlur} 
                        onFocus={onFocus}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="secondary" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            <input
                type="hidden"
                name={inputName}
                value={JSON.stringify(selectedOptions.map(option => option[valueKey]))}
                style={{ display: 'none' }}
            />
            {sameAsSeen && (
                <input
                    type="hidden"
                    name={"_" + inputName}
                    value={JSON.stringify(selectedOptions.map(option => option[displayKey]))}
                    style={{ display: 'none' }}
                />
            )}

        </>
    );
};

HMultiSelectAutocomplete.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    displayKey: PropTypes.string.isRequired,
    valueKey: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
};

export default HMultiSelectAutocomplete
