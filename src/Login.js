import React from 'react'
import { Button } from '@mui/material'
import "./Login.css";
import {auth, provider} from "./firebase";
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{}, dispatch] =useStateValue();

    const signIn =()=>{
        auth.signInWithPopup(provider)
        .then((result) =>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error)=>alert(error.message));
    };
  return (

    <div className='login'>
    <div className='login_container'>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjv8dwCg0rOXVGMThMlM0yJfkxdI0wUi_Z21QqzhyGHw&usqp=CAU&ec=48665698" alt=''/>
     <div className='login_text'>
         <h1>Sign in to ourChats</h1>
     </div>
     <Button type="submit" onClick={signIn}>
         Sign in with Google
     </Button>
   </div>
 </div>

  )
}

export default Login
