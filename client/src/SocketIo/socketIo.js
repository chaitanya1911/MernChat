import io from 'socket.io-client';

const socket = io('http://localhost:3001/', { transports: ['websocket']})
if(socket){
console.log(`Connected to socket...`);


}
export default socket



// export const outputMessage=(message)=>{
//     const div=document.createElement('div');
//     div.classList.add('message');
//     div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
//     <p class="text">
//       ${message.text}
//     </p>`;
//     console.log(div)
// }

// export const initiateSocket = (id) => {
 

//   if (socket) {
//       socket.on('message',message=>{
//     console.log("#############");
//     console.log(message)
//     outputMessage(message)
    
//     console.log("#############");
//  });
//    return ()=>socket.close()
//   }
// }
// export const disconnectSocket = () => {
//   console.log('Disconnecting socket...');
//   if(socket) socket.disconnect();
// }
// export const enterConvo = (sessionId,myId) => {
//     console.log('Entering Convo...');
//     if(socket) {
//         console.log("In socket enterConvo")
//         socket.emit('joinroom',{sessionId,myId});
//     }
//   }
// export const sendMessage = (sessionId,myId,msg) => {
//   if (socket){
//   socket.emit('send-message', {sessionId,myId,msg});
// }
// }
