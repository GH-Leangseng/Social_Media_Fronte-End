import Header from "./components/Header"
import Profile from "./components/Profile"
import OnYourMine from "./components/OnYourMine"
import Sponser from "./components/Sponser"
import NewFeed from "./components/NewFeed"
import FriendList from "./components/FriendList"
import {useAppDispatch,useAppSelector} from './Redux/Hook/hooks'
import { getAuth, setLoading, setUser } from "./Redux/slice/AuthSlice"
import { useEffect } from "react"
import Login from "./components/Login"
import { base_url } from "./base.url"
import axios from 'axios'
type Props = {}
function App() {
  const dispatch = useAppDispatch();
  const {user , loading} = useAppSelector(getAuth);
  
    const checkAuth =  async ()=>{
      setLoading(true);
      localStorage.getItem('token');
      const token =  localStorage.getItem('token');
      if(token){
        try {
            const response = await  axios.get(base_url+"/auth/check-auth",{
              headers : {
                "Authorization" : "Bearer "  + token 
              }
            });
            if(response.status === 200){
              dispatch(setUser(response.data))
            }
        } catch (error) {
            localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }

  useEffect(()=>{
    checkAuth();
  },[]);
  return (
  
    loading ? <h1>Loading....</h1> : user ? (
      <> 
      <Header/>
      <div className="w-full bg-gray-200 dark:bg-gray-600 h-[90vh] fixed top-[10%] py-5">
          <div className="container mx-auto flex justify-between gap-10 w-full">
            <div className="hidden lg:block flex-[0.6] w-[25%]">
              <Profile/>
            </div>
            <div className="h-[90vh] overflow-auto flex-1 pb-5 w-[50%]">
              <OnYourMine/>
              <NewFeed/>
            </div>
            <div className="hidden lg:block flex-[0.6]  w-[25%] h-auto">
              <Sponser/>
              <br/>
              <FriendList/>
            </div>

          </div>
      </div>   
    </> ) : <Login/>
    
  
  )
}

export default App
