import React from "react";
import "../Add New/Addres.scss";
import { useNavigate } from "react-router-dom";
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

const Catnew = () => {
  const navigate = useNavigate();
  const [catopen, setCatopen] = React.useState(false);
  const handleCatOpen = () => setCatopen(true);
  const handleCatClose = () => setCatopen(false);
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

  //for image upload the code is ..............

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  console.log(selectedFile);
  return (
    <div className="widget-container">
      <div className="widgett-card" onClick={handleCatOpen}>
        ADD New
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
              value={catcredentials.image}
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

export default Catnew;
