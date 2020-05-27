import { createSelector } from "reselect";

const selectAllCustomers = (state) => state.customers;

export const selectCustomers = createSelector(
  [selectAllCustomers],
  (customers) => customers
);
