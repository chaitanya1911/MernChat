const moongoose=require("mongoose");

const UserSchema=new moongoose.Schema({
    username:{
    type:String,
    required:true
   },
id:{
    type:String,
    required:true,
},
});

const User=moongoose.model("User",UserSchema)
module.exports=User
