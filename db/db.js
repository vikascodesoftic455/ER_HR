const mongoose = require('mongoose');
const dotenv = require('dotenv')


const db = process.env.DATABASE
mongoose
    .connect(db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useUnifiedTopology:false
           
        }
     )
  .then(()=> console.log('Database Connection Sucessfully...'))
  .catch((err)=>console.log('DataBase is Not connected'))  
module.exports =mongoose  



