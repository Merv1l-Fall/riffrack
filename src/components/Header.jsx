import { Link, useNavigate } from "react-router";
import "./Header.css";
import RRlogo from "../assets/logo.svg";
import carticon from "../assets/mdi_cart.svg";
import useCartStore from "../store/cartStore";
import { motion } from "framer-motion";

const Header = () => {
	const totalItems = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navigate = useNavigate();

  const handleHomeClick = () => {
	if (window.location.hash === "#/") {
	  window.scrollTo(0, 0);
	} else {
		navigate("/");
	}
  }

	return (
		<header>
			<nav className="header-nav">
				{/* <Link to="/"> */}
					<img src={RRlogo} onClick={handleHomeClick} alt="RiffRack Logo" />
				{/* </Link> */}
				<Link to="cart" className="cart-link">
					<img src={carticon} alt="Cart Link" />
					{totalItems > 0 && (
						<motion.span
						key={totalItems}
						initial={{scale:0.7, opacity: 0}}
						animate={{scale: 1, opacity: 1}}
						exit={{scale: 0.7, opacity: 0}}
						transition={{type : "spring", stiffness: 300, damping: 20}}
						 className="cart-count"
						 >{totalItems}</motion.span>
					)}
				</Link>
			</nav>
		</header>
	);
};

export default Header;
