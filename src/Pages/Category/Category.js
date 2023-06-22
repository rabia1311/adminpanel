import React from 'react'
import "../Category/category.scss"
import "../Home/home.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
const Category = () => {
  return (
    <div className='home'>

    <Sidebar/>
    
    <div className='home-container'>
        <Navbar/>
        <div className='Widgets'>

    category lists are displayed 
    </div>
</div>
</div>    
  )
}

export default Category