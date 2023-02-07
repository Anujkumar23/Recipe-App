// Import the functions you need from the SDKs you need
import { createContext, useEffect,useState,useContext } from "react";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {createUserWithEmailAndPassword, getAuth,updateProfile,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgkGaF3AoYlmlU9JxOjDdpt77BJVK-bFg",
  authDomain: "recipe-book-fd78a.firebaseapp.com",
  projectId: "recipe-book-fd78a",
  storageBucket: "recipe-book-fd78a.appspot.com",
  messagingSenderId: "903398316484",
  appId: "1:903398316484:web:7b93a03a9cd0e7f5ffac91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=  getAuth(app);

 const  AuthContext=  createContext(null)

 export const useAuth=()=>useContext(AuthContext);

 export function AuthProvider({children}){
    const auth=useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>

 }

function  useProvideAuth(){
    const [user,setUser]=useState(null);

    const signUp =(email,password,displayName)=>{createUserWithEmailAndPassword(auth,email,password).then(({user})=>{
      updateProfile(user,{displayName})
       setUser(user)
        return user;
    })}

    const signIn=(email,password)=>{
       signInWithEmailAndPassword(auth,email,password).then(({user})=>{
            setUser(user);
            return user;
        })
    }
    const signOutUser=()=>{signOut(auth).then(()=>setUser(null))}

    useEffect(() => {
    const unsubscribe =()=>{
    onAuthStateChanged(auth,(user)=>{
        user?setUser(user):setUser(null)
    })
}
    
      return () => {
        unsubscribe()
      }
    })
    

    return{
        user,signIn,signOutUser,signUp
    }
}

