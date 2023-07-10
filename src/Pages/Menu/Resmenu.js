import React from "react";
import { useLocation } from "react-router-dom";
import "../Menu/resmenu.css";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
const Resmenu = () => {
  const location = useLocation();
  const { subcategories } = location.state || [];

  return (
    <div>
      <h1>Restaurant Menu</h1>
      <div className="subcategory-container">
        {subcategories.map((subcategory) => (
          <div key={subcategory._id} className="subcategory-item">
            <h4>ITEM : {subcategory.Itemname}</h4>
            <h4> CATEGORY :{subcategory.Itemcategory}</h4>
            <h4>PRICE : {subcategory.Restaurantname}</h4>
            <h4>PRICE : {subcategory.Itemprice}</h4>

            {/* Render other details of the subcategory */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resmenu;
