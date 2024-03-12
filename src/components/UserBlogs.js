import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import { BaseURL } from '../App';

const UserBlogs = () => {
  const id = localStorage.getItem('userId');
  const[user,setUser] = useState();

  const sendRequest = async()=>{
     let res = await axios.get(`${BaseURL}/api/blog/user/${id}`).catch((err) => console.log('error get buer blog',err));

     let data = await res.data
      return data
   }

  useEffect(()=>{
    sendRequest()
    .then((data) => setUser(data.user))
  },[])
  //console.log(user)
  return (
    <div>
      {user && user.blogs &&
        user.blogs.map((blog,index) => {
          return(
            <div key={index}> 
              <Blog id={blog._id} isUser={true} title={blog.title} imageURL={blog.image} 
      description={blog.description} userName= {user.name} />
            
            </div>
          )
        })
      }
    </div>
  )
}

export default UserBlogs