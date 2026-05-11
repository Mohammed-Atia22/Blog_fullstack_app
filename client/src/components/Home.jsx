/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from "react-router";
import Post from './Post';

export default function Home(props) {
  const navigate = useNavigate();
  const posts = props.data;
  const handleDeletePost = props.handlers.handleDeletePost;
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const visiblePosts = posts.slice(start, end);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600 tracking-tight">MyBlog</span>
        <div>
          {props.name ? (
            <span className="text-sm text-gray-600 font-medium">Hello, <span className="text-blue-600">{props.name}</span></span>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visiblePosts.map((post, index) => (
            <Post token={props.token} key={index} name={props.name} data={post} handlers={{ handleDeletePost }} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </main>
      {localStorage.getItem("token")&&<button
        onClick={() => navigate('/addPost')}
        className="fixed bottom-6 right-6 px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
      >
        + Add Post
      </button>}
    </div>
  );
}