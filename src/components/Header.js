import React, { useState } from 'react';
import {AppBar, Box, Button, Typography, Toolbar, Tabs, Tab} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { loginActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const [value,setValue] = useState();
  
 const isLogged = useSelector((state) => state.isLoggedIn);
 // console.log(isLogged)
  return (
    <AppBar position='sticky' sx={{background:"linear-gradient(90deg, rgba(0,5,36,1) 0%, rgba(74,9,121,1) 35%, rgba(0,226,255,1) 100%);"}}>
        <Toolbar>
          <Typography variant='h4'>BlogsApp</Typography>
          {
             isLogged &&  <Box display="flex" marginLeft='auto' marginRight='auto'>
               <Tabs textColor='inherit' value={value} onChange={(e,val)=> setValue(val)}>
                 <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                 <Tab LinkComponent={Link} to="/myblogs" label="My Blogs"/>
                 <Tab LinkComponent={Link} to="/blog/add" label="Add Blog"/>
               </Tabs>
           </Box>
          }
          
          <Box display="flex" marginLeft="auto">
               {
                !isLogged && <>
                   <Button LinkComponent={Link} to="/login" variant='contained' sx={{margin:1, borderRadius:10}} color='warning'>Login</Button>
            <Button LinkComponent={Link} to="/login" variant='contained' sx={{margin:1, borderRadius:10}} color='warning'>Signup</Button>
                </>
               }
            
            {
              isLogged && <Button  LinkComponent={Link} onClick={()=> dispatch(loginActions.logout())} to="/login"
               variant='contained' sx={{margin:1, borderRadius:10}} 
              color='warning' >LogoUt</Button>
            }
            
          </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header