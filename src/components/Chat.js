import React, {useEffect, useState} from 'react'
import { Avatar, IconButton } from '@mui/material';
import './Chat.css';
import db from "../firebase"; 
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import firebase from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase/compat/app';
function Chat() {
    const location  = useLocation()
    const [input, setInput] = useState("");
    // const [seed, setSeed] = useState("");
    const roomId =location.pathname.split('/')[2]
    console.log("room id from useParams",roomId)
    const [roomName, setRoomName] = useState("");
    const [messages , setMessages] = useState([])
    const [{user}, dispatch] = useStateValue();
    const currentUtcTime = new Date();
    const currentIstTime = new Date(currentUtcTime.getTime() + (5.5 * 60 * 60 * 1000));
    useEffect(()=>{
      if(roomId){
        db.collection('room').doc(roomId).onSnapshot
        ((snapshot) =>
          setRoomName
          (snapshot.data().name));

        db.collection('room').doc(roomId).collection('messages')
        .onSnapshot(snapshot=>(
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))

      }
    },[roomId]);

    // useEffect(()=>{
    //     setSeed(Math.floor(Math.random()*5000));
    // },[]);

    const sendMessage = (e) =>{
      e.preventDefault();
      // console.log("I typed : ", input);

      db.collection('room').doc(roomId).collection("messages").add({
        message: input,
        name:user.displayName,
        timestamp:firebase.firestore.Timestamp.fromDate(currentIstTime),
       })
      
      setInput("");
    }
    
  return (
    <>
    <div className='chat'>
        <div className="chat_header">
            {/* <Avatar src= {`https://api.dicebear.com/6.x/adventurer/svg?seed= ${seed}`}/> */}
            <Avatar src={user?.photoURL}/>
            <div className='chat_headerInfo'>
              <h2>{roomName}</h2>
              <p>
                last seen{" "}
                {new Date(messages[messages.length-1]?.
              timestamp?.toDate()).toUTCString()}</p>
            </div>
            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined/>
              </IconButton>
              <IconButton>
                <AttachFile/>
              </IconButton>
              <IconButton>
                <MoreVert/>
              </IconButton>
            </div>
        </div>
        <div className='chat_body'>
          {messages.map((message)=>(
             <p className={`chat_message ${message.name===user.displayName && "chat_receiver"}`}>
             <span className='chat_name'>{message.name}</span>
             {message.message}
             <span className='chat_time'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
             </span>
          </p>
          ))}
           
        </div>
        <div className='chat_footer'>
        <InsertEmoticonIcon/>
          <form>
           
            <input value ={input} onChange={(e)=>{
              setInput(e.target.value)}} 
              type="text" placeholder='Type a message'/>
            <button type = "submit" onClick={sendMessage}> <SendIcon/> </button>
          </form> 
          <MicIcon/>
        </div> 
    </div>
    </>
  )
}

export default Chat;
