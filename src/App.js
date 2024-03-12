import Header from "./components/Header";
import{Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { loginActions } from "./store";

export const BaseURL = 'https://msg-blog-post-bend.onrender.com' 
//'http://localhost:5000'



function App() {
  const dispatch = useDispatch();

  const isLogIn = useSelector((state)=> state.isLoggedIn)
  console.log(isLogIn)

  useEffect(()=>{
    if(localStorage.getItem('userId')){
      dispatch(loginActions.login())
    }
  },[dispatch])
  return <>
  <header>
  <Header/>
  </header>
  <main>
    
    <Routes>
     
      { !isLogIn ?
      <Route path="/login" element={<Login/>}/>
      : <>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog/add" element={<AddBlog/>}/>
      <Route path="/myblogs" element={<UserBlogs/>}/>
      <Route path="/myblogs/:id" element={<BlogDetail/>}/>
      </> 
    }
    </Routes>
    
  </main>
  
  </> 
    
}

export default App;
