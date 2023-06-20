
import './App.css';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import Login from "../src/Adminlogin/Login"
import Dashboard from './Dashboard/Dashboard';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
