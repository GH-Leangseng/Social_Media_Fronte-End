import React,{useEffect ,useState} from "react";
import girl from "../assets/girl.webp";
import { AiFillHeart, AiOutlineComment, AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import {IoIosShareAlt } from "react-icons/io";
import { AxiosInstance } from "../axios";
import { setLoading } from "../Redux/slice/AuthSlice";
import { getAuth } from "../Redux/slice/AuthSlice";
import { useAppDispatch, useAppSelector } from "../Redux/Hook/hooks";
import { base_url } from "../base.url";
import { getImage } from "./getImage";
import axios from "axios";
import moment from "moment";
import { setAllPosts } from "../Redux/slice/postSlice";
type Props = {};
interface Posts{
  desrciption :  String,
  image_path :  String,
  profile_picture_path : String,
  username : String,
  like : null,
  _id : string
  createdAt: Date
}
interface Data {
  post_id: any;
  user_id: any;
}
const NewFeed = (props: Props) => {
  const { user } = useAppSelector(getAuth); //user Redux 
  // const { post } = useAppSelector(getPosts); //user Redux 
  const dispatch = useAppDispatch();
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [popUpImage,setPopUpImage] = useState(true);
  const [image,setImage] = useState(null);
  // const [viewLike , setViewLike ] = useState(0);

  const likePost = async (post_id: String)=>{
        const dataLike :  Data = {
          post_id,
          user_id : user._id
        }
          // const response = await axios.post(base_url+"/post/like-un-like" , dataLike); //default action  with api 
          const reponse = await AxiosInstance.post('/post/like-un-like',dataLike);
          console.log(reponse);
          if(reponse.status === 201){
              console.log(reponse.data)
              alert(post_id);
          }
          
  }
  const showImage=(url : String)=>{
    // alert(url);
    setPopUpImage(!popUpImage);
    setImage(url);
  }
  
  const actionPopupImage=()=>{
    setPopUpImage(!popUpImage);
  }
  const getPosts = async ()=>{
    try {
          setLoading(true);
             const response =await AxiosInstance.get('/post/get-all-post');
             if( response.status == 200 ){
                  //  dispatch(setAllPosts(response.data));
                    setPosts(response.data);
                    console.log(posts)
                    setLoading(false);
                    // setViewLike(response.data.like);
             }
             console.log(response.data);
    } catch (error : any) {
             console.log(error.message);
    }
}
useEffect(()=>{
  getPosts();
  // likePost("63fa910c53af7263253b2baa");
},[])
  return (
   
  
    
      <>
        <div  onClick={actionPopupImage} className={popUpImage ? "hidden":"fixed w-full h-full top-[10%] left-0  bg-slate-900 opacity-100 overflow-hidden z-30"}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black h-[35rem] w-[50rem]">
              <img src={base_url+"/"+image} className="w-full h-full object-contain" alt="" />
            </div>

        </div>
        {loading ? <h1>Loading......</h1> : (
      <div>{
        posts.map((post : Posts)=>(
          <div className="dark:bg-gray-800 bg-white p-5 mt-5" key = {post._id}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            
            <img
              src={getImage(post?.profile_picture_path)}
              alt=""
              className="h-10 w-10 object-contain  rounded-full"
            />
            <div className="ml-5">
              <h2 className="dark:text-gray-200 text-gray-800 uppercase">
                {post?.username}
              </h2>
              <p className="text-sm">{moment(post?.createdAt).fromNow()}</p> {/* // need install : npm install moment for diplay time  Like this : 7 minutes ago */}
              
            </div>
          </div>
          <AiOutlineUserAdd className="text-3lg text-cyan-800 p-2 cursor-pointer " />
        </div>
        <p className="mt-2">
          {post?.desrciption}
        </p>
        <img  src={getImage(post?.image_path)} onClick={()=>showImage(post.image_path)} alt="" className="mt-2 rounded-md h-auto w-full object-cover"/>
        <div className="flex ml-5 items-center text-xl mt-2">
                  {post?.like} <h3 className="ml-2">Like</h3> 
                  <AiOutlineLike className="mx-2" onClick={()=>likePost(post?._id)}/> 
                  {/* <AiFillHeart className="mx-2" onClick={()=>likePost(post?._id)}/>  */}
                  <AiOutlineComment className="mx-2"/>
                  <IoIosShareAlt className="mx-2"/>
        </div>
      </div>
        ))
      }
      </div>) }
      </>
  );
};

export default NewFeed;
