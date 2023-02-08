import { Button, Grid, TextField, Typography, useTheme,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/lockOutlined'
import { Avatar, Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useAuth } from '../firebase/Auth'
import { useNavigate } from 'react-router-dom'





function Register() {

 const {signUp}=useAuth();
  const theme=useTheme();
  const navigate=useNavigate()

  async function registerUser(e){
    e.preventDefault();
    const  {email,password,name} =e.target
    
    await signUp(email.value,password.value,name.value)
    navigate("/login")
  }
  return (
    <Container component="main"  maxWidth="sm">
      <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",mt:theme.spacing(9)}}>
       <Avatar sx={{ backgroundColor:"secondary.main"}} >
        <LockOutlinedIcon/>
       </Avatar>
       <Typography component="h1"variant="h6" color="inherit" >
        Sign Up
       </Typography>
      <form onSubmit={registerUser}  >


        <TextField name="name" type="text" id="name" fullWidth required label="Name" margin='normal' >

        </TextField>
        <TextField label="Email" name='email' fullWidth type='email' autoComplete="off" id='email' variant='outlined' margin='normal' 
            required>
          </TextField>
          <TextField label="Password" name='password' fullWidth type='password' autoComplete="off" id='password' variant='outlined'  margin="normal"
            required>
          </TextField>
          <Button variant='contained'  type='submit' fullWidth   sx={{
              margin: theme.spacing(2, 0, 2)
            }} >Sign Up</Button>

      </form>
      <Grid container justifyContent={'flex-start'}>
        <Grid item >
          <Link variant='body2' href="/login" sx={{textDecoration:"none"}}>
            Already have an Account? login
          </Link>

        </Grid>
      </Grid>

      </Box>


    </Container>
  )
}

export default Register