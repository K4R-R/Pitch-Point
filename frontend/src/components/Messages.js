import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import '../styles/Messages.css';
import io from 'socket.io-client';

const Messages = () => {

   const {user} = useAuthContext();
   const [connections,setConnections] = useState([]);
   const [loading,setLoading] = useState([]);
   const [receiver, setReceiver] = useState('');
   const [socket,setSocket] = useState(null);
   const [message, setMessage] = useState('');
   const [chats, setChats] = useState(null);

   useEffect( ()=> {
      const newSocket = io('http://localhost:4000/');
      setSocket(newSocket);

      newSocket.on('connect', () => {
         console.log('Connected to the server');
      });

      const fetchConnections = async() => {
         const res = await fetch('http://localhost:4000/api/connections',{
               headers: {
                  'Authorization':`Bearer ${user.token}`
               }
         });
         const connections = await res.json();
   
         if(connections) setConnections(connections);
         setLoading(false);
      }

      const fetchChats = async () => {
         const res = await fetch(`http://localhost:4000/api/chat/${user.email}`,{
            headers: {
               'Authorization':`Bearer ${user.token}`
            }
      });
      const chats = await res.json();

      if(chats) setChats(chats);
      }

      fetchConnections();
      fetchChats();

      return () => {
         newSocket.disconnect();
         console.log('Disconnected from the server');
      };
   },[user]);

   if(chats) {
      socket.on('messageReceived', (message) => {
         // console.log('New message received:', message);
         setChats([...chats,message]);
      });
   }

   const sendMessage = async (e) => {
      e.preventDefault();

      if(receiver==='') return alert('Select a user before sending a message');
      if(message==='') return alert('Type a message before sending');

      // console.log(message);   

      const res = await fetch('http://localhost:4000/api/chat/add',{
         method:'POST',
         body: JSON.stringify({senderEmail:user.email,receiverEmail:receiver,message}),
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${user.token}`
         }
      });

      const newChat = await res.json();

      if(newChat) {
         setChats([...chats,newChat]);
         socket.emit('newMessage', newChat);
         setMessage('');
      }
   };

   if(loading) {
      return( <div className="loading"><h1>Loading...</h1></div> )
   }

   const filteredConnect = (connections || [])
   .filter(connect => connect.founderEmail === user.email || connect.investorEmail === user.email)
   .filter(connect => connect.status==='Accepted');

   const filteredChats = (chats ||[]).filter(chat => chat.senderEmail === receiver || chat.receiverEmail === receiver);

   // console.log('filter:',filteredConnect);
   // console.log(filteredChats);

   if(filteredConnect.length===0) {
      return( <div className="loading"><h1>You have no connections available for chat.</h1></div> )
   }

   return (
      <div className="message-window">
         <div>
            <div className="user-container">
               {filteredConnect.map(connects => {
                  const connectsEmail = user.role==='Founder' ? connects.investorEmail:connects.founderEmail;
               return (
                  <div 
                  key={connectsEmail}
                  className={`connects ${connectsEmail===receiver ? 'receiver':''}`}
                  onClick={()=>setReceiver(connectsEmail)}
                  >
                  {user.role==='Founder' ? connects.investorName.toUpperCase():connects.founderName}
                  </div>
               )
               })}
            </div>
   
            <div className="chat-container">
            {receiver === '' ? (<p className='no-receiver'>SELECT A USER TO START MESSAGING</p>) : (
               <div className='chats'>
                  {filteredChats.map(chat => (
                     <div key={chat._id} className={user.email===chat.senderEmail ? 'send-message':'received-message'}>
                        <p>{chat.message}</p>
                     </div>
                  ))}
               </div>
               )}
            </div>
         </div>

         <div className="input-area">
            <form onSubmit={sendMessage} >
               <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter Message'/>
               <button onClick={sendMessage}><i className="fa-solid fa-paper-plane"></i> &nbsp;SEND</button>
            </form>
         </div>
      </div>
   )
}

export default Messages