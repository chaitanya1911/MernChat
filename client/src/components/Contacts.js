import React ,{useEffect,useState} from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Contacts({obj}) {
   


    return (
       <ListGroup variant="flush">
           {obj.contacts.map((contact,index)=>(
               <ListGroup.Item   key={index}>
                {contact.username}
                
               </ListGroup.Item>
           ))}
       </ListGroup>
    
    )
}