import React, { useState ,useEffect} from 'react'
import girl from '../assets/girl.webp';
import { BsFillCameraFill, BsFillCameraVideoFill, BsFillImageFill } from 'react-icons/bs';
import { IoMdAttach} from 'react-icons/io';
type Props = {}
import { useAppDispatch, useAppSelector } from '../Redux/Hook/hooks'
import { getAuth } from '../Redux/slice/AuthSlice';
import { base_url } from '../base.url';
import { AxiosInstance } from '../axios';
import { setAddPost } from '../Redux/slice/postSlice';
const OnYourMine = (props: Props) => {
  const { user } = useAppSelector(getAuth);
  const [addPostPopUp,setAddPostPopUp] = useState(true);
  const [desrciption,setDescription] = useState("");
  const [image,setImage] = useState<File>();
  const dispatch = useAppDispatch();
  const PopUp =()=>{
    // alert("You click pop up ");
    setAddPostPopUp(!addPostPopUp);
  }
  
  function refreshPage() {
    window.location.reload();
  }
  // console.log(image);

  const addPost= async ()=>{
    try {
      const data = {
        desrciption,
        image,
        user_id: user._id,
        username: user.username,
        profile_picture_path: user.profile_picture_path

      }
        if(image == undefined){
          alert("please upload picture for post in social media")
          setAddPostPopUp(!addPostPopUp);
        }else{
          const response = await AxiosInstance.post('/post/add-post',data,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
           });
    
           if(response.status === 201){
              if(response.data.image_path==null){
               dispatch(setAddPost(response.data));
              }
              console.log(response.data);
              refreshPage();
           }
           setAddPostPopUp(!addPostPopUp);
        }
       

    } catch (error) {
      
    }
   
  }
 
  


  return (
   <>
      {/* //pop up  */}
      <div className={ addPostPopUp ? "hidden" :"rounded-lg w-[30rem] fixed top-1/2 left-1/2 -translate-x-1/2 p-4 dis -translate-y-1/2  h-[10rem] bg-white "}>
            <input type="text" className='w-full rounded-lg  mb-4  bg-white border-2 h-20 border-black-300 pl-3 border-solid ' 
                    placeholder='description' value={desrciption} onChange={(e)=>{setDescription(e.target.value)}}/>
             {/* //getfile */}
            <div className='flex justify-between'>
              <input type="file" onChange={(e)=>{setImage(e.target.files![0])}} /> 
              <button onClick={addPost} className='px-10'>Post</button>
            </div>
           
      </div>

     <div className='bg-white dark:bg-gray-800 p-5 rounded-lg'>
      <div className='flex items-center'>
        <img src={base_url+"/"+user?.profile_picture_path} alt="" className='rounded-full w-10 h-10 object-cover' />
        <input type="text" placeholder='What on your mind ?' 
          className='bg-gray-200 ml-5 rounded-full text-sm py-2 w-full pl-3'  
        />
      </div>
      <hr className='my-5'/>
      <div className="flex justify-between">
        <div className="cursor-pointer flex items-center rounded-lg px-2 hover:bg-gray-200 transition-all" onClick={PopUp}>
          <BsFillImageFill/>
          <p className='ml-2'>Image</p>
        </div>
        <div className="flex items-center rounded-lg p-2 cursor-pointer hover:bg-gray-200 transition-all">
          <BsFillCameraVideoFill/>
          <p className='ml-2'>video</p>
        </div>
        <div className="flex items-center rounded-lg px-2 cursor-pointer hover:bg-gray-200 transition-all">
          <IoMdAttach/>
          <p className='ml-2'>Attachment</p>
        </div>
       
      </div>
    </div>
   </>
  )
}

export default OnYourMine