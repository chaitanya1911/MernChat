import React ,{useEffect,useState} from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Contacts({obj}) {
   


    return (
       <ListGroup variant="flush">
           {obj.contacts.map(contact=>(
               <ListGroup.Item   key={contact.id}>
                {contact.username}
                
               </ListGroup.Item>
           ))}
       </ListGroup>
    
    )
}