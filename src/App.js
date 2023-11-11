import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './auth/Signin';
import SignUp from './auth/Signup';
import Uploader from './Pages/Upload/Uploader';
import Group from './Pages/Group/Group';
import Details from './Pages/Details/Details';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Uploader" element={<Uploader />} />
        <Route path="/Group" element={<Group />} />
        <Route path="/Details" element={<Details />} />
       
      </Routes>
    </Router>
  );
}

export default App;
