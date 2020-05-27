import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { showAlert } from "../../../redux/alerts/alert.action";
import { deleteCustomer } from "../../../redux/Customer/customer.action";
import { connect } from "react-redux";
import "./modal.style.css";
import Axios from "axios";
import { ApiUrl } from "../../../config/config";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const outerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  zIndex: 1,
};

// default style
const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    maxWidth: "90%",
    padding: 20,
    boxSizing: "border-box",
    // backgroundColor: "#fff",
    margin: "40px auto",
    borderRadius: 3,
    zIndex: 2,
    textAlign: "left",
    // boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  formInfo: {
    background: "linear-gradient(to right, #B06AB3, #4568DC)",
    height: "300px",
    display: "grid",
    gridTemplateRows: "auto 1fr",
  },
  form: {
    width: "500px",
    maxWidth: "100%",
    minHeight: "400px",
    display: "flex",
    alignItems: "center",
  },
};

function Modal(props) {
  // Delete Customer
  const deleteCustomer = (id) => {
    const baseUrl = ApiUrl.TEST_URL;
    Axios({
      method: "delete",
      url: `${baseUrl}/delete-customer`,
      data: {
        customerID: id,
      },
    })
      .then((res) => {
        props.deleteCustomer(id);
        props.closeModal();
        props.showAlert({
          msg: "Successfully deleted Customer",
          alertType: "success",
        });
      })
      .catch((err) => {
        props.showAlert({
          msg: "Something went Wrong",
          alertType: "error",
        });
      });
  };

  return (
    <div
      style={{
        ...outerStyle,
        display: props.isModalOpen ? "block" : "none",
      }}
    >
      <div style={style.modal}>
        <div className="flex items-center modal-container">
          <div className="form bg-white px-5 py-10" style={style.form}>
            {props.children}
          </div>
          <div className="form-info text-white " style={style.formInfo}>
            <div className="text-right">
              <CloseIcon
                className="cursor-pointer"
                onClick={props.closeModal}
              />
            </div>
            <div className="px-5 self-center">
              <p className="uppercase text-2xl text-center">
                {props.editMode ? "Update Customer" : "Add Customer"}
              </p>

              <div className="text-center">
                {props.editMode ? (
                  <Tooltip title="Delete Customer">
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={() => deleteCustomer(props.editCustomerID)}
                    />
                  </Tooltip>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={style.overlay} onClick={props.closeModal} />
    </div>
  );
}

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  deleteCustomer: (user) => dispatch(deleteCustomer(user)),
  showAlert: (alert) => dispatch(showAlert(alert)),
});

export default connect(null, mapDispatchToProps)(Modal);
