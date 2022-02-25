const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name'],
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:[true,'Please Provide your email'],
        trim:true,
        unique:[true,'This Email is Already registerd && Please fill to an another Email '],
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },    
    Password:{
        type:String,
        required:[true,'Please provide a  password'],
        minlength:5,
        select:false
    },
    PasswordCofirm:{
        type:String,
        required:[true,'Please confirm your password'],
        minlength:5,
        validate:{
            validator:function(Cpassword){
                return Cpassword===this.Password
            },
            message:"Password are not the same "
        } 
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    PasswordChangedAt:{type:Date,select:false},
    active:{
        type:Boolean,
        default:true,
        select:false
    }

}) 


UserSchema.pre("save", async function(next){
    //Only run this function if the password was actually modified
    if(!this.isModified("Password"))return next()
   
    // hash the password with cost of 10
      this.Password  = await bcrypt.hash(this.Password,10)
   
      // Delete password  with PasswordCofirm filed  
      this.PasswordCofirm = undefined
    
    next()
})
 
UserSchema.pre("save", async function(next){
    if(!this.isModified("Password")||this.isNew)return next()
    this.PasswordChangedAt =Date.now()-1000
    next()
})


//Compare the Password
UserSchema.methods.correctPassword = async function(
    candidatePassword,userpassword
    ) 
    {
        console.log(candidatePassword,userpassword,"vikascsdgkbv")
    return await bcrypt.compare(candidatePassword,userpassword)
    }



const User =new mongoose.model('User',UserSchema)

module.exports =User