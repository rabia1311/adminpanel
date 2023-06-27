import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import "../Restuarentlists/rlist.scss";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Rlist = () => {
  const [restuarant, setRestuarant] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/admin/restaurant")
      .then((response) => response.json())
      .then((data) => {
        setRestuarant(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(restuarant);

  return (
    <div className="container">
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h1 className="heading">List of Restaurants</h1>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Restaurant Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Delivery Time</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restuarant.map((restuarant) => (
              <TableRow key={restuarant._id}>
                <TableCell component="th" scope="row">
                  {restuarant._id}
                </TableCell>
                <TableCell align="right">
                  {restuarant.Restaurant_name}
                </TableCell>
                <TableCell align="right">{restuarant.Category}</TableCell>
                <TableCell align="right">{restuarant.DeliveryTime}</TableCell>
                <TableCell align="right">{restuarant.Description}</TableCell>
                <TableCell align="right">
                  {restuarant.Restaurant_Address}
                </TableCell>
                <TableCell align="right">
                  <img src={restuarant.image} alt="Restaurant" />
                </TableCell>
                <TableCell align="right">
                  <button>Edit</button>
                  <button>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Rlist;
