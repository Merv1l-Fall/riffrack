import { Link } from "react-router"
import "./Header.css"
import RRlogo from "../assets/logo.svg"
import carticon from "../assets/mdi_cart.svg"


const Header = () => {
	return(
		<header>
			<nav className="header-nav">
				<Link to="/">
				<img src={RRlogo} alt="RiffRack Logo" />
				</Link>
				<Link to="cart">
					<img src={carticon} alt="Cart Link" />
				</Link>
			</nav>
		</header>
	)
}

export default Header;