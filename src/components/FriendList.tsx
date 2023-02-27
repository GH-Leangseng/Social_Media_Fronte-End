import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { base_url } from '../base.url';
import {  useAppSelector } from '../Redux/Hook/hooks';
import { getAuth } from '../Redux/slice/AuthSlice';
import { AxiosInstance } from '../axios';
import { IoMdPersonAdd } from 'react-icons/io';
type Props = {}
interface Friend{
        username : String,
        _id : String,
        profile_picture_path : String,
}

const FriendList = (props: Props) => {
        const { user } = useAppSelector(getAuth);
        const id = user._id;
        const [friends,setFriends] = useState([]);
        const [notFriends,setNotFriends] = useState([]);
        const [loading,setLoading] = useState(true);
        const token = localStorage.getItem('token'); //get token from user
        const a1 = [1,2]
        const getFriendAndNot = async ()=>{
               try {
                        setLoading(true);
                        const response =await AxiosInstance.get('/friend/get-friend-not-friend/'+id);
                        //       console.log(response.data);
                        //       console.log(response.data.not_friends.length); 
                        if( response.status == 200 ){
                                setFriends(response.data.friends);
                                setNotFriends(response.data.not_friends);
                                setLoading(false);
                        }else{ 
                                console.log("Error")
                        }
               } catch (error : any) {
                        console.log(error.message);
               }
                

        }
        useEffect(()=>{
                getFriendAndNot();
        },[])
  return (
        loading ? <h1>Loading...</h1> : (
                
                <div className='w-full h-full my-2'>
                        <div className='w-full h-[30%] mb-4'>
                        
                        <div className='bg-white dark:bg-gray-800 p-5 mt-5 rounded-lg w-full h-[100%]  overflow-y-scroll'>
                                <h2 className='mt-2 text-4md'>Active</h2>
                                {friends.map((friend :Friend , index :number)=>(
                                        <div className='mt-2 mx-4' key={index}>
                                                 <div className="flex items-center  rounded-lg px-2 py-1 group cursor-pointer w-full">
                                                                <div className='flex justify-between items-center'>
                                                                         <img src={base_url+"/"+friend.profile_picture_path} alt="" className='w-10  object-cover h-10 rounded-full '/>
                                                                         
                                                                </div>
                                                                <div className='ml-5 w-full items-center flex justify-between'>
                                                                       
                                                                                <div>
                                                                                        <p className='dark:text-gray-200 text-gray-800 font-bold'>{friend?.username}</p>
                                                                                        <p className='text-sm'>10 Mutual friends</p>
                                                                                </div>
                                                                                <div className='bg-green-500 w-3 h-3 rounded-full '></div>
                                                                                {/* <IoMdPersonAdd onClick={()=>alert(friend._id)} className='w-8 h-8 p-2 rounded-full  group-hover:bg-green-400 cursor-pointer transition-all ease-in-out duration-300 group-hover:text-white  bg-white  text-black '/> */}
                                                                        
                                                                       
                                                                </div>
                                                        </div>
                                                
                                                
                                        </div>
                                ))}
                                <h2 className='mt-2 text-4md'>add friend more</h2>
                                {notFriends.map((friend :Friend , index :number)=>(
                                        <div className='mt-2 mx-4' key={index}>
                                                 <div className="flex items-center  rounded-lg px-2 py-1 group cursor-pointer w-full">
                                                                <div className='relative'>
                                                                         <img src={base_url+"/"+friend.profile_picture_path} alt="" className='w-10  object-cover h-10 rounded-full '/>
                                                                        {/* <div className='bg-green-500 w-3 h-3 absolute bottom-0 rounded-full right-0'></div> */}
                                                                </div>
                                                                <div className='ml-5 w-full items-center flex justify-between'>
                                                                       
                                                                                <div>
                                                                                        <p className='dark:text-gray-200 text-gray-800 font-bold'>{friend?.username}</p>
                                                                                        <p className='text-sm'>10 Mutual friends</p>
                                                                                </div>
                                                                                <IoMdPersonAdd onClick={()=>alert(friend._id)} className='w-8 h-8 p-2 rounded-full  group-hover:bg-green-400 cursor-pointer transition-all ease-in-out duration-300 group-hover:text-white  bg-white  text-black '/>
                                                                        
                                                                       
                                                                </div>
                                                        </div>
                                                
                                                
                                        </div>
                                ))}
                                
                               


                                
                        </div>   
                 </div>
                 
                </div>
                 

               
                
        )

        
  )
}

export default FriendList