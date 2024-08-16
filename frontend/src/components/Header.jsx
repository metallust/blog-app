import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const Header = () => {
	const { toggleTheme, logout } = useContext(UserContext);
	return (
		<>
			<nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<button
						data-collapse-toggle="navbar-default"
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default"
						aria-expanded="false"
						onClick={() => {
							const nav = document.querySelector("#navbar-default");
							nav.classList.toggle("hidden");
						}}
					>
						<svg
							className="w-5 h-5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 17 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M1 1h15M1 7h15M1 13h15"
							/>
						</svg>
					</button>
					<Link
						to="/"
						className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						aria-current="page"
					>
						R+D Blogs
					</Link>
					<div className="hidden w-full md:block md:w-auto" id="navbar-default">
						<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									to="/"
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
									aria-current="page"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard"
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
									aria-current="page"
								>
									Dashboard
								</Link>
							</li>

							<li>
								<Link
									to="/create"
									className="flex py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
									aria-current="page"
								>
									<div className="font-bold text-2xl mr-1">
										<IoIosAdd />
									</div>
									Create Blog
								</Link>
							</li>
							<li>
								<button
									onClick={toggleTheme}
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>
									Toggle-Theme
								</button>
							</li>
						</ul>
					</div>
					<div>
						<button
							onClick={logout}
							className="flex items-center font-bold py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
							aria-current="page"
						>
							Logout
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
