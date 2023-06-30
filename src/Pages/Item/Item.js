import React from "react";
import "../Item/item.scss";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Subcategory from "../../components/Itemlist/Subcategory";
const Item = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="home-container">
        <Navbar />
        <div className="Widgets">
          <Subcategory />
        </div>
      </div>
    </div>
  );
};

export default Item;
