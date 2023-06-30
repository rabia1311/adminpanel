import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import "../Restuarentlists/rlist.scss";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Subcategory = () => {
  const [restuarant, setRestuarant] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/admin/subcategory")
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
            <h1 className="heading">List of Food Items </h1>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Item Category</TableCell>
              <TableCell align="right">Item Name</TableCell>
              <TableCell align="right">Item Price </TableCell>
              <TableCell align="right">Discount </TableCell>

              <TableCell align="right">Quantity</TableCell>
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
                <TableCell align="right">{restuarant.Itemcategory}</TableCell>
                <TableCell align="right">{restuarant.Itemname}</TableCell>
                <TableCell align="right">{restuarant.Itemprice}</TableCell>
                <TableCell align="right">{restuarant.Discount}</TableCell>
                <TableCell align="right">{restuarant.numberQ}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/subcategoryimg/${restuarant.image}`}
                    alt="Restaurant"
                    className="image-thumbnail"
                  />
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

export default Subcategory;
