import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Addrest from "../Add New/Addrest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Restuarentlists/card.scss";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@mui/material";

const Rlist = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [catCredentials, setCatCredentials] = useState({
    Restaurant_name: "",

    DeliveryTime: "",
    Description: "",
    Restaurant_Address: "",
    image: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:3001/admin/restaurant")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        setFilteredCategory(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchCategoryById = (id) => {
    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setModalData(data);
        setModalOpen(true);
        setCatCredentials(data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const id = catCredentials._id;

    const formData = new FormData();
    formData.append("id", catCredentials._id);
    formData.append("Restaurant_name", catCredentials.Restaurant_name);
    formData.append("DeliveryTime", catCredentials.DeliveryTime);
    formData.append("Description", catCredentials.Description);

    formData.append("Restaurant_Address", catCredentials.Restaurant_Address);
    formData.append("image", catCredentials.image);

    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCategories();
        resetForm();
        handleCloseModal(); // Close the modal after successful update
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  const resetForm = () => {
    setCatCredentials({
      Restaurant_name: "",
      DeliveryTime: "",
      Description: "",
      Restaurant_Address: "",
      image: null,
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleUpdate = (id) => {
    fetchCategoryById(id);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCatCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setCatCredentials((prevCredentials) => ({
      ...prevCredentials,
      image: file,
    }));
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value.trim());

    const filteredRestaurants = category.filter((cat) =>
      cat.Restaurant_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategory(filteredRestaurants);
  };
  const [isAddrestOpen, setIsAddrestOpen] = useState(false);
  const handleAddNewClick = () => {
    setIsAddrestOpen(true);
  };

  const handleRestaurantClick = (restaurantName) => {
    axios
      .get("http://localhost:3001/admin/subcategory", {
        params: {
          Restaurantname: restaurantName,
        },
      })
      .then((response) => {
        const { data } = response;
        const subcategories = data.filter(
          (subcat) => subcat.Restaurantname === restaurantName
        );
        console.log("Subcategory details:", subcategories);
        navigate("/resmenu", { state: { subcategories } });
      })
      .catch((error) => {
        console.log("Error fetching subcategory details:", error);
      });
  };
  return (
    <div>
      <Addrest />
      <div className="res-container">
        <div className="cardContainer-res">
          <h1 className="heading-tag">List of Restaurants</h1>
          <TextField
            label="Search Restaurant"
            value={searchQuery}
            onChange={handleSearch}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <SearchIcon color="action" sx={{ marginRight: "8px" }} />
              ),
            }}
            style={{ width: "200px", marginBottom: "16px" }}
          />
          {filteredCategory.map((cat) => (
            <Card key={cat._id} className="carddesign">
              <CardContent className="cardcontent">
                <h2
                  className="restaurant-name"
                  onClick={() => handleRestaurantClick(cat.Restaurant_name)}
                >
                  {cat.Restaurant_name}
                </h2>
                <p className="paragraph">Delivery Time: {cat.DeliveryTime}</p>
                <p className="paragraph">Description: {cat.Description}</p>
                <p className="paragraph">Address: {cat.Restaurant_Address}</p>
                <img
                  src={`http://localhost:3001/uploads/${cat.image}`}
                  alt="Category"
                  className="image-thumbnail-card"
                />
              </CardContent>
              <CardActions className="card-actions">
                <Button onClick={() => handleUpdate(cat._id)}>Edit</Button>
                <Button onClick={() => handleDelete(cat._id)}>Delete</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        open={modalOpen}
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
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Category
          </Typography>
          {modalData && (
            <form onSubmit={handleModalSubmit}>
              <TextField
                label="Restaurant_name"
                name="Restaurant_name"
                value={catCredentials.Restaurant_name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextField
                label="DeliveryTime"
                name="DeliveryTime"
                value={catCredentials.DeliveryTime}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="Description"
                value={catCredentials.Description}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Restaurant_Address"
                name="Restaurant_Address"
                value={catCredentials.Restaurant_Address}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
              />
              <Button type="submit" variant="contained">
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
