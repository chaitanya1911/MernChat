import React,{useState,useRef,useEffect} from 'react'
import {Tab, Nav,Button,Modal,Form,Row,Col,InputGroup} from 'react-bootstrap'
import '../css/message.css'
import MessageContainer from './MessageContainer'
import Axios from 'axios';
import socket from '../SocketIo/socketIo';


export default function Mainbar({obj}) {
    const [text, setText] = useState();
    const lastMessageRef = useRef()

    useEffect(()=>{
        if(lastMessageRef.current){
            lastMessageRef.current.scrollIntoView({smooth:true})
        }
    },[obj.currentMsgs])
    
   function handleSubmit(e){
        e.preventDefault();
         let arr=obj.activeConvo.convoBwtn
          arr = arr.filter(function(item) {
            return item !== obj.myId
         })
         obj.setCurrentMsg(text)
         console.log(obj.currentMsgs)
         
          socket.emit('send-message',{sessionId:obj.activeConvo.sessionId,id:obj.myId,msg:text});

           //**  this is to post data to db if he had contacted **//
           Axios.post('http://localhost:3001/chats/obj.info.id',{
            sessionId:obj.activeConvo.sessionId,    //sessionId is string
            fromUserId:obj.myId,           
            toUserId:arr ,  //convoBwtn is object
            message:text    //recent text
        }).then(res => {
                
    });
     
        setText('')
        

    e.target.elements.msg.focus();
    

    }
    return (
        <div style={{backgroundColor:'', width:'69%' }} className="d-flex flex-column ">
        <div className="flex-grow-1 overflow-auto">

        <Tab.Container style={{width:'100vh'}}>
                <Nav variant="tabs" className="justify-content" >
                    <Nav.Item >
                        <Nav.Link>
                            {obj.activeConvo.convoBwtn}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item >
                        <Nav.Link>
                           Sessionid: {obj.activeConvo.sessionId}</Nav.Link>
                    </Nav.Item>

                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1" style={{paddingLeft:'5px'}}>   
                    <div class="chat-messages" >
            
                    <MessageContainer obj={{allChats:obj.allChats,sessionId:obj.activeConvo.sessionId,myId:obj.myId}}/>
                    {obj.currentMsgs.map((chat,index)=>{
                       if(chat.sessionId===obj.activeConvo.sessionId)
                        {
                            return (
                         
                        <div key={index} ref={lastMessageRef} >

                        <div className='message' style={chat.username===obj.myId ?{marginLeft:'auto',textAlign:'center',backgroundColor:'#e0f1ff'}:{marginRight:'auto',textAlign:'center',backgroundColor:'#f0f0f0'}} >
                        <div style={chat.username===obj.myId ?{paddingLeft:'auto',textAlign:'left'}:{marginRight:'auto',textAlign:'left'}} >{chat.username===obj.myId ? 'You':chat.username} </div>
                       
                            <div className="text">{chat.text}</div>
                            <div className="text-muted small"style={{textAlign:'right',minWidth:'20px',whiteSpace: 'nowrap'}}>{chat.time}</div>
                           
                        </div>
                        
                        </div>
                      
                        )
                    }
                            
                    }  
            )}
                    
                    </div>
                </Tab.Content>
                </Tab.Container>
       
        </div>
             
       
             
                <Form  onSubmit={handleSubmit} id="chat-form" style={{paddingLeft:'5px'}}>
                <Form.Group>
            <Row className="g-2"  >
                <Col xs={11} >
                        <Form.Control as="textarea" id="msg" placeholder='Enter YOur Message' value={text} onChange={e=>setText(e.target.value)} required>
                        </Form.Control>
                </Col>
                <Col md>
                    <Button type="submit">Send</Button>
                </Col>
            </Row>
  </Form.Group>
               
                
               </Form>
              
        </div>
    )
}
