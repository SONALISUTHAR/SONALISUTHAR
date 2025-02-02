import React, { useEffect, useState, useContext } from "react";
import { FormHelperText } from "@mui/material";
import { firstUpperCase, formatDate, validateField } from "../Helper/helper.js";
import "../Style/style.css";
import HTextField from "./HTextField.js";
import HSelect from "./HSelect.js";
import HCheckbox from "./HCheckbox.js";
import global from '../../../config/Global.json'
import AuthContext from "../../secure-route/AuthContext.js";
import useApi from "../Helper/useApi.js";
import HParentChildAutocomplete from "./HSelect/HParentChildAutocomplete.js";
const HGetField = (props) => {
    let { authToken, user } = useContext(AuthContext);
    const globalConfig = global;
    const token = authToken;

    const { getAPI } = useApi();


    const required = props.field.required;
    const label = firstUpperCase(props.field.label);
    let fieldLabel = required ? (
        <span>
            <b style={{ color: "red" }}>*</b> {label}
        </span>
    ) : (
        label
    );
    const type = props.field.type;
    const varient = props.field.varient;
    const placeholder = props.field.placeholder;
    const defaultObj = props.field.defaultObj;
    const dafaultValue = props.field.defaultValue
        ? props.field.defaultValue
        : props.defaultValue;
    const name = props.field.name;

    let optionKey = "";
    let searchApi = "";
    let searchOptionHook = "";

    if (props.field.search) {
        searchApi = props.field.search.api ? props.field.search.api : "";
        searchApi = searchApi.length > 0 ? getAPI(searchApi) : "";
        searchOptionHook = props.field.search.label ? props.field.search.label : "";
        optionKey = props.field.search.key ? props.field.search.key : "id";
    }
    const [value, setValue] = useState(dafaultValue);
    const [isChecked, setIsChecked] = useState(dafaultValue);
    const [storageData, setStorageData] = useState([]);

    const [error, setError] = useState(
        props.field.error ? props.field.error : ""
    );
    const [blurred, setBlurred] = useState(false);
    const [simpleSelectOptions, setSimpleSelectOptions] = useState(
        props.field.options
    );

    useEffect(() => {
        const storedData = localStorage.getItem("dynamicField");
        if (storedData) {
            setStorageData(JSON.parse(storedData));
        }
    }, []);

    const updateKey = (name, newKey, newLabel) => {
        const newData = [...storageData];

        const dataIndex = newData.findIndex((item) => item.name === name);

        if (dataIndex !== -1) {
            newData[dataIndex].key = newKey;
            newData[dataIndex].label = newLabel;
        } else {
            newData.push({ name, key: newKey, label: newLabel });
        }

        setStorageData(newData);
        localStorage.setItem("dynamicField", JSON.stringify(newData));
    };
    let handleOnChange = (e) => {
        setValue(e.target.value);
        try {
            props.value(e.target.value);
        } catch (err) { }
        if (blurred) {
            setError(validateField(e.target.value, type, label));
        }
    };
    const handleChange = () => {
        const newChecked = !isChecked;
        try {
            props.value(newChecked);
        } catch (err) { }
        setIsChecked(newChecked);
        if (blurred) {
            setError(validateField(newChecked, type, label));
        }
    };
    const handleaAutocompleteChange = (newValue, inputName) => {
        try {
            props.value(newValue);
        } catch (err) { }
        setValue(newValue);
        if (blurred) {
            setError(validateField(newValue.target.value, type, label));
        }
    };
    const handleBlur = (e) => {
        setBlurred(true);
        setError(validateField(value, type, label));
        setError(
            validateField(type === "checkbox" ? isChecked : value, type, label)
        );
    };

    const handleFocus = () => {
        setBlurred(false);
    };

    const renderError = () => {
        const isValidationRequired = required || false;
        if (isValidationRequired && error && blurred) {
            return <FormHelperText error>{error}</FormHelperText>;
        }
        return null;
    };



    switch (type) {
        case "parent-child":
            return <HParentChildAutocomplete
                fields={props.field.fields}
            />

        case "select":
            return (
                <>
                    <HSelect
                        apiUrl={searchApi}
                        displayKey={searchOptionHook}
                        valueKey={optionKey}
                        inputName={name}
                        onValueChange={() => { }}
                        variant={varient}
                        label={fieldLabel}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                    {renderError()}
                </>
            );
        case "simple-select":
            return (
                <>
                    <HSelect
                        type="simple-select"
                        globalConfig={props.globalConfig}
                        token={props.token}
                        apiUrl=""
                        displayKey="label"
                        valueKey="type"
                        inputName={name}
                        onValueChange={handleaAutocompleteChange}
                        variant={varient}
                        label={label}
                        defaultObj={defaultObj}
                        options={simpleSelectOptions}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                    {renderError()}
                </>
            );
        case "advance-select":
            return (
                <div style={{ position: "relative" }}>
                    <HSelect
                        type="advance-select"
                        globalConfig={props.globalConfig}
                        token={props.token}
                        apiUrl={searchApi}
                        displayKey={searchOptionHook}
                        valueKey={optionKey}
                        inputName={name}
                        onValueChange={handleaAutocompleteChange}
                        variant={varient}
                        label={fieldLabel}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        defaultObj={defaultObj}
                    />
                    {renderError()}
                </div>
            );

        case "multi-select":
            return (
                <div style={{ position: "relative" }}>
                    <HSelect
                        type="multi-select"
                        globalConfig={props.globalConfig}
                        token={props.token}
                        apiUrl={searchApi}
                        displayKey={searchOptionHook}
                        valueKey={optionKey}
                        inputName={name}
                        onValueChange={handleaAutocompleteChange}
                        variant={varient}
                        label={fieldLabel}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        defaultObj={defaultObj}
                    />
                    {renderError()}
                </div>
            );
        case "checkbox":
            return (
                <div onBlur={handleBlur} onFocus={handleFocus}>
                    <HCheckbox
                        checked={isChecked}
                        onChange={handleChange}
                        label={fieldLabel}
                        name={name}
                    />
                    {renderError()}
                </div>
            );
        case "datetime-local":
            return (
                <div style={{ textAlign: "left" }}>
                    <HTextField
                        name={name}
                        label={fieldLabel}
                        type={type}
                        style={{ width: "100%" }}
                        variant={varient}
                        placeholder={placeholder}
                        value={formatDate(value)}
                        onChange={handleOnChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                    {renderError()}
                </div>
            );

        case "auto":
            let key = label.toLowerCase();
            let userId = user[key];
            return (

                <input type="text" value={userId} name={name} style={{ display: "none" }} />


            );
        default:
            return (
                <div style={{ position: "relative" }}>
                    <HTextField
                        name={name}
                        label={fieldLabel}
                        type={type}
                        style={{ width: "100%" }}
                        variant={varient}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleOnChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                    {renderError()}
                </div>
            );
    }
};

export default HGetField;
