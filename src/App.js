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
          <Route path='/storypage' element={<StoryPage/>} />
          <Route path='/chapterpage' element={<ChapterPage/>} />
          <Route path='/browsepage' element={<BrowsePage/>} />
          <Route path='/updatespage' element={<UpdatesPage/>} />
          <Route path='/authorpage' element={<AuthorPage/>} />
          
         
        </Routes>

    </div>
  );
}

export default App;