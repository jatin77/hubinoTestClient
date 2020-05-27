import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

function FormSelect(props) {
  return (
    <>
      <FormControl className="w-full" error={props.error}>
        <InputLabel id="select-label">Gender</InputLabel>
        <Select
          labelId="select-label"
          value={props.value}
          onChange={props.handleChange}
          fullWidth={true}
          name={props.name}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
        {props.error ? <FormHelperText>Can't be blank</FormHelperText> : null}
      </FormControl>
    </>
  );
}

export default FormSelect;
