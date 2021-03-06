import React ,{useState} from 'react'
import {Modal, Form,Button,InputGroup} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import Axios from 'axios';
import socket from '../SocketIo/socketIo';

export default function NewConversationModal({obj}) {
    const [selectedContactIds,setSelectedContactIds]=useState([])
    const sessionId=uuidv4()

    function handleSubmit(e){
       e.preventDefault();
       console.log(selectedContactIds)
       socket.emit('addContacts',{sessionId:sessionId,myId:obj.info.id,convoBtwn:selectedContactIds})
       //**  this is to post data to db if he had contacted **//
            Axios.post('http://localhost:3001/dashboard/obj.info.id',{
                sessionId:sessionId,               //sessionId is string
                convoBwtn:selectedContactIds     //convoBwtn is object
            }).then(res => {
                console.log(res.data)
                
        });
        obj.closeModal()
    }

    function handleCheckboxChange(contactId){
        setSelectedContactIds(prevSelectedContactIds=>{
            if(prevSelectedContactIds.includes(contactId)){
            return prevSelectedContactIds.filter(prevId=>{
                return contactId!== prevId
            })
        }else{
               
                if(prevSelectedContactIds.includes(obj.info.id)){
                     prevSelectedContactIds.filter(prevId=>{
                        return obj.info.id!== prevId
                    });
                    return [...prevSelectedContactIds,contactId]
                }else{
                    return [...prevSelectedContactIds,contactId,obj.info.id]
                }
        }
        })
     }
    return (
        <>
        <Modal.Header closeButton>Create Conversations</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            {obj.info.contacts.map((contact,index)=>(
               <Form.Group   key={index}>
                   <Form.Check
                   type="checkbox"
                   value={selectedContactIds.includes(contact.id)}
                   label={contact.username}
                   onChange={()=>handleCheckboxChange(contact.id)}
                   >

                   </Form.Check>
                
               </Form.Group>
           ))}
           <Button type="submit">Create</Button>
            </Form>
        </Modal.Body>
        </>
    )
}
