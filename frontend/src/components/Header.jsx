import { useContext } from "react";
import { UserContext } from "../context/usercontext";

const Header = () => {
	const { toggleTheme, logout } = useContext(UserContext);
	return (
		<>
			<button onClick={toggleTheme}>Theme</button>
			<button onClick={logout}>Logout</button>
		</>
	);
};

export default Header;
