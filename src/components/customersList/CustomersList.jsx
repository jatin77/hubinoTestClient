import React, { Component } from "react";
import { fetchAllCustomers } from "../../redux/Customer/customer.action";
import { connect } from "react-redux";
import CustomerTable from "./customerTable/CustomerTable";
import AddEditCustomerForm from "../addEditCustomerForm/AddEditCustomerForm";
import Modal from "../../components/shared/modal/Modal";

// overwrite style
const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
};

export class CustomersList extends Component {
  state = {
    isModalOpen: false,
    selectedCustomer: null,
  };

  componentDidMount() {
    this.props.fetchAllCustomers();
  }

  // close modal (set isModalOpen, true)
  closeModal = () => {
    this.setState({
      isModalOpen: false,
      editMode: false,
      selectedCustomer: null,
    });
  };

  handleEditCustomerClick = (selectedCustomer) => {
    this.setState({
      selectedCustomer: selectedCustomer,
      isModalOpen: true,
      editMode: true,
    });
  };
  render() {
    return (
      <div>
        <CustomerTable handleEditCustomerClick={this.handleEditCustomerClick} />

        {/* Customer Update Modal Form */}
        <Modal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          style={modalStyle}
          editMode={this.state.editMode}
          editCustomerID={
            this.state.selectedCustomer ? this.state.selectedCustomer.id : null
          }
        >
          <AddEditCustomerForm
            editMode={this.state.editMode}
            selectedCustomer={this.state.selectedCustomer}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

// Call Global/Redux Actions
const mapDispatchToProps = (dispatch) => ({
  fetchAllCustomers: () => dispatch(fetchAllCustomers()),
});

export default connect(null, mapDispatchToProps)(CustomersList);
