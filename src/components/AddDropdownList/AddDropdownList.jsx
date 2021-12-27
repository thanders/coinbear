import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import SelectForm from '../SelectForm/SelectForm';
import Button from '@mui/material/Button';
import TextFieldContainer from '../../containers/FormFields/TextFieldContainer';
import css from './AddDropdownList.module.css';
import FormControl from '@mui/material/FormControl';

function AddDropdownList(props) {

  const [form, setForm] = useState(null);
  const [choice, setChoice] = useState('');
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  const createCurrency = (input, id) => {
    const updatedState = { ...form};
    updatedState[id] = input;
    setForm(updatedState);
  };

  useEffect(() => {
    if(form && form.amount && form.amount.length > 0 && form.currency && form.currency.length > 0) {
      setIsAddDisabled(false);
      console.log('assets validation', form.amount.length);
    }
    else setIsAddDisabled(true);

}, [form]);

  props.dropdown.choice = choice;
  props.dropdown.setChoice = (selection) => setChoice(selection);

  const submitForm = () => {
    console.log('submitting form');
    props.onChange(form, props.id);
    document.forms['currency'].reset();
    setChoice('');
    setForm(null);
  };

  const numberProps = {
    id: "amount",
    label: "Amount",
    type: "number",
    InputLabelProps: {
      shrink: true,
    },
    required: true,
    onChange: (input, id) => {createCurrency(input, id)}
  }
  
  return (
    <Stack spacing={2} direction="row">
      <form id='currency'>
        <div className={css.formContainer}>
          <div className={css.dropdown}>
            <SelectForm {...props.dropdown} children={props.dropdown.menuItems} onChange={(input, id) => {createCurrency(input, id)}} />
          </div>
          <div className={css.submitRow}>
            <div className={css.input}>
              <FormControl sx={{ width: '28ch' }}>
                <TextFieldContainer {...numberProps} />
              </FormControl>
            </div>
            <div className={css.input}>
              <Button variant="outlined" onClick={()=> submitForm()} disabled={isAddDisabled}>Add</Button>
            </div>
          </div>
        </div>
      </form>
    </Stack>
  );
}

export default AddDropdownList;
