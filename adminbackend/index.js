const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const UserRouter = require("./Routes/Createuser");
const RestaurantRouter = require("./Routes/Addrestuarant");

const app = express();
const port = 3001;

const mongoDB = require("./db");
mongoDB();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 50000,
  })
);
app.use("/admin", UserRouter);
app.use("/admin", RestaurantRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
