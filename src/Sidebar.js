import React, {useState, useEffect} from "react";
import db from "./firebase";
import {Avatar} from '@mui/material'; 
import IconButton from "@mui/material/IconButton";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from './SidebarChat';
import { useStateValue } from "./StateProvider";
import './Sidebar.css';


function Sidebar(){
    const [room, setRoom] = useState([]);
    const [{user}, dispatch] =useStateValue(); 
    useEffect(()=>{
        const unsubscribe = db.collection('room').onSnapshot((snapshot) =>
            setRoom(snapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        console.log(room)
        return () =>{
            unsubscribe();
        }
    }, [])
    return(
        <>
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                <SearchOutlined/>
                <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {room.map(room =>(
                    <SidebarChat key = {room.id} id={room.id} name={room.data.name} />
                ))}
                
            </div>
        </div>
        </>
    )
}
export default Sidebar;