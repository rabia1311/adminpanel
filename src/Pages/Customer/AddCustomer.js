import React from "react";
import "../Item/item.scss";
import "../Home/home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Customerlist from "../../components/AddUser/Customerlist";
const AddCustomer = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="home-container">
        <Navbar />
        <div className="Widgets">
          <Customerlist />
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
