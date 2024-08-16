import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./index.css";

import Layout from "./components/Layout";
import UserProvider from "./context/usercontext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Blog from "./pages/Blog";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";

// if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<UserProvider>
				<Layout />
			</UserProvider>
		),
		errorElement: <Error />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "posts/:id", element: <Blog /> },
			{ path: "register", element: <Register /> },
			{ path: "login", element: <Login /> },
			{ path: "create", element: <Create /> },
			{ path: "dashboard/", element: <Dashboard /> },
			{ path: "dashboard/editpost/:id", element: <EditPost /> },
			// { path: "profile/:id", element: <UserProfile /> },
			// { path: "authors", element: <Authors /> },
			// { path: "posts/:id/delete", element: <DeletePost /> },
			// { path: "posts/categories/:category", element: <CategoryPost /> },
			// { path: "posts/user/:id", element: <AuthorPosts /> },
			// { path: "logout", element: <Logout /> },
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<RouterProvider router={router} />
	</>
);
