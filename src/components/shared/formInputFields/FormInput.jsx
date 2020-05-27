import React from "react";
import TextField from "@material-ui/core/TextField";

function FormInput(props) {
  return (
    <>
      <TextField
        size="small"
        value={props.value}
        onChange={props.handleChange}
        fullWidth={true}
        error={props.error}
        label={props.label}
        name={props.name}
        helperText={props.error ? "Must be a valid field" : ""}
        type={props.label === "Phone" ? "number" : "text"}
      />
    </>
  );
}

export default FormInput;
