import React ,{useEffect,useState} from 'react'
import { ListGroup } from 'react-bootstrap'
import socket from '../SocketIo/socketIo'


export default function Conversations({obj}) {
  function handleClick(contact){
   socket.emit('joinroom',{sessionId:contact.sessionId,myId:obj.id});
    obj.setActiveConvo(contact)
}
    return (
        <div>
          <ListGroup variant="flush">
           {obj.allConvo.map((contact,index)=>(
               <ListGroup.Item   key={index}
               action 
               onClick={()=>handleClick(contact)}
               eventKey={index}
               >
                 
                 {contact.convoBwtn}
                
               </ListGroup.Item>
           ))}
       </ListGroup>
    
        </div>
    )
}
