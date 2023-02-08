import React, { useDeferredValue, useEffect, useState } from 'react'
import { AppBar,Autocomplete,Badge,Button,IconButton,Menu,MenuItem,Toolbar, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import {styled,alpha} from "@mui/material/styles";
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { useAuth } from '../firebase/Auth';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { getRecipe } from '../feature/recipe-slice';





function SearchBar(){
    const theme=useTheme()
    const dispatch=useDispatch()
  const [searchText,setSearchText]=useState("");
  const [searchTerm,setSearchTerm]=useState("")

    const updateSearch=(e)=>{
        setSearchText(e.target.value)
        console.log(e.target.value)
    }


    const updateTerm=(e)=>{
        e.preventDefault();
       setSearchTerm(searchText)
    }

    useEffect(()=>{
        dispatch(getRecipe());
    },[searchTerm])



    return ( 
 <Paper
      onSubmit={updateTerm}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50% "}}
    >
      
      <InputBase
      type='text'
      value={searchText}
       onChange={updateSearch}
        sx={{ ml: 1, flex: 1 , backgroundColor:alpha(theme.palette.common.white,0.15),}}
        placeholder="Search recipe"
        inputProps={{ 'aria-label': 'search recipe' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      
      
    </Paper>

    
       
    )
}





function Header() {
    const theme =useTheme()
    const navigate=useNavigate();
    const {user,signOutUser}=useAuth();

    const StyledLink=styled(Link)(({theme})=>({
        color:theme.palette.common.white,
        textDecoration:"none",
      
      }))
      const login=()=>{
        navigate("/login")
       }
  return (
    <AppBar position='sticky' >
        <Toolbar xs={12} sx={{py:theme.spacing(),gap:2, justifyContent:'space-between'}}>
            <Typography variant="h6" color="inherit" sx={{padding:theme.spacing()}}>
              <StyledLink to="/">Recipe App</StyledLink>
            </Typography>

            <SearchBar/>

            <Box sx={{display:{sm:"flex",xs:"none",}}}>
            {/* <IconButton size='large' color='inherit' onClick={navigateToCart}sx={{ml:theme.spacing()}} >
             <Badge  badgeContent={count} color="error" >
              <ShoppingCartIcon />
             </Badge>
                
            </IconButton> */}
            {user?<Button  color='inherit'>{user.displayName??user.email}</Button>:<Button  color='inherit' onClick={login}>Login</Button>}
            </Box>


            </Toolbar>
            </AppBar>
  )
}

export default Header