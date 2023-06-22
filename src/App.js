
import './App.css';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import Login from "../src/Adminlogin/Login"
import Home from "./Pages/Home/Home";
import Profile from './Pages/Profile/Profile';
import Restuarants from './Pages/Restuarants/Restuarants';
import Order from './Pages/Orders/Order';
import Category from "../src/Pages/Category/Category"
import Item from './Pages/Item/Item';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/restuarants' element={<Restuarants/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/cat' element={<Category/>}/>
          <Route path='/item' element={<Item/>}/>
          
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
