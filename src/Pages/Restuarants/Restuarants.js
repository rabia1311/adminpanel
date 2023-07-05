import React from "react";
import "../Restuarants/res.scss";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Rlist from "../../components/Restuarentlists/Rlist";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Restuarants = () => {
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
          <Rlist />
          <Button onClick={handleBackClick}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default Restuarants;
