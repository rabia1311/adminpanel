const mongoose = require('mongoose');
const mongoURI='mongodb+srv://RabiaAdmin:adminpanel@cluster0.0gz38th.mongodb.net/';
const mongoDB=()=>{
    async () => {
        try {
          await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
          console.log('Connected to MongoDB');
      
        
      
        } catch (err) {
          console.log("---", err);
        }
      };
    }
      module.exports = mongoDB;


