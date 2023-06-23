const express = require('express');
const cors = require('cors');
const multer= require('multer');
const app = express();
const port = 3001;







const mongoDB = require("./db");
mongoDB();

app.use(cors());

app.use(express.json());
app.use('/admin', require("./Routes/Createuser"));
app.use('/admin', require("./Routes/Addrestuarant"));
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});