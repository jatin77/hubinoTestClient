import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: "linear-gradient(to right, #B06AB3, #4568DC)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
};

function AddCustomerBtn(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button
      className={clsx(classes.root, AddCustomerBtn)}
      {...other}
      onClick={props.openModal}
    >
      add customer
    </Button>
  );
}

AddCustomerBtn.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AddCustomerBtn);
