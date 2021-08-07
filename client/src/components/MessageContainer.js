import React,{useEffect} from 'react'
import { initiateSocket } from '../SocketIo/socketIo';
let result;

export default function MessageContainer({obj}) {
    useEffect(()=>{
    },[obj.sessionId])
    return (
        
        
      <>
      
          {obj.allChats.map((chat,index)=>{
             if(chat.sessionId===obj.sessionId)
           return (   
            <div className='message' style={chat.fromUserId===obj.myId ?{marginLeft:'auto',textAlign:'center',backgroundColor:'#e0f1ff'}:{marginRight:'auto',textAlign:'center',backgroundColor:'#f0f0f0'}} >
            <div style={chat.fromUserId===obj.myId ?{paddingLeft:'auto',textAlign:'left'}:{marginRight:'auto',textAlign:'left'}} >{chat.fromUserId===obj.myId ? 'You':chat.fromUserId} </div>
           
                <div className="text">{chat.message}</div>
                <div className="text-muted small"style={{textAlign:'right',minWidth:'20px',whiteSpace: 'nowrap'}}>{chat.time}</div>
               
            </div>
                )


               
          }  
           )
           
           }
         

          
        </>
        
    )

}
