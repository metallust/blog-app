import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/usercontext";
import axios from "axios";

const Blog = () => {
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
					.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`, {
						headers: { Authorization: `Bearer ${currentUser.token}` },
					})
					.then((res) => {
						console.log(res.data);
						setBlog(res.data);
					})
					.catch((error) => {
						console.error(error);
						refresh(fetchblogbyid);
					});
			};
			fetchblogbyid();
		}
	}, [currentUser, id, navigate, refresh]);

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div>title : {blog.title}</div>
				<div>content : {blog.content}</div>
				<div>author: {blog.author}</div>
				<div>created_at: {blog.created_at}</div>
				<div>updated_at: {blog.updated_at}</div>
				<div>id: {id},</div>
			</div>
		</section>
	);
};

export default Blog;
