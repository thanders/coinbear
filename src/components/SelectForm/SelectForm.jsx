import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectForm(props) {

  const changeHandler = (event) => {
    props.setChoice(event.target.value);
    props.onChange(event.target.value, props.id)
  };
  
  return (
        <FormControl sx={{ width: '28ch' }}>
            <InputLabel id="demo-simple-select-label">
                {props.label}
            </InputLabel>
            <Select {...props} value={props.choice} onChange={changeHandler} required={true} children={props.menuItems}/>
        </FormControl>
  );
}

export default SelectForm;
