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
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../feature/recipe-slice';
import SaveIcon from '@mui/icons-material/Save';
import { getRecipeBookItems } from '../../utils';





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
        dispatch(getRecipe(searchTerm));
        setSearchText('')
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
    const [anchorEl,setAnchorEl]=useState(null);
    const isOpen=Boolean(anchorEl)

    const recipeBook=useSelector(state=>state.recipeBook.value)
    const count=getRecipeBookItems(recipeBook);

    const StyledLink=styled(Link)(({theme})=>({
        color:theme.palette.common.white,
        textDecoration:"none",
      
      }))
      const login=()=>{
        navigate("/login")
       }

       const navigateToRecipeBook=()=>{
           navigate("/recipebook")
       }

       const  handleProfileMenuOpen=(e)=> {
        setAnchorEl(e.currentTarget);
      }
      
       const handleMenuClose=()=>{
        setAnchorEl(null)
       }
       const logOut= async()=>{
        await signOutUser()
         navigate("/login")
       }

       const renderMenu=(
        <Menu  anchorEl={anchorEl}
        id="user-profile-menu"
        keepMounted 
        open={isOpen}
        onClose={handleMenuClose} 
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}  >
      
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>
        </Menu>
       )
        



  return (
    <>
        <AppBar position='sticky' >
        <Toolbar xs={12} sx={{py:theme.spacing(),gap:2, justifyContent:'space-between'}}>
            <Typography variant="h6" color="inherit" sx={{padding:theme.spacing()}}>
              <StyledLink to="/">Recipe App</StyledLink>
            </Typography>

            <SearchBar/>

            <Box sx={{display:{sm:"flex",xs:"none",}}}>
             <IconButton size='large' color='inherit' onClick={navigateToRecipeBook}sx={{ml:theme.spacing()}} > 
             <Badge  badgeContent={count} color="error" >
              <SaveIcon/>
             </Badge>
                
            </IconButton> 
            {user?<Button  color='inherit' onClick={handleProfileMenuOpen} >{user.displayName??user.email}</Button>:<Button  color='inherit' onClick={login}>Login</Button>}
            </Box>


            </Toolbar>
            </AppBar>
            {renderMenu}
    </>

  )
}

export default Header