import { NavLink } from "react-router"
import "./Header.css"
import RRlogo from "../assets/logo.svg"
import carticon from "../assets/mdi_cart.svg"


const Header = () => {
	return(
		<header>
			<nav className="header-nav">
				<NavLink>
				<img src={RRlogo} alt="RiffRack Logo" />
				</NavLink>
				<NavLink>
					<img src={carticon} alt="" />
				</NavLink>
			</nav>
		</header>
	)
}

export default Header;