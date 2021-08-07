import React ,{useEffect,useState} from 'react'
import { ListGroup } from 'react-bootstrap'
import socket from '../SocketIo/socketIo'


export default function Conversations({obj}) {
  const [newContactt,setNewContact]=useState([])
  function handleClick(contact){
   socket.emit('joinroom',{sessionId:contact.sessionId,myId:obj.id});
    obj.setActiveConvo(contact)
}

useEffect(()=>{
  socket.on('newContact',message=>{
    console.log(message)

   setNewContact(prev=>{
     console.log(prev)

   if(prev.sessionId===message.sessionId){
     console.log("in if")
    return prev.filter(prevId=>{
        return message!== prevId
    })
}else{
  console.log("in else")
        return [...prev,message]
        
}
   });

   console.log(obj.newContact)
   return ()=>socket.close()
  })
},[obj.newContact])
    return (
        <div>
          <ListGroup variant="flush">
           {obj.allConvo.map((contact,index)=>(
             <div  key={index}>
               <ListGroup.Item  
               action 
               onClick={()=>handleClick(contact)}
               eventKey={index}
               >
                 
                 {contact.convoBwtn}
                
               </ListGroup.Item>
               </div>
           ))}
           {newContactt.map((contact,ind)=>(
             <div key={ind}>
               <ListGroup.Item 
               action 
               onClick={()=>handleClick(contact)}
               eventKey={ind}
               >
                 
                 {contact.convoBtwn}
                
               </ListGroup.Item>
               </div>))}
       </ListGroup>
         
        </div>
    )
}
