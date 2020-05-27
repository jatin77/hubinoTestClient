export const updateCustomerToCustomerList = (customers, customerToUpdate) => {
  return customers.map((customer) =>
    customer.id === customerToUpdate.id
      ? {
          ...customer,
          name: customerToUpdate.name,
          email: customerToUpdate.email,
          phone: customerToUpdate.phone,
          gender: customerToUpdate.gender,
        }
      : customer
  );
};
