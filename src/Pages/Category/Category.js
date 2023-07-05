import React from "react";
import "../Category/category.scss";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Catlist from "../../components/Categorylist/Catlist";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Category = () => {
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
          <Catlist />
          <Button onClick={handleBackClick}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default Category;
