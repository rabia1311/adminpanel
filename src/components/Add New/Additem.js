import React from "react";
import { useNavigate } from "react-router-dom";
import "../Add New/Addres.scss";
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

const Additem = () => {
  const navigate = useNavigate();
  const [subcatopen, setSubcatopen] = React.useState(false);
  const handleSubCatOpen = () => setSubcatopen(true);
  const handleSubCatClose = () => setSubcatopen(false);
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
    navigate("/item");

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
  //for image upload the code is ..............

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  console.log(selectedFile);
  return (
    <div className="widget-container">
      <div className="widgett-card" onClick={handleSubCatOpen}>
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
              value={subcredentials.image}
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

export default Additem;
