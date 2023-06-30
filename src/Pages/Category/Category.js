import React from "react";
import "../Category/category.scss";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Catlist from "../../components/Categorylist/Catlist";
const Category = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="home-container">
        <Navbar />
        <div className="Widgets">
          <Catlist />
        </div>
      </div>
    </div>
  );
};

export default Category;
