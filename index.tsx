import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Login from './components/login/Login';
import BookSlot from './components/bookslot/Bookslot';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/signup/SignUp';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


// export let MyContext= React.createContext();


let childRoutes=[
  {
    path: '/',
    element: <SignUp />
    // loader: () => {
    //   const token = localStorage.getItem('token'); 
    //   if (token) {
    //     return redirect('dashboard');
    //   } else {
    //     return redirect('signup');
    //   }
    // }
  },
  {
    path:'dashboard',
    element:(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: 'slotbooking',
    element: (
      <ProtectedRoute>
        <BookSlot />
      </ProtectedRoute>
    ),
  },
  {
    path:'login',
    element: <Login />
  },
  {
    path:'signup',
    element: <SignUp />
  }
]

const router= createBrowserRouter([
  {
    path:'/',
    element:<App></App>,
    children:childRoutes
  }
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router}></RouterProvider>
);


