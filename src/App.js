import React from 'react'

//import react router dom
import { Router, Routes, Route, Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//import pages
import Listpages from './pages/ListPages' 
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import StoryPage from './pages/StoryPage'
import ChapterPage from './pages/ChapterPage'
import BrowsePage from './pages/BrowsePage'
import UpdatesPage from './pages/UpdatesPage'
import AuthorPage from './pages/AuthorPage'

import DashboardUser from './pages/DashboardUser'
import UserStoryPage from './pages/UserStoryPage'
import EditDetailPage from './pages/EditDetailPage'
import EditProfilePage from './pages/EditProfilePage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import WritingPage from './pages/WritingPage'

//import components
import Navbars from './components/Navbars'
import Footer from './components/Footer'



function App() {
  return (
    <div>
   
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          
          <Route path='/' element={<Listpages/>} />
          <Route path='/homepage' element={<Homepage/>} />
          <Route path='/story' element={<StoryPage/>} />
          <Route path='/chapter' element={<ChapterPage/>} />
          <Route path='/browse' element={<BrowsePage/>} />
          <Route path='/updates' element={<UpdatesPage/>} />
          <Route path='/author' element={<AuthorPage/>} />

          <Route path='/dashboard' element={<DashboardUser/>} />
          <Route path='/userstory' element={<UserStoryPage/>} />
          <Route path='/editdetail' element={<EditDetailPage/>} />
          <Route path='/editprofile' element={<EditProfilePage/>} />
          <Route path='/changepassword' element={<ChangePasswordPage/>} />
          <Route path='/writing' element={<WritingPage/>} />
          
         
        </Routes>

    </div>
  );
}

export default App;