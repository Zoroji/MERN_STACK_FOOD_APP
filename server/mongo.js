const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL;

let isConnected = false;
const MongoDB = async () => {
    try {
        if(!isConnected){ 
            await mongoose.connect(mongoURL, { useNewUrlParser: true });
        console.log("Connected to MongoDB!");
        isConnected = true;
        mongoose.connection.once('open',async()=>{
             const foodItemsCollection =  mongoose.connection.db.collection("foodItems");
        const foodItemsData = await foodItemsCollection.find({}).toArray();

        const foodCategoryCollection =  mongoose.connection.db.collection("foodCategory"); 
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();
        
        global.foodCategory = foodCategoryData;
        global.foodItems = foodItemsData;
        })
       
      
        }
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = MongoDB;
