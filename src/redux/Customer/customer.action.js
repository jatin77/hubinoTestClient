import { CustomerActionTypes } from "./customer.actionType";
import Axios from "axios";
import { showAlert } from "../alerts/alert.action";
import { ApiUrl } from "../../config/config";

export const saveAllCustomers = (allCustomers) => ({
  type: CustomerActionTypes.GET_ALL_CUSTOMERS,
  payload: allCustomers,
});

export const deleteUser = (customerID) => ({
  type: CustomerActionTypes.DELETE_CUSTOMER,
  payload: customerID,
});

export const addCustomer = (customer) => ({
  type: CustomerActionTypes.ADD_CUSTOMER,
  payload: customer,
});

export const updateCustomer = (customer) => ({
  type: CustomerActionTypes.UPDATE_CUSTOMER,
  payload: customer,
});

export const deleteCustomer = (customerID) => ({
  type: CustomerActionTypes.DELETE_CUSTOMER,
  payload: customerID,
});

export const loading = () => ({
  type: CustomerActionTypes.LOADING,
});

export const error = () => ({
  type: CustomerActionTypes.ERROR,
});

export const fetchAllCustomers = () => {
  const baseUrl = ApiUrl.TEST_URL;
  return (dispatch) => {
    dispatch(loading());
    Axios.get(`${baseUrl}/customers`)
      .then((res) => {
        dispatch(saveAllCustomers(res.data));
      })
      .catch((err) => {
        dispatch(error());
        dispatch(
          showAlert({
            msg: "Something went wrong while fetching Users",
            alertType: "error",
          })
        );
      });
  };
};
