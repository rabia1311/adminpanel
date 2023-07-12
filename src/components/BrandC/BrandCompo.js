import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableBody } from "@mui/material";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const BrandCompo = () => {
  const [category, setCategory] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [catCredentials, setCatCredentials] = useState({
    brandname: "",
    time: "",
    image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:8000/admin/brand")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        filterCategories(data, filter);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filterCategories = (categories, filter) => {
    if (filter === "veg") {
      const filteredVegCategories = categories.filter(
        (category) => category.CategoryType === "veg"
      );
      setFilteredCategories(filteredVegCategories);
    } else if (filter === "non veg") {
      const filteredNonVegCategories = categories.filter(
        (category) => category.CategoryType === "non veg"
      );
      setFilteredCategories(filteredNonVegCategories);
    } else {
      setFilteredCategories(categories);
    }
  };

  const fetchCategoryById = (id) => {
    fetch(`http://localhost:8000/admin/brand/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setModalData(data);
        setModalOpen(true);
        setCatCredentials(
          data.category || {
            brandname: "",
            time: "",
            image: "",
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const id = catCredentials._id;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("brandname", catCredentials.brandname);
    formData.append("time", catCredentials.time);
    formData.append("image", catCredentials.image);

    fetch(`http://localhost:8000/admin/brand/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCategories();
        resetForm();
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating brand:", error);
      });
  };

  const resetForm = () => {
    setCatCredentials({
      ...catCredentials,
      brandname: "",
      time: "",
      image: "",
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/admin/brand/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting brand:", error);
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

  const handleFilterVeg = () => {
    filterCategories(category, "veg");
  };

  const handleFilterNonVeg = () => {
    filterCategories(category, "non veg");
  };

  const handleAllchange = () => {
    setFilteredCategories(category);
  };

  return (
    <div className="container">
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h1 className="heading">List of BRANDS</h1>
            <div>
              <Button onClick={handleFilterVeg}>Filter by Veg</Button>
              <Button onClick={handleFilterNonVeg}>Filter by Non-Veg</Button>
              <Button onClick={handleAllchange}>View All</Button>
            </div>
          </TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Brand Name</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell component="th" scope="row">
                  {category._id}
                </TableCell>
                <TableCell align="right">{category.brandname}</TableCell>
                <TableCell align="right">{category.time}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:8000/brandimg/${category.image}`}
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
            Edit Category
          </Typography>
          {modalData && (
            <form onSubmit={handleModalSubmit}>
              <TextField
                label="brandname"
                name="brandname"
                value={catCredentials.brandname}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="time"
                name="time"
                value={catCredentials.time}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
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

export default BrandCompo;
