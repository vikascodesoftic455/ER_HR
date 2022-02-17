const jwt = require('jsonwebtoken')
const SecretKey ="vhdscsjfcsufjscvsvcsakvcMcvgwgad"





const isAuthentication =(req,res,next)=>{
    try{
       const token =req.cookies.jwt
        if(!token){
          return("User Is Not Autharized")
        }
        const data =  jwt.verify(token,SecretKey);
        if (!data) return res.status(401).json({ error: "Invalid token" });
        req.data = data;
          next()
    }catch(err){
      return("User Is Not Autharized")
    }
}

module.exports =isAuthentication