const express = require('express');
const MongoDB = require("../server/mongo");
const app  = express();
const cors = require('cors');

 MongoDB();

app.use(cors());
app.use(express.json());
app.use('/api',require("./routes/CreateNewUser"));
app.use('/api',require("./routes/LoginUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"))
app.get('/',(req,res)=>{
    res.send("hello world");
})



app.listen(3001,()=>{
    console.log("server running");
})