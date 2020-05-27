import React, { Component } from "react";
import FormInput from "../shared/formInputFields/FormInput";
import Button from "@material-ui/core/Button";
import {
  addCustomer,
  updateCustomer,
} from "../../redux/Customer/customer.action";
import { showAlert } from "../../redux/alerts/alert.action";
import { connect } from "react-redux";
import FormSelect from "../shared/formInputFields/FormSelect";
import { ApiUrl } from "../../config/config";
import Axios from "axios";

export class AddEditCustomerForm extends Component {
  state = {
    customerName: "",
    customerNameError: false,
    customerID: null,
    customerEmail: "",
    customerEmailError: false,
    customerPhone: "",
    customerPhoneError: false,
    customerGender: "",
    customerGenderError: false,
    editMode: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.editMode) {
        const { editMode, selectedCustomer } = this.props;
        this.setState({
          editMode: editMode,
          customerName: selectedCustomer.name,
          customerEmail: selectedCustomer.email,
          customerPhone: selectedCustomer.phone,
          customerGender: selectedCustomer.gender,
          customerID: selectedCustomer.id,
        });
      }
    }
  }

  // Form Submit Handle for Update and Create Campaign
  handleSubmit = (e) => {
    e.preventDefault();

    let invalidCustomerName = this.validateInput("customerName");
    let invalidCustomerEmail = this.validateInput("customerEmail");
    let invalidCustomerPhone = this.validateInput("customerPhone");
    let invalidCustomerGender = this.validateInput("customerGender");
    if (
      !invalidCustomerName &&
      !invalidCustomerEmail &&
      !invalidCustomerPhone &&
      !invalidCustomerGender
    ) {
      if (!this.state.editMode) {
        // Add User
        this.handleCreateUpdateCustomer();
      } else {
        // Update User
        this.handleCreateUpdateCustomer();
      }
    }
  };

  handleCreateUpdateCustomer = () => {
    const baseUrl = ApiUrl.TEST_URL;
    let customer = {
      name: this.state.customerName,
      email: this.state.customerEmail,
      phone: this.state.customerPhone,
      gender: this.state.customerGender,
      id: this.state.editMode ? this.state.customerID : null,
    };

    let editMsg;

    if (this.state.editMode) {
      // Update Customer
      Axios.put(`${baseUrl}/edit-customer`, customer)
        .then((res) => {
          this.handleCreateEditSuccess(customer, "onUpdate");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            if (
              err.response.data === "Customer with same email already exists"
            ) {
              this.handleCreateEditError(
                "Customer with same email already exists",
                "info"
              );
            }
          } else {
            this.handleCreateEditError(
              "Something went wrong while updating Customer",
              "error"
            );
          }
        });
    } else {
      // Create Customer
      Axios({
        method: "post",
        url: `${baseUrl}/add-customer`,
        data: {
          ...customer,
        },
      })
        .then((res) => {
          this.handleCreateEditSuccess(res.data, "onCreate");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            if (err.response.data === "User Already Exists") {
              this.handleCreateEditError("User Email Already Exists", "info");
            }
          } else {
            this.handleCreateEditError(
              "Something went wrong while Adding Customer",
              "error"
            );
          }
        });
    }
  };

  handleCreateEditError = (alertMsg, alertType) => {
    this.props.showAlert({
      msg: alertMsg,
      alertType: alertType,
    });
  };

  handleCreateEditSuccess = (customer, successType) => {
    let alertMsg;
    if (successType === "onUpdate") {
      this.props.updateCustomer(customer);
      alertMsg = "Customer Updated Successfully";
    } else {
      this.props.addCustomer(customer);
      alertMsg = "Customer Added Successfully";
    }

    // Handle Alert
    this.props.showAlert({
      msg: alertMsg,
      alertType: "success",
    });

    // Close Modal
    this.props.closeModal();
    // Reset Form
    this.handleResetForm();
  };

  handleResetForm = () => {
    this.setState({
      customerName: "",
      customerNameError: false,
      customerEmail: "",
      customerEmailError: false,
      customerPhone: "",
      customerPhoneError: false,
      customerGender: "",
      customerGenderError: false,
      editMode: false,
      customerID: null,
    });
  };

  // Validate Input Text Fields
  validateInput = (field) => {
    let error = false;

    let stateName = field + "Error";

    if (field.toString() === "customerEmail") {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state[field])
      ) {
        error = false;
        this.setState({
          [stateName]: false,
        });
      } else {
        console.log("fail");
        error = true;
        this.setState({
          [stateName]: true,
        });
      }
    } else {
      if (!this.state[field]) {
        error = true;
        this.setState({
          [stateName]: true,
        });
      } else {
        error = false;
        this.setState({
          [stateName]: false,
        });
      }
    }

    return error;
  };

  // Store Input Text Values On Change to Local State
  handleChange = (e) => {
    let name = e.target.name;

    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.validateInput([name])
    );
  };

  render() {
    return (
      <div className="w-full">
        <form
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          ref={(el) => (this.myFormRef = el)}
        >
          {/* Customer Name */}
          <FormInput
            value={this.state.customerName}
            handleChange={this.handleChange}
            error={this.state.customerNameError}
            label="Name"
            name="customerName"
          />

          <div className="my-3">
            {/* Customer Email */}
            <FormInput
              value={this.state.customerEmail}
              handleChange={this.handleChange}
              error={this.state.customerEmailError}
              label="Email"
              name="customerEmail"
            />
          </div>

          {/* Customer Phone */}
          <FormInput
            value={this.state.customerPhone}
            handleChange={this.handleChange}
            error={this.state.customerPhoneError}
            label="Phone"
            name="customerPhone"
          />

          <div className="mt-3">
            {/* Customer Gender */}
            <FormSelect
              value={this.state.customerGender}
              handleChange={this.handleChange}
              error={this.state.customerGenderError}
              name="customerGender"
            />
          </div>
          <div className="text-center mt-8">
            <Button
              className="w-full"
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
            >
              {this.state.editMode ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  addCustomer: (customer) => dispatch(addCustomer(customer)),
  updateCustomer: (customer) => dispatch(updateCustomer(customer)),
  showAlert: (alert) => dispatch(showAlert(alert)),
});

export default connect(null, mapDispatchToProps)(AddEditCustomerForm);
