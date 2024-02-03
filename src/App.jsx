import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/pages/Home';
import CreateForm from './components/pages/CreateForm'

function App() {

  useEffect(() => {
    document.title = "Final-project";
  }, []);
  
  return (
    <>
      <Router>
        <Navbar />
         <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/createForm' exact Component={CreateForm} />
         </Routes>
      </Router>
    </>
  )
}
export default App;