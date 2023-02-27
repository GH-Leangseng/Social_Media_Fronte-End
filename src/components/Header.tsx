import React, { ReactElement, useEffect, useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { BsFillMoonFill } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';
import { MdNotificationsActive } from 'react-icons/md';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { BsFillSunFill } from 'react-icons/bs';


interface Props {}

function Header({}: Props): ReactElement {
        const [currentTheme,setCurrentTheme] = useState("");

        const logout=()=>{
               localStorage.removeItem('token');
               window.location.reload();
        }
        useEffect(()=>{
                        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
                        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                document.documentElement.classList.add('dark');
                                
                        } else {
                            document.documentElement.classList.remove('dark');
                            
                        }
        },[]);

        const changeTheme =(theme:string)=>{
                if(theme=="light"){
                        localStorage.theme = "light";
                        document.documentElement.classList.remove('dark')
                        setCurrentTheme("light");
                }else{
                        localStorage.theme = "dark";
                        document.documentElement.classList.add('dark')
                        setCurrentTheme("dark");
                }
        }
  return (
    <div className="fixed left-0 top-0 w-full bg-white p-3 dark:bg-gray-800">
      <div className="container mx-auto h-[10vh] flex items-center justify-between">
        <div className="flex items-center">
                <h1 className="text-md font-bold lg:text-2xl hover:text-black cursor-pointer duration-700 transition ease-in-out  text-cyan-400">
                 SENG_MEDIA
                </h1>
                <div className="flex items-center">
                        <input 
                        type="text" 
                        placeholder="search....." 
                        className="ml-5 rounded-lg  bg-gray-200 py-1 hidden md:block text-black px-2" 
                        />
                        <FiSearch className="ml-5 md:-ml-8 text-gray-400"/>
                </div>
        </div>
           
          <ul className="flex items-center">
                <li className="ml-2 md:ml-5">
                        {
                              currentTheme ==="dark"?  (<BsFillSunFill onClick={()=>{changeTheme("light")}} className="cursor-pointer text-lg hover:text-black dark:text-gray-400 duration-700 transition ease-in-out  hover:scale-110"/>): (<BsFillMoonFill onClick={()=>{changeTheme("dark")}} className="cursor-pointer text-lg hover:text-black dark:text-gray-400 duration-700 transition ease-in-out  hover:scale-110"/>)
                        }
                </li>
                <li className="ml-2 md:ml-5">
                        <AiFillMessage className="cursor-pointer text-lg hover:text-black dark:text-gray-400 duration-700 transition ease-in-out  hover:scale-110"/>
                </li>
                <li className="ml-2 md:ml-5">
                        <MdNotificationsActive className="cursor-pointer text-lg hover:text-black dark:text-gray-400 duration-700 transition ease-in-out  hover:scale-110"/>
                </li>
                <li className="ml-2 md:ml-5">
                        <BsFillQuestionCircleFill className="cursor-pointer text-lg hover:text-black dark:text-gray-400 duration-700 transition ease-in-out  hover:scale-110"/>
                </li>
                <li className="ml-2 md:ml-5 text-black font-bold">
                        <BiLogOutCircle onClick={logout} className="text-white text-2xl"/>
                </li>
          </ul>
               
        
      </div>
    </div>
  );
}

export default Header;
