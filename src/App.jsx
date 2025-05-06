import Footer from './components/Footer'
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
	<Footer />
   </div>
  )
}

export default App
