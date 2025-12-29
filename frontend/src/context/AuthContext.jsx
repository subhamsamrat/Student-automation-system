import {createContext, useState} from 'react'

export const authContext=createContext();


const AuthProvider=(props)=>{
    const user=localStorage.getItem('user');
   const [User,setUser]=useState(user?JSON.parse(user):null);
   
return(
      <authContext.Provider value={User}>
            {props.children}
    </authContext.Provider>
);

}

export default AuthProvider;