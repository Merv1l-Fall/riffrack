
import "./Filter.css"
import useProductStore from "../store/productStore"

const Filter = () => {

	const filterTerm = useProductStore((state) => state.filterTerm);
	const sortOption = useProductStore((state) => state.sortOption);
	const applyFilter = useProductStore((state) => state.applyFilter);
	const applySort = useProductStore((state) => state.applySort);

	const handleSortingChange = (event) => {
	const newSortOption = event.target.value;
	applySort(newSortOption);
	};

	const handleSearchChange = (event) => {
		const newSearchTerm = event.target.value;
		applyFilter(newSearchTerm);
	};

	return(
		<div className="filter-container">
				<div className="search-container">
				<label htmlFor="home-search">Search</label>
				<input 
				type="text" 
				value={filterTerm}
				id="home-search"
				onChange={handleSearchChange}
				/>
				</div>
				<div className="dropdown-container">
				<label htmlFor="filter-dropdown">Sort</label>
				<select 
				name="filter-dropdown" 
				id="filter-dropdown" 
				value={sortOption} 
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