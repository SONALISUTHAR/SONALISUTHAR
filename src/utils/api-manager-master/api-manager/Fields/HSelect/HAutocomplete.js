import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from '@mui/material/CircularProgress';
import useApi from '../../Helper/useApi';

const HAutocomplete = (props) => {
let { apiUrl, displayKey, valueKey, onValueChange, inputName, variant , label, sameAsSeen} = props;
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  
  const {Get, getAPI} = useApi();

  apiUrl = (props.parentChild)? getAPI(apiUrl) :apiUrl;
  
  useEffect(async () => {
    setLoading(true);
   await Get(apiUrl)
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

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
        renderInput={(params) => (
          <TextField
          {...params}
            label={label}
            variant={variant}
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
       <input hidden name={inputName} value={selectedOption ? selectedOption[valueKey] : ''}  style={{display: 'none'}}/>
       {(sameAsSeen)?<input hidden name={"_"+inputName} value={selectedOption ? selectedOption[displayKey] : ''}  style={{display: 'none'}}/>:""}
     
    </>
  );
};

HAutocomplete.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  displayKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
};

export default HAutocomplete;
