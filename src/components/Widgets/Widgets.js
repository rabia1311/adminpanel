import React from "react";
import "../Widgets/widget.scss";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

import { TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 12,
};
const Widgets = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [catopen, setCatopen] = React.useState(false);
  const handleCatOpen = () => setCatopen(true);
  const handleCatClose = () => setCatopen(false);

  const [subcatopen, setSubcatopen] = React.useState(false);
  const handleSubCatOpen = () => setSubcatopen(true);
  const handleSubCatClose = () => setSubcatopen(false);

  const [useropen, setUseropen] = React.useState(false);
  const handleUserOpen = () => setUseropen(true);
  const handleUserClose = () => setUseropen(false);

  //user
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    ID: "",
    phone: "",
    address: "",
    image: "",
  });

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("ID", credentials.ID);
    formData.append("phone", credentials.phone);
    formData.append("address", credentials.address);

    const response = await fetch("http://localhost:3001/admin/customer", {
      method: "POST",

      body: formData,
    });

    const json = await response.json(); // Await the response.json() method

    console.log(json);
    if (!json.success) {
      toast.error("Enter valid credentials");
    } else {
      toast.success("Customer added successfully");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  console.log(credentials);

  //subcategory

  const [subcredentials, setSubcredentials] = useState({
    Itemcategory: "",
    Itemname: "",
    Itemprice: "",
    Discount: "",
    numberQ: "",
    image: "",
  });

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Itemcategory", subcredentials.Itemcategory);
    formData.append("Itemname", subcredentials.Itemname);
    formData.append("Itemprice", subcredentials.Itemprice);
    formData.append("Discount", subcredentials.Discount);
    formData.append("numberQ", subcredentials.numberQ);
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:3001/admin/subcategory", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        toast.error("Enter valid credentials");
      } else {
        toast.success("Subcategory added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubChange = (event) => {
    setSubcredentials({
      ...subcredentials,
      [event.target.name]: event.target.value,
    });
  };
  console.log(subcredentials);

  //category

  const [catcredentials, setCatcredentials] = useState({
    CategoryType: "",
    CategoryName: "",
    Description: "",

    image: "",
  });

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CategoryType", catcredentials.CategoryType);
    formData.append("CategoryName", catcredentials.CategoryName);
    formData.append("Description", catcredentials.Description);
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:3001/admin/category", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      console.log(json);
      if (!json.success) {
        toast.error("Enter valid credentials");
      } else {
        toast.success("Category added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCatChange = (event) => {
    setCatcredentials({
      ...catcredentials,
      [event.target.name]: event.target.value,
    });
  };
  console.log(catcredentials);

  //restuarants adding here :

  const [rescredentials, setRescredentials] = useState({
    Restaurantname: "",
    Category: "",
    DeliveryTime: "",
    Description: "",
    RestaurantAddress: "",

    image: "",
  });

  const handleResSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("Restaurantname", rescredentials.Restaurantname);
    formData.append("Category", rescredentials.Category);
    formData.append("DeliveryTime", rescredentials.DeliveryTime);
    formData.append("Description", rescredentials.Description);
    formData.append("RestaurantAddress", rescredentials.RestaurantAddress);

    try {
      const response = await fetch("http://localhost:3001/admin/restaurant", {
        method: "POST",

        body: formData,
      });

      const json = await response.json();

      console.log(json);
      if (!json.success) {
        toast.error("Enter valid credentials");
      } else {
        toast.success("Restuarant added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResChange = (event) => {
    setRescredentials({
      ...rescredentials,
      [event.target.name]: event.target.value,
    });
  };
  console.log(rescredentials);

  //for image upload the code is ..............

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  console.log(selectedFile);

  return (
    <div className="widget-container">
      <div className="widget-card" onClick={handleOpen}>
        ADD RESTAURANTS
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Restaurant
          </Typography>
          <form onSubmit={handleResSubmit}>
            <TextField
              label="Restaurant_name"
              name="Restaurantname"
              value={rescredentials.Restaurantname}
              onChange={handleResChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Category"
              name="Category"
              value={rescredentials.Category}
              onChange={handleResChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="DeliveryTime"
              name="DeliveryTime"
              value={rescredentials.DeliveryTime}
              onChange={handleResChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="Description"
              value={rescredentials.Description}
              onChange={handleResChange}
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={1}
              required
            />
            <TextField
              label="Restaurant_Address"
              name="RestaurantAddress"
              value={rescredentials.RestaurantAddress}
              onChange={handleResChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Logo"
              name="image"
              value={rescredentials.image}
              onChange={handleFileChange} //changes made
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <ToastContainer />
        </Box>
      </Modal>
      <div className="widget-card" onClick={handleCatOpen}>
        ADD CATEGORY
      </div>
      <Modal
        open={catopen}
        onClose={handleCatClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Category
          </Typography>
          <form onSubmit={handleCatSubmit}>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Category Type
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Category Type"
                name="CategoryType"
                value={catcredentials.CategoryType}
                onChange={handleCatChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
            </Box>
            <TextField
              label="Category Name"
              name="CategoryName"
              value={catcredentials.CategoryName}
              onChange={handleCatChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="Description"
              value={catcredentials.Description}
              onChange={handleCatChange}
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
              value={rescredentials.image}
              onChange={handleFileChange} //changes made
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <ToastContainer />
        </Box>
      </Modal>

      <div className="widget-card" onClick={handleSubCatOpen}>
        ADD SUBCATEGORY
      </div>
      <Modal
        open={subcatopen}
        onClose={handleSubCatClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Food Item
          </Typography>
          <form onSubmit={handleSubCategorySubmit}>
            <TextField
              label="Item Category"
              name="Itemcategory"
              value={subcredentials.Itemcategory}
              onChange={handleSubChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Item Name"
              variant="outlined"
              name="Itemname"
              value={subcredentials.Itemname}
              onChange={handleSubChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Item Price"
              variant="outlined"
              name="Itemprice"
              value={subcredentials.Itemprice}
              onChange={handleSubChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Discount %"
              name="Discount"
              value={subcredentials.Discount}
              onChange={handleSubChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Number of Item Quantity"
              name="numberQ"
              value={subcredentials.numberQ}
              onChange={handleSubChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Logo"
              name="image"
              value={rescredentials.image}
              onChange={handleFileChange} //changes made
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
            />

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <ToastContainer />
        </Box>
      </Modal>

      <div className="widget-card" onClick={handleUserOpen}>
        ADD USER
      </div>
      <Modal
        open={useropen}
        onClose={handleUserClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <form onSubmit={handleUserSubmit}>
            <TextField
              label="Name"
              value={credentials.name}
              name="name"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="ID"
              name="ID"
              value={credentials.ID}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone No"
              name="phone"
              value={credentials.phone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="User Address"
              value={credentials.address}
              name="address"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Logo"
              name="image"
              value={rescredentials.image}
              onChange={handleFileChange} //changes made
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
          <ToastContainer />
        </Box>
      </Modal>
    </div>
  );
};

export default Widgets;
