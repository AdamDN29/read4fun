import React from 'react'

//import react router dom
import { Router, Routes, Route, Link } from "react-router-dom";

//import pages
import Listpages from './pages/ListPages' 
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage'
import StoryPage from './pages/StoryPage'
import ChapterPage from './pages/ChapterPage'

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
          
         
        </Routes>

    </div>
  );
}

export default App;