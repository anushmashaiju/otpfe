import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import OTPverify from './Pages/OTPverify';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
     
          <Route path="/" element={<OTPverify/>} /> 
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
