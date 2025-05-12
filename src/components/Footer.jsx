import RRLogo from "../assets/logo-white.svg"
import facebook from "../assets/facebook.svg"
import twitter from "../assets/twitter.svg"
import tiktok from "../assets/tiktok.svg"
import instagram from "../assets/instagram.svg"
import "./Footer.css"
import { Link } from "react-router"

const Footer = () => {
	return ( 
		<footer>
			<img className="footer-logo" src={RRLogo} alt="Riff Raff Logo" />
			<p>Your one stop shop for all your musical needs</p>
			<div className="footer-socials">
				<a className="social-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
					<img src={facebook} alt="facebook link" />
				</a>
				<a className="social-link" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
					<img src={tiktok} alt="tiktok link" />
				</a>
				<a className="social-link" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
					<img src={twitter} alt="twitter link" />
				</a>
				<a className="social-link" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
					<img src={instagram} alt="instagram link" />
				</a>
			</div>
			<Link to="/login">Admin</Link>
		</footer>
	)
}

export default Footer