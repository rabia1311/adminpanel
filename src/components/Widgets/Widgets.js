import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Widgets/widget.scss";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

import { TextField, Button } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 12,
};
const Widgets = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const options = ["veg", "non veg"];

  // Fetch restaurant names from the API endpoint
  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/restaurant")
      .then((response) => {
        const { data } = response;
        setRestaurantList(data);
      })
      .catch((error) => {
        console.log("Error fetching restaurant names:", error);
      });
  }, []);
  const navigate = useNavigate();
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

  const [brandopen, setBrandopen] = React.useState(false);
  const handleBrandOpen = () => setBrandopen(true);
  const handleBrandClose = () => setBrandopen(false);

  //brand

  const [bcredentials, setBcredentials] = useState({
    brandname: "",
    time: "",
    image: "",
  });

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("brandname", bcredentials.brandname);
    formData.append("time", bcredentials.time);

    const response = await fetch("http://localhost:8000/admin/brand", {
      method: "POST",
      body: formData,
    });
    const json = await response.json(); // Await the response.json() method

    console.log(json);
    if (!json.success) {
      toast.error("Enter valid credentials");
    } else {
      toast.success("Brand added successfully");
    }
    navigate("/brandpage");
  };

  const handleBrandChange = (event) => {
    setBcredentials({
      ...bcredentials,
      [event.target.name]: event.target.value,
    });
  };
  console.log(bcredentials);

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

    const response = await fetch("http://localhost:8000/admin/customer", {
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
    navigate("/customer");
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  console.log(credentials);

  //subcategory

  const [subcredentials, setSubcredentials] = useState({
    Itemcategory: "",
    Itemname: "",
    Restaurantname: "",
    Itemprice: "",

    numberQ: "",
    image: "",
  });

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    navigate("/item");

    const formData = new FormData();
    formData.append("Itemcategory", subcredentials.Itemcategory);
    formData.append("Itemname", subcredentials.Itemname);
    formData.append("Restaurantname", subcredentials.Restaurantname);
    formData.append("Itemprice", subcredentials.Itemprice);

    formData.append("numberQ", subcredentials.numberQ);
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/admin/subcategory", {
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
    setSelectedCategory(event.target.value);
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
    navigate("/cat");
    const formData = new FormData();
    formData.append("CategoryType", catcredentials.CategoryType);
    formData.append("CategoryName", catcredentials.CategoryName);
    formData.append("Description", catcredentials.Description);
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/admin/category", {
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
    Restaurant_name: "",
    Category: "",
    DeliveryTime: "",
    Description: "",
    Restaurant_Address: "",

    image: "",
  });

  const handleResSubmit = async (e) => {
    e.preventDefault();
    navigate("/restuarants");
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("Restaurant_name", rescredentials.Restaurant_name);
    formData.append("Category", rescredentials.Category);
    formData.append("DeliveryTime", rescredentials.DeliveryTime);
    formData.append("Description", rescredentials.Description);
    formData.append("Restaurant_Address", rescredentials.Restaurant_Address);

    try {
      const response = await fetch("http://localhost:8000/admin/restaurant", {
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

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/admin/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  });

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
              name="Restaurant_name"
              value={rescredentials.Restaurant_name}
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
              name="Restaurant_Address"
              value={rescredentials.Restaurant_Address}
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
                select // Use select property for dropdown functionality
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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

      <div className="widget-card" onClick={handleBrandOpen}>
        ADD BRAND
      </div>
      <Modal
        open={brandopen}
        onClose={handleBrandClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Brand
          </Typography>
          <form onSubmit={handleBrandSubmit}>
            <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Brand Name
            </Typography>

            <TextField
              label="Brand Name"
              name="brandname"
              value={bcredentials.brandname}
              onChange={handleBrandChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="time"
              name="time"
              value={bcredentials.time}
              onChange={handleBrandChange}
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={1}
              required
            />

            <TextField
              label="Logo"
              name="image"
              value={bcredentials.image}
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
        ADD FOOD ITEM
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
              label="Select Category"
              name="Itemcategory"
              value={selectedCategory}
              onChange={handleSubChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              select
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.CategoryName}>
                  {category.CategoryName}
                </MenuItem>
              ))}
            </TextField>

            <FormControl variant="outlined" fullWidth margin="normal" required>
              <InputLabel id="restaurantname-label">Restaurant Name</InputLabel>
              <Select
                labelId="restaurantname-label"
                id="restaurantname-select"
                name="Restaurantname"
                value={subcredentials.Restaurantname}
                onChange={handleSubChange}
                label="Restaurant Name"
              >
                <MenuItem value="">Select Restaurant</MenuItem>
                {restaurantList.map((restaurant) => (
                  <MenuItem
                    key={restaurant._id}
                    value={restaurant.Restaurant_name}
                  >
                    {restaurant.Restaurant_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
