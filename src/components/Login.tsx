import axios from 'axios';
import React, { useState}from 'react'
import { base_url } from '../base.url';
import { useAppSelector, useAppDispatch } from '../Redux/Hook/hooks'
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/slice/AuthSlice';
interface Props{
        
}

function Login(props: Props) {
  const [password,setPassword]  =  useState("");
  const [email,setEmail]  =  useState("");

  const dispatch = useAppDispatch();

  const login = async ()=>{
     const data = {password, email};
    try {
      const response = await axios.post(base_url+"/auth/login",data);
      if(response.status === 200){
        dispatch(setUser(response.data.user));
        console.log(response.data);
        localStorage.setItem("token",response.data.token);
      }
    } catch (error : any) { 
      // console.log(error);
        alert(error.response.data.message);
    }
  }
  return (
    <div className='w-[30rem]   h-[30rem] rounded-xl p-8 border-2 border-slate-500 border-solid fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <img className='w-[50%] mx-auto' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqhh6eLIF87mEK08dSaU1qhfK2U4X2ZtELN6ln99QEtg&s" alt="" />
        <input type="email"  value={email} className='border w-full my-3 mt-12 rounded-md px-5 py-3' onChange={(e)=> setEmail(e.target.value)} placeholder='username...' />
        <input type="password"  value={password} className='border w-full my-3 rounded-md px-5 py-3 ' onChange={(e)=> setPassword(e.target.value)} placeholder='password...' />
        <div className=''>
        <h3 className='justify-start py-2'>Forget password </h3> 
        <h3 className='justify-start py-2'>Create new Account </h3> 
        
        </div>
        <button  className='w-full py-3 mt-9' onClick={login}>Login</button>         
       
    </div>
   
  )
}

export default Login