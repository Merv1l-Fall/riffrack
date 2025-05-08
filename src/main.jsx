import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createHashRouter } from "react-router";
import './index.css';
import App from './App.jsx';
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx"
import Login from "./pages/Login.jsx"
import Admin from './pages/Admin.jsx';


const router = createHashRouter([
	{
		path: "/",
		Component: App,
		children:[
			{index: true, Component: Home},
			{path: "cart", Component: Cart},
			{path: "login", Component: Login},
			{path: "admin", Component: Admin},
		],
	},
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
