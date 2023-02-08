import  LockOutlinedIcon  from '@mui/icons-material/lockOutlined'
import { Avatar, Button, Grid, TextField, Typography, useTheme,Link, CssBaseline } from '@mui/material'
import { Box, Container} from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';
import {styled} from "@mui/material/styles"

function Login() {
  const theme =useTheme();
const navigate=  useNavigate();
 const {signIn}=useAuth()


  async function login(e){
    e.preventDefault();
      const  {email,password} =e.target;
    
    await signIn(email.value,password.value)
    navigate("/")

  }

  const StyledLink=styled(Link)({
    textDecoration:"none"
  })
 
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box  sx={{display:"flex",
                flexDirection:"column",
                mt:theme.spacing(9)  ,
                alignItems:"center",
                }} >
        <Avatar sx={{ backgroundColor:theme.palette.secondary.main}}>
          <LockOutlinedIcon/>
        </Avatar>

        <Typography component="h1" variant="h6" color="inherit">
          Sign In
        </Typography>
   
          <form onSubmit={login} >
          <TextField label="Email" name='email' fullWidth type='email' autoComplete="off" id='email' variant='outlined' margin='normal' 
            required>
          </TextField>
          <TextField label="Password" name='password' fullWidth type='password' autoComplete="current-password" id='password' variant='outlined'  margin="normal"
            required>
          </TextField>

          <Button variant='contained'  type='submit' fullWidth   sx={{
              margin: theme.spacing(2, 0, 2)
            }} >Log In</Button>

          </form>
          <Grid container justifyContent={"flex-start"}>
          <Grid item>
            <StyledLink variant="body2" href="/register">
              New User? Sign Up
            </StyledLink>
          </Grid>
        </Grid>
  

   
      </Box>

    </Container>
  )
}

export default Login