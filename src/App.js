import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin } from './features/user/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import Posting from './pages/Posting'
import Verification from './pages/Verification';
import Profile from './pages/Profile';
import PostingDetails from './pages/PostingDetails';
import NewPosting from './pages/NewPosting';
import Navbar from './components/Navbar';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordRequest from './pages/ResetPasswordRequest';
import ResendVerification from './pages/ResendVerification';
import EditProfile from './pages/EditProfile';

function App() {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('user_token')
  const userGlobal = useSelector((state) => state.user.user)

  useEffect(() => {
    if (userToken != '' && userToken != null && userToken != undefined) {
      dispatch(checkLogin(userToken))
    }
  }, [])

  return (
    <div>

      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/profile/edit' element={<EditProfile />}></Route>
        <Route path='/posting/' element={<Posting />} ></Route>
        <Route path='/posting/new-posting' element={<NewPosting />} ></Route>
        <Route path='/posting/:id/details' element={<PostingDetails />} ></Route>
        <Route path='/users/verification/:token' element={<Verification />} />
        <Route path='/users/reset-password/send-request' element={<ResetPasswordRequest />} />
        <Route path='/users/reset-password/:token' element={<ResetPassword />} />
        <Route path='/users/resend-verification' element={<ResendVerification />} />
      </Routes>
    </div>
  );
}

export default App;