const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://RabiaAdmin:adminpanel@cluster0.0gz38th.mongodb.net/your-database-name';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;



