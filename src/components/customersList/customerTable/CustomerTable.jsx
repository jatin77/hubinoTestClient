import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { selectCustomers } from "../../../redux/Customer/customer.selector";

const columns = [
  { id: "name", label: "Name", align: "center" },
  { id: "email", label: "Email", align: "center" },
  {
    id: "phone",
    label: "Phone",
    align: "center",
  },
  {
    id: "gender",
    label: "Gender",
    align: "center",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const CustomerTable = (props) => {
  const history = useHistory();

  // Get Campaign List
  let customers = props.customers.customers;

  // Return Campaign Row Object
  const createDatas = (name, email, phone, gender, id) => {
    return { name, email, phone, gender, id };
  };

  let customerRows = [];

  // Create Campaign List Rows
  if (customers && customers.length) {
    customers.forEach((customer) => {
      customerRows.push(
        createDatas(
          customer.name,
          customer.email,
          customer.phone,
          customer.gender,
          customer.id
        )
      );
    });
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Redirect to Detail View of Selected Campaign
  const handleCampaignClick = (id) => {
    let selectedCustomer = customers.filter(
      (customer) => customer.id === id
    )[0];
    props.handleEditCustomerClick(selectedCustomer);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerRows &&
              customerRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      className="cursor-pointer"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      onClick={() => handleCampaignClick(row.id)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={customerRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  customers: selectCustomers,
});

export default connect(mapStateToProps)(CustomerTable);
