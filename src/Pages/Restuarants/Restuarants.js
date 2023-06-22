import React from 'react'
import "../Restuarants/res.scss"
import "../Home/home.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Rlist from '../../components/Restuarentlists/Rlist'
const Restuarants = () => {
  return (
    <div className='home'>

<Sidebar/>

<div className='home-container'>
    <Navbar/>

    <div className='Widgets'>

     <Rlist/>
    </div>
  </div>
    </div>
  )
}

export default Restuarants;