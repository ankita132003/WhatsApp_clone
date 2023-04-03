import React, {useState} from "react";
import './App.css';
import Sidebar from './Sidebar';
import Chat from './components/Chat';
import Login from "./Login";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  
  const [{user}, dispatch] =useStateValue();
  return (
    
    <div className="App">
      {!user ? (
         <Login/>
      ) : (
        <div className="app_body">
        <Router>
        <Sidebar/>
        <Routes>
        <Route path="/room/:roomId" element={<Chat/>}/>
        <Route path="/" element={ <Chat/>}/>
        {/* this is shivam singh */}
       
        </Routes>
        </Router>
      </div>
       )}
      
    </div>
  
  );
}

export default App;
