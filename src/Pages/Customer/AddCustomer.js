import React, { useState } from "react";
import "../Item/item.scss";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Customerlist from "../../components/AddUser/Customerlist";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const AddCustomer = () => {
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
          <Customerlist />
          <Button onClick={handleBackClick}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
