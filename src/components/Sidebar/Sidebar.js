import React from 'react'
import "../Sidebar/sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className='Sidebar'>
        <div className='top'>

            <span className='logo'>RabiaAdmin</span>
        </div>
        <hr/>
        <div className='center'>

            <ul>
                <li onClick={() => navigate("/home")}>
              
                <DashboardIcon className='icons'/>
                    <span> Dashboard</span>
                </li>
               
                <br/>
                <p className='title'>LISTS</p>
                <li onClick={() => navigate("/restuarants")}>
                <RestaurantMenuIcon className='icons'/>
                    <span> Restuarants</span>
                </li>
                <li onClick={() => navigate("/cat")}>
                <CategoryIcon className='icons'/>
                    <span>Category List</span>
                </li>
                <li onClick={() => navigate("/item")}>
                <RamenDiningIcon className='icons'/>
                    <span> Food item list </span>
                </li>
                <br/>
                <p className='title'>SERVICE</p>
                <li onClick={() => navigate("/order")}>
  <ListAltIcon className='icons' />
  <span> Orders</span>
</li>
                <br/>
                <p className='title'>USER</p>
                
                <li  onClick={() => navigate("/profile")}>
                < AccountCircleIcon className='icons'/>
                    <span>  Profile</span>
                </li>
                <br/>
                <li   onClick={() => navigate("/")}>
                <ExitToAppIcon className='icons'/>
                    <span>Exit</span>
                </li>
            </ul>
        
        </div>
       
    </div>
  )
}

export default Sidebar