/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function UpdatePost(props) {
  const [Post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/data/posts/${id}`)
      .then(res => setPost(res.data.post))
      .catch(err => console.error("Failed to fetch posts:", err));
  }, []);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const updatedPostapi = axios.patch(`http://localhost:5000/api/data/posts/${id}`, Post, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        props.fetchPosts();
        console.log("Post updated:", res.data);
      })
      .catch(error => console.log(error));
    console.log("Updated post:", updatedPostapi);
  };

  const changeUpdatePost = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-blue-600">MyBlog</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Update Post</h1>
          <p className="mt-1 text-sm text-gray-500">Edit your post details</p>
        </div>
        <form onSubmit={handleUpdatePost} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text" name="title" id="title"
              value={Post.title || ''}
              onChange={changeUpdatePost}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Post title"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <input
              type="text" name="description" id="description"
              value={Post.description || ''}
              onChange={changeUpdatePost}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Post description"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="image" className="text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text" name="image" id="image"
              value={Post.image || ''}
              onChange={changeUpdatePost}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://..."
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => navigate('/')}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}