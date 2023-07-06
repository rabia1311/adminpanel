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
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Catnew from "../Add New/Catnew";
const Catlist = () => {
  const [category, setCategory] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [catCredentials, setCatCredentials] = useState({
    category: {
      CategoryType: "",
      CategoryName: "",
      Description: "",
      image: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:3001/admin/category")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        // console.log(data);
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
      console.log(filteredVegCategories); // Log the filtered veg categories to console
    } else if (filter === "non veg") {
      const filteredNonVegCategories = categories.filter(
        (category) => category.CategoryType === "non veg"
      );
      setFilteredCategories(filteredNonVegCategories);
      console.log(filteredNonVegCategories); // Log the filtered non-veg categories to console
    } else {
      setFilteredCategories(categories);
    }
  };

  const fetchCategoryById = (id) => {
    fetch(`http://localhost:3001/admin/category/${id}`, {
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
    formData.append("CategoryType", catCredentials.category.CategoryType);
    formData.append("CategoryName", catCredentials.category.CategoryName);
    formData.append("Description", catCredentials.category.Description);
    formData.append("image", catCredentials.category.image);

    fetch(`http://localhost:3001/admin/category/${id}`, {
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
        CategoryType: "",
        CategoryName: "",
        Description: "",
        image: "",
      },
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/category/${id}`, {
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
      <Catnew />
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h1 className="heading">List of Category</h1>
            <div>
              <Button onClick={handleFilterVeg}>Filter by Veg</Button>
              <Button onClick={handleFilterNonVeg}>Filter by Non-Veg</Button>
              <Button onClick={handleAllchange}>View All</Button>
            </div>
          </TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Category Type</TableCell>
            <TableCell align="right">Category Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>

          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell component="th" scope="row">
                  {category._id}
                </TableCell>
                <TableCell align="right">{category.CategoryType}</TableCell>
                <TableCell align="right">{category.CategoryName}</TableCell>
                <TableCell align="right">{category.Description}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/category/${category.image}`}
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
                label="Category Type gggg"
                name="CategoryType"
                value={catCredentials.category.CategoryType}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Category Name"
                name="CategoryName"
                value={catCredentials.category.CategoryName}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Description"
                name="Description"
                value={catCredentials.category.Description}
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

export default Catlist;
