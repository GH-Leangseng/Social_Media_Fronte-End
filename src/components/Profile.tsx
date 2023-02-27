import React from 'react'
// icon
import {FaUserFriends} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {SlSocialPintarest} from 'react-icons/sl'
import {SlSocialFacebook} from 'react-icons/sl'
import {SlSocialLinkedin} from 'react-icons/sl'
import {SlSocialTwitter} from 'react-icons/sl'

// image
import girl from '../assets/girl.webp';
import { useAppDispatch, useAppSelector } from '../Redux/Hook/hooks'
import { getAuth } from '../Redux/slice/AuthSlice'



type Props = {}

const Profile = (props: Props) => {
  const { user } = useAppSelector(getAuth);
  const image = "http://localhost:5000/"+user.profile_picture_path;
  return (
    <div className='rounded-lg p-5 dark:bg-gray-800   bg-white'>
        <div className='flex justify-between items-center'>
                <div className="flex items-center">
                        
                        <img src={image} alt="" className='rounded-full w-10 h-10 object-cover' />
                        <div className='ml-5'>
                              <h1 className='dark:text-gray-500 uppercase'>{user?.username }</h1>
                              <div className='flex items-center'>
                                <p className='text-sm mx-2'>{user?.friends?.length}</p>
                                <FaUserFriends className='ml-1'/>
                              </div>
                        </div>
                </div>
                {/* <AiOutlineUserAdd className='text-2xl'/> */}
        </div>

        <hr className='my-5 bg-black'/>
        <div className='flex items-center'>
            <MdLocationOn className='text-lg'/>
            <p className='ml-5'>{user?.address}</p>
        </div>
        <div className='flex items-center mt-2'>
            <MdWork className='text-lg'/>
            <p className='ml-5'>{user?.work}</p>
        </div>
        <hr className='my-5 bg-black'/>

        <div className='flex justify-between items-center'>
          <p>Who view your Profile?</p>
          <h2>{user?.profile_view}</h2>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <p>Imporess from your friend</p>
          <h2>6700</h2>
        </div>
        <hr className='my-5 bg-black'/>
        <h2>Social Media</h2>
        <div className='mt-6'>
            <div className='flex items-center mt-2'>
                <SlSocialTwitter className='text-lg'/>
                <p className='ml-5 font-semibold'>Twitter</p>
            </div>
            <div className='flex items-center mt-2'>
                <SlSocialPintarest className='text-lg'/>
                <p className='ml-5 font-semibold'>Pintarest</p>
            </div>
            <div className='flex items-center mt-2'>
                <SlSocialFacebook className='text-lg'/>
                <p className='ml-5 font-semibold'>Facebook</p>
            </div>
            <div className='flex items-center mt-2'>
                <SlSocialLinkedin className='text-lg'/>
                <p className='ml-5 font-semibold'>Linkin</p>
            </div>
        </div>
        
    </div>
  )
}

export default Profile