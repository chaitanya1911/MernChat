const moongoose=require("mongoose");

const ChatSchema=new moongoose.Schema(
    {
    sessionId:{
    type:String,
    required:true
   },
message:{
    type:String,
    required:true,
},
toUserId:{
    type:Array,
    required:true,
},
fromUserId:{
    type:String,
    required:true,
},
time : { type : Date, default: Date.now }
});

const Chat=moongoose.model("Chats",ChatSchema)
module.exports=Chat
