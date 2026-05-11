/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from "react-router";

export default function Post({ data, handlers, name, token }) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 items-start p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all">
      <img
        src={data.image}
        alt={data.title}
        className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
          {data.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
          {data.description}
        </p>
        {name && (
          <span className="text-xs text-blue-500 font-medium">{name}</span>
        )}
      </div>
      {token && <div className="flex flex-col gap-1.5 flex-shrink-0">
        <button
          aria-label="Edit post"
          onClick={() => navigate('/updatePost/' + data.id)}
          className="p-1.5 text-gray-400 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
          </svg>
        </button>
        <button
          aria-label="Delete post"
          onClick={() => handlers.handleDeletePost(data.id)}
          className="p-1.5 text-red-400 border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>}
    </div>
  );
}