import React, {useState, useEffect} from 'react';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
// import Practice from './components/practice/practice';
// import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token"); 
      setIsLoggedIn(false);
    }
  };

  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} onLoginLogout={handleLoginLogout} />
    <Outlet></Outlet>
    </>
    // <Practice></Practice>
  );
}

export default App;
