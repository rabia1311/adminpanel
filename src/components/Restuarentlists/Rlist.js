import React from 'react'
import "../Table/table.scss"
import "../Restuarentlists/rlist.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const Rlist = () => {

const rows=[
    {
        id: 1,
        restaurant_name: "Haldirams",
        category: "Veg",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Haldiram%27s_Logo_SVG.svg",
        address: "123 Main St",
        delivery_time: "30 minutes",
      },
      {
        id: 2,
        restaurant_name: "Arsalan",
        category: "Nonveg",
        logo: "https://content3.jdmagicbox.com/comp/kolkata/z5/033pxx33.xx33.130731222426.b3z5/catalogue/arsalan-restaurant-and-caterer-shyambazar-kolkata-north-indian-restaurants-t6kx53at5z.jpg",
        address: "456 Elm St",
        delivery_time: "45 minutes",
      },
      
    ];
   
    
    
    
    
    
    


    return (
        <div className="container">
        <TableContainer className="tableContainer" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <h1 className="heading"> List of Restuarants</h1>
              <TableRow>
                <TableCell> ID</TableCell>
                <TableCell align="right" className="name">Restuarant Name</TableCell>
                <TableCell align="right"className="name">Category</TableCell>
                <TableCell align="right"className="name">Logo</TableCell>
                <TableCell align="right"className="name">Address</TableCell>
                <TableCell align="right"className="name">Delivery time</TableCell>
               
                <TableCell align="right"className="name">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className={row.status === 'approved' ? 'approved' : 'pending'}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.restaurant_name}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">
                    <img src={row.logo} alt="pic" style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.delivery_time}</TableCell>
                 
                 
                  <TableCell align="right">
                    <button>Edit</button>
                    <button>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      )
    }

export default Rlist