import { TextField } from '@mui/material'
import React from 'react'

const HTextField = (props) => {
    return (
        <TextField
            name={props.name}
            label={props.label}
            type={props.type}
            style={props.style}
            variant={props.variant}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
        />
    )
}

export default HTextField
