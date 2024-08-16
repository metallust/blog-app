import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/usercontext";
import axios from "axios";

const EditPost = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { currentUser, refresh } = useContext(UserContext);
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
					.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/`, {
						headers: { Authorization: `Bearer ${currentUser.token}` },
					})
					.then((res) => {
						console.log(res.data);
						setBlog(res.data);
					})
					.catch((error) => {
						if (error.response.status === 404) {
							return navigate("/");
						}
						console.error(error);
						alert("Can't Edit", JSON.stringify(error.response.data));
					});
			};
			fetchblogbyid();
		}
	}, [currentUser, id, navigate, refresh]);

	const changeInputHandler = (e) => {
		setBlog((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/`, blog, {
				headers: { Authorization: `Bearer ${currentUser.token}` },
			})
			.then((res) => {
				console.log(res.data);
				navigate(`/posts/${id}`);
			})
			.catch((error) => {
				console.error(error);
				alert("Can't create post", JSON.stringify(error.response.data));
			});
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<form className="px-6 pt-20 py-12 mx-auto lg:py-20">
				<div className="dark:text-white text-lg ml-2">Title</div>
				<textarea
					className="text-2xl font-extrabold p-2 border-2 border-gray-700 rounded-sm dark:text-white dark:bg-inherit w-full"
					value={blog.title}
					onChange={changeInputHandler}
					name="title"
				/>
				<div className="my-4 text-lg text-gray-500 flex gap-10">
					<Link to="/">Author: {blog.author}</Link>
					<Link to="/">Date: {new Date(blog.updated_at).toDateString()}</Link>
				</div>
				<div className="dark:text-white text-lg ml-2">Content</div>
				<textarea
					className="mb-4 w-full text-lg p-2 border-2 border-gray-700 font-normal text-gray-500 dark:text-gray-400 dark:bg-inherit"
					value={blog.content}
					onChange={changeInputHandler}
					name="content"
					rows={20}
				/>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
		</section>
	);
};

export default EditPost;
