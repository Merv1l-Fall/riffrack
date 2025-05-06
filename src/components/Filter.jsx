import { useState } from "react"
import "./Filter.css"

const Filter = () => {

	const [selected, setSelected] = useState("price-asc")
	const [search, setSearch] = useState("")

	const handleFilterChange = (event) => {
		setSelected(event.target.value)
		console.log(event.target.value)
	}

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
		console.log(event.target.value)
	}

	return(
		<div className="filter-container">
				<div className="search-container">
				<label htmlFor="home-search">Search</label>
				<input 
				type="text" 
				value={search}
				id="home-search"
				onChange={handleSearchChange}
				/>
				</div>
				<div className="dropdown-container">
				<label htmlFor="filter-dropdown">Sort</label>
				<select name="filter-dropdown" id="filter-dropdown" value={selected} onChange={handleFilterChange}>
					<option value="price-asc">Price    ↑</option>
					<option value="price-desc">Price   ↓</option>
					<option value="letter">ABC</option>
				</select>

				</div>
				
			</div>
	)
}

export default Filter