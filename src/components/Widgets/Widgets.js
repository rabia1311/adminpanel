import React from 'react'
import"../Widgets/widget.scss"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {  TextField, Button,RadioGroup, FormControlLabel, Radio } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 12,
  };
const Widgets = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission here
  };

  const [catopen, setCatopen] = React.useState(false);
    const handleCatOpen = () => setCatopen(true);
  const handleCatClose = () => setCatopen(false);

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission here
  };

  const [subcatopen, setSubcatopen] = React.useState(false);
  const handleSubCatOpen = () => setSubcatopen(true);
const handleSubCatClose = () => setSubcatopen(false);
  const handleSubCategorySubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission here
  };



  const [useropen, setUseropen] = React.useState(false);
  const handleUserOpen = () => setUseropen(true);
const handleUserClose = () => setUseropen(false);
  const handleUserSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission here
  };


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
          <form onSubmit={handleSubmit}>
            <TextField
              label="Restaurant Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
           
            <TextField
              label="Delivery Time"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={1}
              required
            />
            <TextField
              label="Restaurant Address"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Logo"
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
              required
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    <div className="widget-card"  onClick={handleCatOpen}>ADD CATEGORY</div>
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
          <form onSubmit={handleCategorySubmit}>
          <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
              Category Type
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RadioGroup aria-label="Category Type" name="categoryType" required>
                <FormControlLabel value="VEG" control={<Radio />} label="VEG" />
                <FormControlLabel value="NON VEG" control={<Radio />} label="NON VEG" />
              </RadioGroup>
            </Box>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />
           
            <TextField
              label="Logo"
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
              required
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>




    <div className="widget-card" onClick={handleSubCatOpen} >ADD SUBCATEGORY</div>
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
            <RadioGroup aria-label="Item Category Type" name="categoryType" required>
              <FormControlLabel value="VEG" control={<Radio />} label="VEG" />
              <FormControlLabel value="NON VEG" control={<Radio />} label="NON VEG" />
            </RadioGroup>
            <TextField
              label="Item Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Item Price"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
             <TextField
              label="Discount %"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Number of Item Quantity"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Item Image"
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
              required
            />
           
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>



    <div className="widget-card" onClick={handleUserOpen}>ADD USER</div>
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
          <form onSubmit={ handleUserSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="ID"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone No"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="User Address"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Profile Image"
              variant="outlined"
              fullWidth
              margin="normal"
              type="file"
              required
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
  </div>
  )
}

export default Widgets