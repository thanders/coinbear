import TextField from '@mui/material/TextField';

function TextFieldContainer(props) {

  const changeHandler = (input) => {
    props.onChange(input.target.value, props.id)
  };

  const styles = theme => ({
    multilineColor:{
        color:'red'
    }
});
  
  return <TextField
    {...props}
    onChange={changeHandler}
    InputProps={{
      className: styles.multilineColor
    }}
  />
}

export default TextFieldContainer;
