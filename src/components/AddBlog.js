import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../App';

const AddBlog = () => {
  const navigate = useNavigate();
  const[inputs,setInput] = useState({
    title:"",
    description:"",
    image:""
  });
  const handleChange = (e)=>{
      let name = e.target.name
      let value = e.target.value
      setInput({...inputs,[name]:value})
  }

  const SendRequest = async()=>{
     let res = await axios.post(`${BaseURL}/api/blog/add`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:localStorage.getItem("userId")
     }).catch(err => console.log('error in add blog',err))

     let data = await res.data
     return data
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
   // console.log(inputs)
    SendRequest().then((data) => console.log(data)).then(()=> navigate('/blogs'))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display='flex' flexDirection='column'  width='80%' border={3}
         borderColor='linear-gradient(90deg, rgba(0,5,36,1) 0%, rgba(74,9,121,1) 35%, rgba(0,226,255,1) 100%)' borderRadius={10} boxShadow='10px 10px 20px #ccc' 
         padding={3} margin={'auto'}  marginTop={4}>
          <Typography fontWeight={'blod'} padding={3} color='grey' variant='h3' textAlign='center'>Post Your Blog</Typography>
          <InputLabel sx={{mb:1,mt:2,fonrSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
          <TextField name='title' value={inputs.title} onChange={handleChange}  margin='normal' variant='outlined'/>
          <InputLabel sx={{mb:1,mt:2,fonrSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
          <TextField name='description' value={inputs.description} onChange={handleChange}  margin='normal' variant='outlined'/>
          <InputLabel sx={{mb:1,mt:2,fonrSize:'24px', fontWeight:'bold'}}>ImageURL</InputLabel>
          <TextField name='image' value={inputs.image} onChange={handleChange}  margin='normal' variant='outlined'/>
          <Button sx={{mt:4, borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog