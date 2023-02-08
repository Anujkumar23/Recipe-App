
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout'
import { AuthProvider } from './firebase/Auth';
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';
import { store } from './store';

const router=createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
    </Route>

    <Route path="/login" element={<Login/>}></Route>
    <Route path="/register" element={<Register/>}></Route>
    
    
    
    </>
 )) 

function App() {

 
  
  return (
    <AuthProvider>
    <Provider store={store}>
   <RouterProvider router={router}></RouterProvider>
       </Provider>
       </AuthProvider>
    
 
    

  )
  
}

export default App
