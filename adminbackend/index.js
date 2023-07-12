const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const UserRouter = require("./Routes/Createuser");
const RestaurantRouter = require("./Routes/Addrestuarant");
const CategoryRouter = require("./Routes/AddCategory");
const SubcategoryRouter = require("./Routes/AddSubcategory");
const CustomerRouter = require("./Routes/Addcustomer");
const BrandRouter = require("./Routes/AddBrand");
const app = express();
const port = 3001;

const path = require("path");
app.use("/uploads", express.static("uploads"));
app.use("/category", express.static("category"));
app.use("/subcategoryimg", express.static("subcategoryimg"));
app.use("/customerImg", express.static("customerImg"));
app.use("/brandimg", express.static("brandimg"));

const mongoDB = require("./db");
const { collection } = require("./Models/User");
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
app.use("/admin", CategoryRouter);
app.use("/admin", SubcategoryRouter);
app.use("/admin", CustomerRouter);
app.use("/admin", BrandRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
