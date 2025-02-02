import { Button, TextField } from '@mui/material'
import React from 'react'

const SearchOnWeb = (props) => {
  return (
    <div style={props.style}>
      <TextField /> <Button>Search<i className={`fa ${props.icon}`}></i></Button>
    </div>
  )
}

export default SearchOnWeb
