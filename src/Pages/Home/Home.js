import React from 'react'
import "../Home/home.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Widgets from '../../components/Widgets/Widgets'
const Home = () => {
  return (
    <div className='home'>

<Sidebar/>

<div className='home-container'>
    <Navbar/>

    <div className='Widgets'>

      <Widgets/>
    </div>
  </div>
    </div>
  )
}

export default Home