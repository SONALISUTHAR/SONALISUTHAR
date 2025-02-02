import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const HCheckbox = (props) => {
  return (

      <FormControlLabel
            control={<Checkbox checked={props.checked} onChange={props.onChange} />}
            label={props.label}
            name={props.name}
          />

  )
}

export default HCheckbox
