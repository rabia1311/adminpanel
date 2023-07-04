import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import "../Restuarentlists/rlist.scss";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Rlist = () => {
  const [restaurant, setRestaurant] = useState([]);
  const [rmodalData, setRmodalData] = useState(null);
  const [rmodalOpen, setRModalOpen] = useState(false);

  const [resCredentials, setResCredentials] = useState({
    restaurant: {
      Restaurantname: "",
      Category: "",
      DeliveryTime: "",
      Description: "",
      RestaurantAddress: "",
      image: "",
    },
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = () => {
    fetch("http://localhost:3001/admin/restaurant")
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchRestaurantsById = (id) => {
    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRmodalData(data);
        setRModalOpen(true);
        setResCredentials(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const id = resCredentials.restaurant._id;
    const formData = new FormData();

    formData.append("id", resCredentials.restaurant._id);
    formData.append("Restaurantname", resCredentials.restaurant.Restaurantname);
    formData.append("Category", resCredentials.restaurant.Category);
    formData.append("DeliveryTime", resCredentials.restaurant.DeliveryTime);
    formData.append("Description", resCredentials.restaurant.Description);
    formData.append(
      "RestaurantAddress",
      resCredentials.restaurant.RestaurantAddress
    );
    formData.append("image", resCredentials.restaurant.image);

    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        fetchRestaurants();
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating restaurant:", error);
      });
  };

  const handleUpdate = (id) => {
    fetchRestaurantsById(id);
  };

  const handleCloseModal = () => {
    setRModalOpen(false);
    setRmodalData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResCredentials((prevCredentials) => ({
      ...prevCredentials,
      restaurant: {
        ...prevCredentials.restaurant,
        [name]: value,
      },
    }));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchRestaurants();
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
            {restaurant.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <TableCell component="th" scope="row">
                  {restaurant._id}
                </TableCell>
                <TableCell align="right">{restaurant.Restaurantname}</TableCell>
                <TableCell align="right">{restaurant.Category}</TableCell>
                <TableCell align="right">{restaurant.DeliveryTime}</TableCell>
                <TableCell align="right">{restaurant.Description}</TableCell>
                <TableCell align="right">
                  {restaurant.RestaurantAddress}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/uploads/${restaurant.image}`}
                    alt="Restaurant"
                    className="image-thumbnail"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleUpdate(restaurant._id)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(restaurant._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={rmodalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Restaurant
          </Typography>
          {rmodalData && (
            <form onSubmit={handleModalSubmit}>
              <TextField
                label="Restaurant Name"
                name="Restaurantname"
                value={resCredentials.restaurant.Restaurantname}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Category"
                name="Category"
                value={resCredentials.restaurant.Category}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Delivery Time"
                name="DeliveryTime"
                value={resCredentials.restaurant.DeliveryTime}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
              <TextField
                label="Description"
                name="Description"
                value={resCredentials.restaurant.Description}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
              <TextField
                label="Restaurant Address"
                name="RestaurantAddress"
                value={resCredentials.restaurant.RestaurantAddress}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
              <TextField
                label="Logo"
                name="image"
                value={resCredentials.restaurant.image}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" type="submit">
                Update
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Rlist;
