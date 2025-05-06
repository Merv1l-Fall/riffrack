import { useState } from "react"
import "./Filter.css"
import useProductStore from "../store/productStore"

const Filter = () => {

	const [selected, setSelected] = useState("price-asc");
	const [search, setSearch] = useState("");
	const filterProducts = useProductStore((state) => state.filterProducts);
	const sortProducts = useProductStore((state) => state.sortProducts);

	const handleSortingChange = (event) => {
		const sortOption = event.target.value;
		setSelected(sortOption);
		sortProducts(sortOption);
	}

	const handleSearchChange = (event) => {
		const term = event.target.value;
		setSearch(term);
		filterProducts(term);
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
				<select 
				name="filter-dropdown" 
				id="filter-dropdown" 
				value={selected} 
				onChange={handleSortingChange}
				>
					<option value="price-asc">Price    ↑</option>
					<option value="price-desc">Price   ↓</option>
					<option value="letter">ABC</option>
				</select>

				</div>
				
			</div>
	)
}

export default Filter