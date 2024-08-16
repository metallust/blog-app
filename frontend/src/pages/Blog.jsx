import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/usercontext";
import Comments from "../components/Comments";
import axios from "axios";

const Blog = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { currentUser } = useContext(UserContext);
	const [blog, setBlog] = useState({
		title: "",
		content: "",
		author: "",
		created_at: "",
		updated_at: "",
		id: id,
	});

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		} else {
			const fetchblogbyid = async () => {
				console.log(import.meta.env.VITE_BACKEND_URL);
				axios
					.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`, {
						headers: { Authorization: `Bearer ${currentUser.token}` },
					})
					.then((res) => {
						console.log(res.data);
						setBlog(res.data);
					})
					.catch((error) => {
						alert("Can't get the blog", JSON.stringify(error.response.data));
						console.error(error);
					});
			};
			fetchblogbyid();
		}
	}, [currentUser, id, navigate]);

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="px-6 pt-20 py-12 mx-auto lg:py-20 min-h-screen">
				<h2 className="text-4xl font-extrabold dark:text-white">{blog.title}</h2>
				<div className="mt-1 mb-5 text-lg text-gray-500 flex gap-10">
					<Link to="/">Author: {blog.author}</Link>
					<Link to="/">Date: {new Date(blog.updated_at).toDateString()}</Link>
				</div>
				<p className="mb-4 text-lg font-normal text-gray-600 dark:text-gray-300">
					{blog.content}
				</p>
				<Comments id={blog.id} />
			</div>
		</section>
	);
};

export default Blog;
