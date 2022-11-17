import React from 'react'

//import react router dom
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";

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

import PolicyPage from './pages/PolicyPage'
import AboutUsPage from './pages/AboutUsPage'
import TermOfServicePage from './pages/TermOfServicePage';

//import components
import Navbars from './components/Navbars'
import Footer from './components/Footer'
import ScrollToTop from './hook/ScrollToTop';
import PrivateRoute from './hook/PrivateRoute';



function App() {
  return (
    <div>
        <ScrollToTop/>

        <Routes>
          
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          
          <Route path='/' element={<Homepage/>} />
          <Route path='/homepage' element={<Homepage/>} />
          {/* <Route path='/story' element={<StoryPage/>} /> */}
          <Route path="/story/:story_id" element={<StoryPage/>} />
          <Route path='/story/:story_id/chapter/:chapter_number' element={<ChapterPage/>} />
          <Route path='/browse/:link_query' element={<BrowsePage/>} />
          <Route path='/updates' element={<UpdatesPage/>} />
          <Route path='/author' element={<AuthorPage/>} />

          <Route path='/dashboard' element={<PrivateRoute> <DashboardUser/> </PrivateRoute>} />
          <Route path='/userstory/:story_id' element={<PrivateRoute> <UserStoryPage/> </PrivateRoute>} />
          <Route path='/editdetail/:story_id' element={<PrivateRoute> <EditDetailPage/> </PrivateRoute>} />
          <Route path='/editprofile' element={<PrivateRoute> <EditProfilePage/> </PrivateRoute>} />
          <Route path='/changepassword' element={<PrivateRoute> <ChangePasswordPage/> </PrivateRoute>} />
          <Route path='/userstory/:story_id/writing/:chapter_number' element={<PrivateRoute> <WritingPage/> </PrivateRoute>} />
          
          <Route path='/policy' element={<PolicyPage/>} />
          <Route path='/term_of_service' element={<TermOfServicePage/>} />
          <Route path='/about_us' element={<AboutUsPage/>} />

        </Routes>

    </div>
  );
}

export default App;