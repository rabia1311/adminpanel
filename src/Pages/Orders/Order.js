import React from 'react'
import "../Orders/Order.scss"
import "../Home/home.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import List from '../../components/Table/List'



const Order = () => {
  return (
    <div className='home'>

    <Sidebar/>
    
    <div className='home-container'>
        <Navbar/>
        <div className='Widgets'>

      <List/>
    </div>
</div>
</div>    
  )
}

export default Order