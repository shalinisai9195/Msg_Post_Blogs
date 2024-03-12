import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Blog from './Blog';
import { BaseURL } from '../App';


const Blogs = () => {
 
const[blogs,setBlogs] = useState([]);
const sendRequest = async()=>{

  let res = await axios.get(`${BaseURL}/api/blog`).catch((err)=> console.log('error in all blogs',err))
 let data = await res.data

   return data;
}

  useEffect(()=>{
    sendRequest().then((data)=> setBlogs(data.blogs))
  },[])
  //console.log(blogs)
  return (
    <div >
      {
        blogs && blogs.map((blog,index) => {
          return(
            <div key={index}> 
              <Blog 
              id={blog._id}
              isUser={localStorage.getItem('userId') === blog.user._id} title={blog.title} imageURL={blog.image} 
      description={blog.description} userName={blog.user.name}/>
            
            </div>
          )
        })
      }
       
      </div>
  )
}

export default Blogs