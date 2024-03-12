import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { loginActions } from '../store';
import {useNavigate} from 'react-router-dom'
import { BaseURL } from '../App';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[inputs,setInput] = useState({
    name:"",
    email:"",
    password:""
  })
 
  const handleChange = (e)=>{
    //1way
    // let name = e.target.name
    // let value = e.target.value
    // setInput({...inputs,[name]:value})
    //2way
    setInput((prevVal) => ({
      ...prevVal,
      [e.target.name]:e.target.value
    }))
  } 
  const SendRequest = async(type='login')=>{

    let res =  await axios.post(`${BaseURL}/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    }).catch((err) => console.log('error login FE',err))

    let data = await res.data
   // console.log(data)
    return data
  }
  const handleSubmit = (e)=>{
      e.preventDefault();
    //  console.log(inputs); 
    if(isSignIn){
      SendRequest('signup')
      .then((data)=> localStorage.setItem('userId',data.user._id))
      .then(()=> dispatch(loginActions.login()))
      .then(()=> navigate('/blogs'))
      .then(data => console.log(data))
    }else{
      SendRequest()
      .then((data)=> localStorage.setItem('userId',data.user._id))
      .then(()=> dispatch(loginActions.login()))
      .then(()=> navigate('/blogs'))
      .then(data => console.log(data))
    }
      
  }
  const[isSignIn,setSignIn] = useState(false);
  return (
    <div>
      <form>
        <Box display='flex' maxWidth={400} flexDirection='column' alignItems='center' justifyContent='center'
         boxShadow='10px 10px 20px #ccc' padding={3} margin='auto' marginTop={5} borderRadius={5}>
          <Typography variant='h4' padding={3}>{isSignIn ? "Signup":'Login'}</Typography>
             {
              isSignIn && <TextField margin='normal' onChange={handleChange} name='name' value={inputs.name} placeholder='Name'/>
             }
               <TextField margin='normal' onChange={handleChange} name='email' value={inputs.email} placeholder='email' type='email'/>
               <TextField margin='normal' onChange={handleChange} name='password' value={inputs.password} placeholder='password' type='password'/>
              
          
          <Button variant='contained' sx={{borderRadius:5,marginTop:3}} onClick={handleSubmit}  color='warning'> Submit </Button>
          <Button sx={{marginTop:3}} onClick={()=> setSignIn(!isSignIn)}>
            Change to {isSignIn ? "login" : "signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Login