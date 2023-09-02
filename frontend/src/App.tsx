import React from 'react';

import './App.css';
import Navbar from './components/NavBar';
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div className="App" style={{background:"white"}} >
  <Navbar/>
  <AllRoutes/>
    </div>
  
  );
}

export default App;
