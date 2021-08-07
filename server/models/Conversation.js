const moongoose=require("mongoose");

const ConversationSchema=new moongoose.Schema({
    convoBwtn:{
    type:Array,
    required:true
   },
sessionId:{
    type:String,
    required:true,
},
});

const Conversation=moongoose.model("Conversations",ConversationSchema)
module.exports=Conversation
