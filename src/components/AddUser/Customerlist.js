import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import Typography from "@mui/material/Typography";
const CustomerList = () => {
  const [category, setCategory] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState([]);

  const [catCredentials, setCatCredentials] = useState({
    category: {
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
    },
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:3001/admin/customer")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchCategoryById = (id) => {
    fetch(`http://localhost:3001/admin/customer/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setModalData(data);
        // console.log(data);
        setModalOpen(true);
        setCatCredentials(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(modalData);
  console.log(catCredentials);

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const id = catCredentials.category._id;

    const formData = new FormData();
    formData.append("id", catCredentials.category._id);
    formData.append("name", catCredentials.category.name);
    formData.append("email", catCredentials.category.email);
    formData.append("address", catCredentials.category.address);
    formData.append("phone", catCredentials.category.phone);

    formData.append("image", catCredentials.category.image);

    fetch(`http://localhost:3001/admin/customer/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
      category: {
        name: "",
        email: "",
        address: "",
        phone: "",
        image: "",
      },
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/customer/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleUpdate = (id) => {
    // console.log(id);
    fetchCategoryById(id);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCatCredentials((prevCredentials) => ({
      category: {
        ...prevCredentials.category,
        [name]: value,
      },
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setCatCredentials((prevCredentials) => ({
      category: {
        ...prevCredentials.category,
        image: file,
      },
    }));
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value.trim());

    const filteredRestaurants = category.filter((cat) =>
      cat.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategory(filteredRestaurants);
  };

  return (
    <div className="container">
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h1 className="heading">List of Customer</h1>
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
              style={{ width: "200px", marginRight: "16px" }}
            />
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">address</TableCell>
              <TableCell align="right">phone</TableCell>
              <TableCell align="right">image</TableCell>

              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategory.map((category) => (
              <TableRow key={category._id}>
                <TableCell component="th" scope="row">
                  {category._id}
                </TableCell>
                <TableCell align="right">{category.name}</TableCell>
                <TableCell align="right">{category.email}</TableCell>
                <TableCell align="right">{category.address}</TableCell>
                <TableCell align="right">{category.phone}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/customerImg/${category.image}`}
                    alt="Category"
                    className="image-thumbnail"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleUpdate(category._id)}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(category._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Customer
          </Typography>
          {modalData && (
            <form onSubmit={handleModalSubmit}>
              <TextField
                label="name"
                name="name"
                value={catCredentials.category.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="email"
                name="email"
                value={catCredentials.category.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="address"
                name="address"
                value={catCredentials.category.address}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
              <TextField
                label="phone"
                name="phone"
                value={catCredentials.category.phone}
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
                type="file"
                onChange={handleFileInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
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

export default CustomerList;
