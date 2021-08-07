import React,{useEffect,useState} from 'react'
import Sidebar from './Sidebar'
import Mainbar from './Mainbar';
import axios from 'axios'
import io from 'socket.io-client'
import socket from '../SocketIo/socketIo';


export default function Dashboard({props}) {
    
const [toUsername,setToUsername]=useState();
const [toId,setToId]=useState();
const [contacts, setContacts] = useState([]);
const [sessionId, setSessionId] = useState();
const [activeConvo, setActiveConvo] = useState('');
const [allConvo, setAllConvo] = useState([]);
const [allChats,setAllChats]=useState([]);
const [currentMsg, setCurrentMsg] = useState('');
const [currentMsgs, setCurrentMsgs] = useState([]);
const [newContact, setNewContact] = useState([]);




useEffect(() => {
    
    axios.get(`http://localhost:3001/getContacts/${props.match.params.id}`).then((res) => {
    
     setContacts(res.data);
 });
 axios.get(`http://localhost:3001/getConversations/${props.match.params.id}`).then((res) => {
    
    setAllConvo(res.data)
});
 axios.get(`http://localhost:3001/getAllChats/${props.match.params.id}`).then((res) => {
    
    setAllChats(res.data)
});


if (socket) {
    socket.on('message',message=>{
  console.log("#############");
  console.log(message)
  setCurrentMsgs(prevmsg=>[...prevmsg,message])

 // outputMessage(message)
  
  console.log("#############");
});
 return ()=>socket.close()
}


},[props.match.params.id]);
    return (
        <>
     <div className ="d-flex" style={{height:'100vh'}}>
           
           
                <Sidebar obj={{id:props.match.params.id,setToUsername:setToUsername,setToId:setToId,contacts:contacts,allConvo:allConvo,setAllConvo:setAllConvo,setActiveConvo:setActiveConvo,newContact:newContact,setNewContact:setNewContact}} />
               
                {activeConvo && <Mainbar obj={{toUsername:toUsername,myId:props.match.params.id,toId:toId,contacts:contacts,allConvo:allConvo,activeConvo:activeConvo,sessionId:sessionId,allChats:allChats,currentMsgs:currentMsgs,setCurrentMsg:setCurrentMsg}}  />}
             
     </div>
     
     </>
    );
}
