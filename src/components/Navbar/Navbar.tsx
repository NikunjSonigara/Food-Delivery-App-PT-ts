import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css'
import { BsCart3 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { PostData } from '../../data';

const Navbar : FC<{isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>, userData: {email: string, password: string} | null}> = ({isLoggedIn, setIsLoggedIn, userData}) => {

    const locationPath = useLocation().pathname;
    const cart: PostData[] = useSelector((state: any) => state.cart);
    const [i, setI] = useState();

    const [usersData, setUsersData] = useState();

    const logoutHandler = () => {
      setIsLoggedIn(false);
      window.localStorage.removeItem("userData");
      console.log("logout");
    }

    useEffect(() => {
      const d = window.localStorage.getItem('userData');
      if(d){
        const useData = JSON.parse(d);
        console.log(useData);
        setUsersData(useData);
        setI(useData?.email[0]);
      }
    }, []);
    
  return (
    <div className='navbar_container'>
        <nav className="navbar">
            <Link to='/'>
              <span className="header_left" id="header_left" >Noodletown</span>
            </Link>
            <div className="header_right">
                <Link to='/menu'>
                <span className={`${locationPath == '/' ? "text-white" : "text-black"} text-md font-medium`}>Menu</span>
                </Link>
                <Link to="/cart">
                <div className='relative'>
                  <BsCart3 className={`${locationPath == '/' ? "text-white" : "text-black"} text-2xl`}/>
                    {
                      cart.length > 0 && <span className='absolute -top-1 -right-2 bg-yellow-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full text-white'>{cart.length}</span>
                    }
                  </div>
                </Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar