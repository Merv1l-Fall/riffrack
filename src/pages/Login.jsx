import "./Login.css"
import { Link, Navigate } from "react-router"
import useAdminStore from "../store/adminStore"
const Login = () => {

	const {isLoggedIn, toggleLogIn} = useAdminStore();
	

	return(
		<section className="login-section">
			<div className="form-container">
				{isLoggedIn ? (
					<Navigate to="/admin" replace />
				) : (<form>
					<div className="input-container">
					<label htmlFor="username-input">Username</label>
					<input 
					type="text"
					id="username-input"
					/>
					</div>
					<div className="input-container">
					<label htmlFor="password-input">Password</label>
					<input 
					type="text"
					id="password-input"
					/>
					</div>
						<Link to="/admin">
					<button type="submit">Login</button>
						</Link>
				</form>)}
				
			</div>
		</section>
	)
}

export default Login