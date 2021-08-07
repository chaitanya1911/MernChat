const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const http = require('http')
const socketio = require('socket.io')

const app=express();
const server = http.createServer(app);
const io = socketio(server);

const UserModel=require('./models/User')
const ConversationModel=require('./models/Conversation')
const ChatModel=require('./models/Chat')

app.use(express.json());
app.use(cors());

mongoose.connect(
    'mongodb+srv://admin1:Admin12345@cluster0.vt9st.mongodb.net/ChatApp?retryWrites=true&w=majority',
    {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    }
).then((onfullfiled,un)=>{
 console.log("Connected to mongoose") 
});


//Run when client connects
io.on('connection', socket => {

    //Welcome the user
    socket.emit('message', formatMessage(botName,'Welcome to chatCord!'));

    //Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has join the chat'));

    socket.on('disconnect', () => {
        io.emit('message',  formatMessage(botName,'A user has left the chat'));
    });
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage(msg.username,msg.msg));
    });

});

app.post('/',async (req,res)=>{
    const id=req.body.id;
    const username=req.body.username;
 const user=new UserModel({
    id:id,username:username
 });
 try {
     await user.save();
     res.send("Inserted data");
 } catch (err) {
     console.log(err);
 }
});

app.get('/dashboard/:id',function(req,res){
    console.log("hello")
    res.send("Done")
});
app.post('/dashboard/:id',async (req,res)=>{
    console.log("hee")
    const sessionId=req.body.sessionId;
    const convoBwtn=req.body.convoBwtn;
 const convo=new ConversationModel({
    sessionId:sessionId,convoBwtn:convoBwtn
 });
 try {
     await convo.save();
     res.send("Inserted data");
 } catch (err) {
     console.log(err);
 }
});
app.get('/getContacts/:id',async function(req,res){
   
    const contacts=await UserModel.find( { "id": { $ne: req.params.id } } );
    res.json(contacts)
})
app.get('/getConversations/:id',async function(req,res){
   
const contacts=await ConversationModel.find( { "convoBwtn": { $regex: `${req.params.id}` } } );
  
    res.json(contacts)
})

app.get('/getAllChats/:id',async function(req,res){

    // ConversationModel.aggregate([
    //     {
    //       $lookup:
    //         {
    //           from: "ChatModel",
    //           localField: "sessionId",
    //           foreignField: "sessionId",
    //           as: "messageHistory"
    //         }
    //    }
    //  ])
     const chat=await ChatModel.find(
        { $or:[ {"toUserId": { $regex : `${req.params.id}` }}, {'fromUserId':`${req.params.id}`} ]}
  
    );
    console.log("chats")
    console.log(chat)
    res.json(chat)
    });


    app.post('/chats/:id',async (req,res)=>{
     const chat=new ChatModel(
              req.body
     );
     try {
         await chat.save();
         res.send("Inserted data");
     } catch (err) {
         console.log(err);
     }
    });


   



server.listen(3001,()=>{
    console.log("server running on port 3001...");
});