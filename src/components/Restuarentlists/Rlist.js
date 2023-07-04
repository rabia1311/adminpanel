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
  const [category, setCategory] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const [catCredentials, setCatCredentials] = useState({
    category: {
      Restaurant_name: "",
      Category: "",
      DeliveryTime: "",
      Description: "",
      Restaurant_Address: "",
      image: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:3001/admin/restaurant")
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
    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
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
    formData.append("Restaurant_name", catCredentials.category.Restaurant_name);
    formData.append("Category", catCredentials.category.Category);
    formData.append("DeliveryTime", catCredentials.category.DeliveryTime);
    formData.append(
      "Restaurant_Address",
      catCredentials.category.Restaurant_Address
    );

    formData.append("image", catCredentials.category.image);

    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
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
        Restaurant_name: "",
        Category: "",
        DeliveryTime: "",
        Description: "",
        Restaurant_Address: "",
        image: "",
      },
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/admin/restaurant/${id}`, {
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
  return (
    <div className="container">
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h1 className="heading">List of Restaurant</h1>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Restaurant_name</TableCell>
              <TableCell align="right"> Category</TableCell>
              <TableCell align="right">DeliveryTime</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Restaurant_Address</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((category) => (
              <TableRow key={category._id}>
                <TableCell component="th" scope="row">
                  {category._id}
                </TableCell>
                <TableCell align="right">{category.Restaurant_name}</TableCell>
                <TableCell align="right">{category.Category}</TableCell>
                <TableCell align="right">{category.DeliveryTime}</TableCell>
                <TableCell align="right">{category.Description}</TableCell>
                <TableCell align="right">
                  {category.Restaurant_Address}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:3001/uploads/${category.image}`}
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
                value={catCredentials.category.Restaurant_name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Category"
                name="Category"
                value={catCredentials.category.Category}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="DeliveryTime"
                name="DeliveryTime"
                value={catCredentials.category.DeliveryTime}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={1}
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
                rows={2}
                required
              />
              <TextField
                label="Restaurant_Address"
                name="Restaurant_Address"
                value={catCredentials.category.Restaurant_Address}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={2}
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

export default Rlist;
