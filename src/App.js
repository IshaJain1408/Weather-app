import React from 'react';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

const App = () => {
 
  return (
    <>
      <Router>
      <div>
        <section>                              
            <Routes>                                                                       
            <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/homepage" element={<Homepage />} />
            </Routes>                    
        </section>
      </div>
    </Router>

    </>
    
   
  );
};

export default App;
