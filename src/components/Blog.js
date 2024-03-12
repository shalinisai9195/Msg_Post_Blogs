import React from 'react';
import {Card, Avatar, CardContent,CardHeader, CardMedia, Typography, Box, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
//import moment from 'moment';
import { BaseURL } from '../App';

function Blog({title,description,imageURL,userName,isUser,id}) {
  //et fName = userName.charAt(0);
  //console.log(title,isUser)
  let navigate = useNavigate();
  const handleEdit =(e)=>{
    
    navigate(`/myblogs/${id}`)
  }
  const sendDeleteReq = async()=>{
     const res = await axios.delete(`${BaseURL}/api/blog/delete/${id}`).catch((err) => console.log('error in del blog fe',err))

   const data = await res.data
   return data;

    } 

    const handleDelete = (e)=>{
      sendDeleteReq().then(()=> navigate('/')).then(()=> navigate('/blogs'))
    }


  return (
    <div>
      <Card sx={{ width: '40%',margin:'auto',mt:4, padding:2, boxShadow:"5px 5px 10px #ccc",
       ":hover":{
        boxShadow:"5px 5px 20px #ccc"
      }}}>
        {
          isUser && (
            <Box display='flex' >
                <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><EditIcon color='warning'/></IconButton>
                <IconButton onClick={handleDelete}><DeleteForeverIcon color='error'/></IconButton>
            </Box>
          )
        }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {userName.slice(0,1)}
          </Avatar>
        }
       
        title={title}
      // subheader={moment(createdOn).fromNow()}
      />

      <CardMedia
        component="img"
        height="300"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
        <hr/>
        <br/>
        <Typography variant="body2" color="text.primary">
           <b>{userName}</b> {':'} {description}
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}

export default Blog