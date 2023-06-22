import React from 'react'
import "../Item/item.scss"
import "../Home/home.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
const Item = () => {
  return (
    <div className='home'>

    <Sidebar/>
    
    <div className='home-container'>
        <Navbar/>
        <div className='Widgets'>

   Table of items  are displayed Here 
    </div>
</div>
</div>    
  )
}

export default Item