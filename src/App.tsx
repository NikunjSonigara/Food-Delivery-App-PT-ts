import Navbar from './components/Navbar/Navbar'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/homepage/Home'
import Menu from './pages/menupage/Menu'
import CartPage from './pages/CartPage/CartPage'
import DetailPage from './pages/detailpage/DetailPage'
import LoginPage from './pages/Loginpage/LoginPage'
import { useEffect, useState } from 'react'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<{email:string, password: string} | null>(null);

  useEffect(() => {
    const d = window.localStorage.getItem('userData');
    if(d){
      setIsLoggedIn(true);
      const useData = JSON.parse(d);
      console.log(useData);
      setUserData(useData);
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {(location.pathname !== '/login') && (<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userData={userData}/>)}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/cart' element={isLoggedIn ? (<CartPage/>) : (<Navigate to='/login'/>)}/>
        <Route path='/detail' element={<DetailPage/>}/>
        <Route path='*' element={<div className='flex h-full w-full items-center justify-center'><img className='mt-10' src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" alt="" /></div>}/>
      </Routes>
    </div>
  )
}

export default App