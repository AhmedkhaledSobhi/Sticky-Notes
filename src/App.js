import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Nave from './navbar/Nave';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Home from './Home/Home';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import AddNote from './AddNote/AddNote';
import particle from './Particle';



export default function App() {

<particle/>
      let navigate=useNavigate()
      const [userData, setUserData] = useState(null);
      function SaveUserData() {
        let encodedToken= localStorage.getItem('UserToken');
        let DecodedToken= jwtDecode(encodedToken);
        setUserData(DecodedToken);
        // console.log(DecodedToken);
      }

      useEffect(() => {
        if(localStorage.getItem('UserToken'))
        {
          SaveUserData()
        }
      }, []);

      function ProtectedRoute(props)
      {
        if(localStorage.getItem('UserToken')===null)
        {
          return <Navigate to="/SignIn"/>
        }
        else
        {
          return props.children
        }
      }

      // LogOut Page
      function LogOut()
      {
        navigate('/SignUp');
        localStorage.removeItem('UserToken');
        setUserData(null);
      }


  return (<>
        <Nave userData={userData} logOut={LogOut}/>
      <Routes>
        <Route path='/' element={ <ProtectedRoute> <Home/> </ProtectedRoute>}/>
        <Route path='SignUp' element={ <SignUp/>}/>
        <Route path='SignIn' element={ <SignIn saveUserData={SaveUserData}/>}/>
        <Route path='Home' element={ <ProtectedRoute> <Home/> </ProtectedRoute> }/>
{/* 
        <Route path='Home' element={ <ProtectedRoute> <Home/> </ProtectedRoute> }>
          <Route path='AddNote' element={ <ProtectedRoute> <AddNote/> </ProtectedRoute> }/>
        </Route> */}

        <Route path='*' element={ <div className='d-flex justify-content-center align-items-center text-center flex-column p-1'> 
              <div> <h1 className='fs-1 fw-bolder text-danger'>404</h1> <h2  className='fs-1 fw-bolder text-danger'>Not Found</h2></div></div>}/>

      </Routes>

  </> );
}

//  App;
