import React from "react";
import "../Item/item.scss";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Subcategory from "../../components/Itemlist/Subcategory";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Item = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/home");
  };
  return (
    <div className="home">
      <Sidebar />

      <div className="home-container">
        <Navbar />
        <div className="Widgets">
          <Subcategory />

          <Button onClick={handleBackClick}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
