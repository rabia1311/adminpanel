import React from 'react'
import "../Sidebar/sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
const Sidebar = () => {
  return (
    <div className='Sidebar'>
        <div className='top'>

            <span className='logo'>RabiaAdmin</span>
        </div>
        <hr/>
        <div className='center'>

            <ul>
                <li>
              
                <DashboardIcon className='icons'/>
                    <span> Dashboard</span>
                </li>
               
                <br/>
                <p className='title'>LISTS</p>
                <li>
                <RestaurantMenuIcon className='icons'/>
                    <span> Restuarants</span>
                </li>
                <br/>
                <p className='title'>SERVICE</p>
                <li>
                <ListAltIcon className='icons'/>
                    <span> Orders</span>
                </li>
                <br/>
                <p className='title'>USER</p>
                
                <li>
                < AccountCircleIcon className='icons'/>
                    <span>  Profile</span>
                </li>
                <br/>
                <li>
                <ExitToAppIcon className='icons'/>
                    <span>Exit</span>
                </li>
            </ul>
        
        </div>
       
    </div>
  )
}

export default Sidebar