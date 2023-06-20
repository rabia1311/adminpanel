const mongoose = require('mongoose');
const mongoURI='mongodb+srv://RabiaAdmin:adminpanel@cluster0.0gz38th.mongodb.net/';
const mongoDB=()=>{
    mongoose.connect(mongoURI);}

module.exports=mongoDB;

