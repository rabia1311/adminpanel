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
    fetchRestaurants();
  }, []);

  const fetchRestaurants = () => {
    fetch("http://localhost:3001/admin/restaurant")
      .then((response) => response.json())
      .then((data) => {
        setRestuarant(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response for demonstration purposes
        fetchRestaurants(); // Fetch the updated list of restaurants after deletion
      })
      .catch((error) => {
        console.error("Error deleting restaurant:", error);
      });
  };

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
            {restuarant.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <TableCell component="th" scope="row">
                  {restaurant._id}
                </TableCell>
                <TableCell align="right">
                  {restaurant.Restaurant_name}
                </TableCell>
                <TableCell align="right">{restaurant.Category}</TableCell>
                <TableCell align="right">{restaurant.DeliveryTime}</TableCell>
                <TableCell align="right">{restaurant.Description}</TableCell>
                <TableCell align="right">
                  {restaurant.Restaurant_Address}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/uploads/${restaurant.image}`}
                    alt="Restaurant"
                    className="image-thumbnail"
                  />
                </TableCell>
                <TableCell align="right">
                  <button>Edit</button>
                  <button onClick={() => handleDelete(restaurant._id)}>
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

export default Rlist;
