import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import "../Restuarentlists/rlist.scss";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Customerlist = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("http://localhost:3001/admin/customer")
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/customerImg/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchCustomers();
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  return (
    <div className="container">
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h1 className="heading">List of Customers Enrolled</h1>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell component="th" scope="row">
                  {customer._id}
                </TableCell>
                <TableCell align="right">{customer.name}</TableCell>
                <TableCell align="right">{customer.email}</TableCell>
                <TableCell align="right">{customer.ID}</TableCell>
                <TableCell align="right">{customer.phone}</TableCell>
                <TableCell align="right">{customer.address}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/customerImg/${customer.image}`}
                    alt="Restaurant"
                    className="image-thumbnail"
                  />
                </TableCell>
                <TableCell align="right">
                  <button>Edit</button>
                  <button onClick={() => handleDelete(customer._id)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customerlist;
