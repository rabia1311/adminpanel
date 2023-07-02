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
  const [subcategory, setSubcategory] = useState([]);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = () => {
    fetch("http://localhost:3001/admin/subcategory")
      .then((response) => response.json())
      .then((data) => {
        setSubcategory(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/subcategory/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchSubcategories();
      })
      .catch((error) => {
        console.error("Error deleting subcategory:", error);
      });
  };

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
              <TableCell align="right">Item Price</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategory.map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item._id}
                </TableCell>
                <TableCell align="right">{item.Itemcategory}</TableCell>
                <TableCell align="right">{item.Itemname}</TableCell>
                <TableCell align="right">{item.Itemprice}</TableCell>
                <TableCell align="right">{item.Discount}</TableCell>
                <TableCell align="right">{item.numberQ}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/subcategoryimg/${item.image}`}
                    alt="Restaurant"
                    className="image-thumbnail"
                  />
                </TableCell>
                <TableCell align="right">
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
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
