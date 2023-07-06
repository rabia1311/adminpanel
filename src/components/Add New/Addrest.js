import React from "react";
import "../Add New/Addres.scss";
import { useNavigate } from "react-router-dom";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Addrest = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <div className="widgett-card" onClick={handleOpen}>
        ADD NEW
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
    </div>
  );
};

export default Addrest;
