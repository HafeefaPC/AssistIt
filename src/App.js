import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes from react-router-dom
import Navbar from './components/Navbar';
import SignIn from './auth/Signin';
import SignUp from './auth/Signup';
import Uploader from './Pages/Upload/Uploader';
import Group from './Pages/Group/Group';



function App() {
   
  
  return (
    <Router>
      
      <Navbar />
      <Routes> {/* Wrap your Route components in a Routes component */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Uploader" element={<Uploader/>} />
        <Route path="/Group" element={<Group/>} />
       
      </Routes>
    
    </Router>
  );
}

export default App;
