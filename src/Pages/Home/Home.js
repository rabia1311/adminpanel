import React from 'react'
import "../Home/home.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
const Home = () => {
  return (
    <div className='home'>

<Sidebar/>

<div className='home-container'>
    <Navbar/>
    container</div>
    </div>
  )
}

export default Home