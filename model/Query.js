const mongoose =require('mongoose')



const QuerySchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    Create:{
        type:String
    },
    ReView:{
        type:String
    },
    Payroll:{
        type:String
    },
    End_of_Service:{
        type:String
    },
    Policy_and_Procedure:{
        type:String
    },
    Talent_Acquisition:{
        type:String
    },
    Training_and_Coaching:{
      type:String
    },
    avatar:[String],
})

const Query =mongoose.model('Query',QuerySchema)

module.exports=Query