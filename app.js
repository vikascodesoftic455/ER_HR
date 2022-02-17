 require('dotenv').config()
 const functions = require("firebase-functions");
 const express =require('express')
 const path =require('path')
 const crors =require('cors')
 const dbconn =require('./db/db')
 const userRoutes =require('./router/Usersrouter/userRoutes')
 const chatRoutes =require('./router/chatRouter/chatRoutes')
 const messageRoutes =require('./router/messageRouter/messageRoutes')
 const adminRoutes= require('./router/AdminRoute/adminRouter')
 const adminDashBoardRoute =require('./router/AdminDashboardRouter/AdminRouter')
 const cookieParser = require('cookie-parser')
 const app =express()

 app.use(cookieParser())


 /// Server that can be start
const port  =8000


 // Body parser,rendering data body into req.body
app.use(express.urlencoded({extended:true,limit:'100kb'}))
app.use(express.json({limit:'100kb'}))


app.set('views','template')
app.set('view engine','ejs')


// Serving static files
app.use(express.static(path.join(__dirname, 'public')));




//Test middleware             
const logger =(req,res,next)=>{
    req.requestTime = new Date().toISOString()
    next()
}
app.use(logger)

app.use(crors({
    origin: 'http://localhost:3000',
    methods:'GET,POST,PUT,DELETE',
    credentials:true
}))

// //Routes
 app.use('/',userRoutes)
 app.use('/api/chat',chatRoutes)
 app.use("/api/message", messageRoutes)
 app.use('/api/data/admin',adminRoutes)
 app.use('/api/adminDashboard/',adminDashBoardRoute)




 const environment = process.env.NODE_ENV;


 app.listen(port,()=>{
     console.log(`Server is running `+port)
     if (
        environment !== "production" &&
        environment !== "development" &&
        environment !== "testing"
      ) {
        console.error(
          `NODE_ENV is set to ${environment}, but only production and development are valid.`
        );
        process.exit(1);
      }
 })




exports.app = functions.https.onRequest(app);




