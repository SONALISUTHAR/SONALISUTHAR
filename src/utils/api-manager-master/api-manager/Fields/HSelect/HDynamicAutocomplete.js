import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';
import useApi from '../../Helper/useApi';
const HDynamicAutocomplete = (props) => {
  let {
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
  const [selectedOption, setSelectedOption] = useState(defaultObj);
  const { Get } = useApi();

  useEffect(() => {
    setLoading(true);
    getSearchData(apiUrl)
  }, [apiUrl]);

  const handleInputChange = (event, newValue) => {
    getSearchData(apiUrl + "?search=" + newValue)
    setInputValue(newValue);
  };

  const getSearchData = async (api) => {
    await Get(api)
      .then(response => {
        (response.results) ? setOptions(response.results) : setOptions(response)

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleOptionSelect = (event, newValue) => {
    setSelectedOption(newValue);
    setInputValue(newValue ? newValue[displayKey] : '');
    onValueChange(newValue, inputName); // Pass the name attribute value along with the value
  };

  return (
    <>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        loading={loading}
        onChange={handleOptionSelect}
        getOptionLabel={(option) => option ? option[displayKey] : ''}
        defaultValue={defaultObj}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant={variant}
            onBlur={onBlur}
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
      <input hidden name={inputName} value={selectedOption ? selectedOption[valueKey] : ''} style={{ display: 'none' }} />
      {(sameAsSeen) ? <input hidden name={"_" + inputName} value={selectedOption ? selectedOption[displayKey] : ''} style={{ display: 'none' }} /> : ""}

    </>
  );
};

HDynamicAutocomplete.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  displayKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired, // Accept inputName prop
};

export default HDynamicAutocomplete;
