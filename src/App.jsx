import { useState } from 'react'
import { Outlet } from 'react-router'
import './App.css'
import Header from './components/Header'

function App() {
 

  return (
   <div className='app-container'>
	<Header />
   <main>
	<Outlet />
   </main>

   </div>
  )
}

export default App
