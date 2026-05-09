/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from "react-router";

export default function AddPost(props) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-blue-600">MyBlog</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Add New Post</h1>
          <p className="mt-1 text-sm text-gray-500">Share something with the world</p>
        </div>

        {/* Form */}
        <form onSubmit={props.handlers.handleAddPost} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text" name="title" id="title"
              onChange={props.handlers.changeAddPost}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Post title"
            />
            {props.errors.title && <span className="text-xs text-red-500">{props.errors.title}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <input
              type="text" name="description" id="description"
              onChange={props.handlers.changeAddPost}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="What's on your mind?"
            />
            {props.errors.description && <span className="text-xs text-red-500">{props.errors.description}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="image" className="text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text" name="image" id="image"
              onChange={props.handlers.changeAddPost}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://..."
            />
            {props.errors.image && <span className="text-xs text-red-500">{props.errors.image}</span>}
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
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}