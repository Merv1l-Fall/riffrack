import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createHashRouter } from "react-router";
import './index.css';
import App from './App.jsx';
import Home from "./pages/Home.jsx";


const router = createHashRouter([
	{
		path: "/",
		Component: App,
		children:[
			{index: true, Component: Home}
		],
	},
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
