import React from 'react'
import Header from './Header'
import {  createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';



 const theme=createTheme({
    palette:{
        mode:"light"
    }
 })

  


function Layout() {
  return (
    <ThemeProvider  theme={theme}>
      <CssBaseline/>
      <Header/>
      <main>
        <Outlet/>
        </main>
      <footer></footer>
     
    </ThemeProvider>


  )
}

export default Layout