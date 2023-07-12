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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Add New/Additem";
import Additem from "../Add New/Additem";

const Subcategory = () => {
  const [category, setCategory] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [catCredentials, setCatCredentials] = useState({
    category: {
      Itemcategory: "",
      Itemname: "",
      Restaurantname: "",
      Itemprice: "",

      numberQ: "",
      image: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:8000/admin/subcategory")
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
        (category) => category.Itemcategory === "veg"
      );
      setFilteredCategories(filteredVegCategories);
      console.log(filteredVegCategories); // Log the filtered veg categories to console
    } else if (filter === "non veg") {
      const filteredNonVegCategories = categories.filter(
        (category) => category.Itemcategory === "non veg"
      );
      setFilteredCategories(filteredNonVegCategories);
      console.log(filteredNonVegCategories); // Log the filtered non-veg categories to console
    } else {
      setFilteredCategories(categories);
    }
  };

  const fetchCategoryById = (id) => {
    fetch(`http://localhost:8000/admin/subcategory/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setModalData(data);
        setModalOpen(true);
        setCatCredentials(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const id = catCredentials.category._id;

    const formData = new FormData();
    formData.append("id", catCredentials.category._id);
    formData.append("Itemcategory", catCredentials.category.Itemcategory);
    formData.append("Itemname", catCredentials.category.Itemname);
    formData.append("Restaurantname", catCredentials.category.Restaurantname);
    formData.append("Itemprice", catCredentials.category.Itemprice);

    formData.append("numberQ", catCredentials.category.numberQ);
    formData.append("image", catCredentials.category.image);

    fetch(`http://localhost:8000/admin/subcategory/${id}`, {
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
      category: {
        Itemcategory: "",
        Itemname: "",
        Restaurantname: "",
        Itemprice: "",

        numberQ: "",
        image: "",
      },
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/admin/subcategory/${id}`, {
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
      <Additem />
      <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <h1 className="heading">List of Item</h1>
            <div>
              <Button onClick={handleFilterVeg}>Filter by Veg</Button>
              <Button onClick={handleFilterNonVeg}>Filter by Non-Veg</Button>
              <Button onClick={handleAllchange}>View all</Button>
            </div>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Itemcategory</TableCell>
              <TableCell align="right">Itemname</TableCell>
              <TableCell align="right">Restaurantname</TableCell>
              <TableCell align="right">Itemprice</TableCell>

              <TableCell align="right">numberQ</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category._id}>
                <TableCell component="th" scope="row">
                  {category._id}
                </TableCell>
                <TableCell align="right">{category.Itemcategory}</TableCell>
                <TableCell align="right">{category.Itemname}</TableCell>
                <TableCell align="right">{category.Restaurantname}</TableCell>
                <TableCell align="right">{category.Itemprice}</TableCell>

                <TableCell align="right">{category.numberQ}</TableCell>
                <TableCell align="right">
                  <img
                    src={`http://localhost:8000/subcategoryimg/${category.image}`}
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
                label="Itemcategory"
                name="Itemcategory"
                value={catCredentials.category.Itemcategory}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Itemname"
                name="Itemname"
                value={catCredentials.category.Itemname}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Restaurantname"
                name="Restaurantname"
                value={catCredentials.category.Restaurantname}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Itemprice"
                name="Itemprice"
                value={catCredentials.category.Itemprice}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={1}
                required
              />

              <TextField
                label="numberQ"
                name="numberQ"
                value={catCredentials.category.numberQ}
                onChange={handleInputChange}
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

export default Subcategory;
