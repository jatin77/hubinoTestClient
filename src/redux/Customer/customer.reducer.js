import { CustomerActionTypes } from "./customer.actionType";
import { updateCustomerToCustomerList } from "./customer.utlis";

const INITIAL_STATE = {
  customers: null,
  isLoading: false,
};

const customersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        isLoading: false,
      };
    case CustomerActionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CustomerActionTypes.ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case CustomerActionTypes.DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
      };
    case CustomerActionTypes.ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.payload, ...state.customers],
      };
    case CustomerActionTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: updateCustomerToCustomerList(
          state.customers,
          action.payload
        ),
      };
    default:
      return state;
  }
};

export default customersReducer;
