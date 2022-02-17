const jwt = require('jsonwebtoken')
const adminSecretKey ="ro8BS6Hiivgzy8Xuu09JDjlNLnSLldY5"



const isAdmin =(req,res,next)=>{
    try{
       const token =req.cookies.jwt
        if(!token){
          return("Admin Is Not Autharized")
        }
        const data =  jwt.verify(token,adminSecretKey);
        if (!data) return res.status(401).json({ error: "Invalid token" });
        req.data = data;
          next()
    }catch(err){
      return("admin Is Not Autharized")
    }
}

module.exports =isAdmin