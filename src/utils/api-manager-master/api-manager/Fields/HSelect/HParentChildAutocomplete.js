import React, { useState, useContext } from 'react';
import HDynamicAutocomplete from './HDynamicAutocomplete';
import HAutocomplete from './HAutocomplete';
import AuthContext from '../../../secure-route/AuthContext';
import global from '../../../../config/Global.json'
import useAPIManager from '../../Helper/useAPIManager';
const HParentChildAutocomplete = (props) => {
    // [
    //     {
    //         "apiUrl": 'https://api.udaymotors.in/api/v1/user/',
    //         "displayKey": 'phone_no',
    //         "valueKey": 'id',
    //         "name": "user",
    //         "label":"User"
    //     },
    //     {
    //         "apiUrl": 'https://api.udaymotors.in/api/v1/getInvestmentsByUserId/',
    //         "displayKey": 'investment_id',
    //         "valueKey": 'id',
    //         "name": "investment",
    //         "parent": "user",
    //         "parent_value_key": "id",
    //         "label":"Investments"
    //     },
    //     {
    //         "apiUrl": 'https://api.udaymotors.in/api/v1/transaction/',
    //         "displayKey": 'description',
    //         "name": "transaction",
    //         "valueKey": 'id',
    //         "parent": "investment",
    //         "parent_value_key": "user_id",
    //         "label":"Transactions"
    //     },
    // ]
    let { authToken, user } = useContext(AuthContext);
    const globalConfig = global;
    const token = authToken;
    const { Get, Post, getAPI } = useAPIManager(globalConfig, token);

    const [selectedValues, setSelectedValues] = useState([]);
    const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const [fields, setFields] = useState(props.fields);

    const handleValueChange = (value, name) => {
        const updatedValues = [...selectedValues];
        const existingIndex = updatedValues.findIndex(item => item.name === name);
        if (existingIndex !== -1) {
            updatedValues[existingIndex] = { value, name };
        } else {
            updatedValues.push({ value, name });
        }

        setSelectedValues(updatedValues);

        // Update the API URL of the next field
        const nextFieldIndex = currentFieldIndex + 1;
        if (nextFieldIndex < fields.length) {
            const nextField = fields[nextFieldIndex];
            const parentValue = updatedValues.find(item => item.name === nextField.parent)?.value[nextField.parent_value_key];
            if (parentValue) {
                const updatedFields = [...fields];

                let newUrl = getAPI(nextField.apiUrl);
                updatedFields[nextFieldIndex] = {
                    ...nextField,
                    apiUrl: `${newUrl}${parentValue}/`
                };
                setFields(updatedFields);
            }
        }
        setCurrentFieldIndex(nextFieldIndex);
    };

    const handleParentValueChange = (parentName, parentValue) => {
        // Find the index of the parent field
        const parentFieldIndex = fields.findIndex(field => field.name === parentName);

        // Reset the selected values and fields configurations for the subsequent fields
        setSelectedValues(selectedValues.slice(0, parentFieldIndex + 1));
        setFields(fields.slice(0, parentFieldIndex + 1));
        setCurrentFieldIndex(parentFieldIndex);
    };

    return (
        fields.slice(0, currentFieldIndex + 1).map((field, index) => (
            <>
                <div key={index} style={{ marginTop: "10px", marginBottom: "10px" }}>
                    {
                        (field.advance) ?
                            <HDynamicAutocomplete
                                parentChild={true}
                                apiUrl={field.apiUrl}
                                displayKey={field.displayKey}
                                valueKey={field.valueKey}
                                inputName={field.name}
                                onValueChange={handleValueChange}
                                onParentValueChange={handleParentValueChange}
                                variant={field.variant}
                                label={field.label}
                                sameAsSeen={field.sameAsSeen}
                                defaultObj={(field.defaultObj) ? field.defaultObj : ""}
                            />

                            : <HAutocomplete
                                parentChild={true}
                                apiUrl={field.apiUrl}
                                displayKey={field.displayKey}
                                valueKey={field.valueKey}
                                inputName={field.name}
                                onValueChange={handleValueChange}
                                onParentValueChange={handleParentValueChange}
                                variant={field.variant}
                                label={field.label}
                                sameAsSeen={field.sameAsSeen}
                            />
                    }

                </div>
            </>


        ))
    );
}

export default HParentChildAutocomplete;
