import Footer from './components/Footer'
import { Outlet, ScrollRestoration } from 'react-router'
import './App.css'
import { useEffect } from 'react'
import useProductStore from './store/productStore'
import Header from './components/Header'

function App() {

	const {fetchProducts} = useProductStore();
	useEffect(() => {
		fetchProducts();
	}, []);
 

  return (
   <div className='app-container'>
	<Header />
   <main>
	<Outlet />
	<ScrollRestoration
	getKey={(location, matches) => {
		return location.pathname;
	}}
	/>
   </main>
	<Footer />
   </div>
  )
}

export default App
