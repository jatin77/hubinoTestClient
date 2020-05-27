import { combineReducers } from "redux";
import alertReducer from "./alerts/alert.reducer";
import customersReducer from "./Customer/customer.reducer";

const rootReducer = combineReducers({
  customers: customersReducer,
  alert: alertReducer,
});

export default rootReducer;
