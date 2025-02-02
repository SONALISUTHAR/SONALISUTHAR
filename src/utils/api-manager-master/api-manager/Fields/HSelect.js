import React, {useContext} from 'react'
import HAutocomplete from './HSelect/HAutocomplete';
import HDynamicAutocomplete from './HSelect/HDynamicAutocomplete';
import HMultiSelectAutocomplete from './HSelect/HMultiSelectAutocomplete';
import AuthContext from '../../secure-route/AuthContext';
import global from '../../../config/Global.json'
const HSelect = (props) => {
    let { authToken } = useContext(AuthContext);
    const globalConfig = global;
    const token = authToken;


    switch (props.type) {
        case "simple-select":
            return <HDynamicAutocomplete
                globalConfig={globalConfig}
                token={token}
                apiUrl=""
                displayKey="label"
                valueKey="type"
                inputName={props.inputName}
                onValueChange={props.onValueChange}
                variant={props.variant}
                label={props.label}
                defaultObj={props.defaultObj}
                options={props.options}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
            />;
        case "advance-select":
            return <HDynamicAutocomplete
                globalConfig={globalConfig}
                token={token}
                apiUrl={props.apiUrl}
                displayKey={props.displayKey}
                valueKey={props.valueKey}
                inputName={props.inputName}
                onValueChange={props.onValueChange}
                variant={props.variant}
                label={props.label}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                defaultObj={props.defaultObj}
            />

        case "multi-select":
            return <HMultiSelectAutocomplete
            globalConfig={globalConfig}
            token={token}
            apiUrl={props.apiUrl}
            displayKey={props.displayKey}
            valueKey={props.valueKey}
            inputName={props.inputName}
            onValueChange={props.onValueChange}
            variant={props.variant}
            label={props.label}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            defaultObj={props.defaultObj}

            />
        default:
            return <HAutocomplete
                apiUrl={props.apiUrl}
                displayKey={props.displayKey}
                valueKey={props.valueKey}
                inputName={props.inputName}
                onValueChange={() => { }}
                variant={props.variant}
                label={props.label}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
            />
    }
}

export default HSelect
