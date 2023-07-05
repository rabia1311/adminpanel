import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Filter({ items, setFilteredItems, fetchCategories }) {
  const [filterOption, setFilterOption] = useState("");

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setFilterOption(selectedOption);

    // Apply the filter based on the selected option
    if (selectedOption === "priceHighToLow") {
      const sortedItems = [...items].sort(
        (a, b) => (b.category?.Itemprice || 0) - (a.category?.Itemprice || 0)
      );
      setFilteredItems(sortedItems);
    } else if (selectedOption === "priceLowToHigh") {
      const sortedItems = [...items].sort(
        (a, b) => (a.category?.Itemprice || 0) - (b.category?.Itemprice || 0)
      );
      setFilteredItems(sortedItems);
    } else if (selectedOption === "veg") {
      const filteredItems = items.filter(
        (item) => item.category?.Itemcategory === "veg"
      );
      setFilteredItems(filteredItems);
    } else if (selectedOption === "nonVeg") {
      const filteredItems = items.filter(
        (item) => item.category?.Itemcategory === "non veg"
      );
      setFilteredItems(filteredItems);
    } else {
      fetchCategories(); // Reset the category list to show all items
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterOption}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value="priceHighToLow">Price high to low</MenuItem>
          <MenuItem value="priceLowToHigh">Price low to high</MenuItem>
          <MenuItem value="veg">Filter: veg</MenuItem>
          <MenuItem value="nonVeg">Filter: non veg</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filter;
