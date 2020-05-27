import React, { Component } from "react";
import Modal from "../../components/shared/modal/Modal";
import AddCustomerBtn from "../../components/addCustomerBtn/AddCustomerBtn";
import AddEditCustomerForm from "../../components/addEditCustomerForm/AddEditCustomerForm";
import CustomersList from "../../components/customersList/CustomersList";

// overwrite style
const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
};

function Customers() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container m-auto py-5">
      <div className="text-right mb-5">
        <AddCustomerBtn openModal={openModal} />
      </div>

      {/* List of customers */}
      <CustomersList />

      {/* Create Customer Modal Form */}
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        style={modalStyle}
      >
        <AddEditCustomerForm closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default Customers;
