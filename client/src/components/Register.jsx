/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from "react-router";

export default function Register(props) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-blue-600">MyBlog</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="mt-1 text-sm text-gray-500">Join us today</p>
        </div>
        <form onSubmit={props.handlers.handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text" name="name" id="name"
              onChange={props.handlers.changeRegister}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Your full name"
            />
            {props.errors.name && <span className="text-xs text-red-500">{props.errors.name}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" name="email" id="email"
              onChange={props.handlers.changeRegister}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
            {props.errors.email && <span className="text-xs text-red-500">{props.errors.email}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password" name="password" id="password"
              onChange={props.handlers.changeRegister}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            {props.errors.password && <span className="text-xs text-red-500">{props.errors.password}</span>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password" name="confirmPassword" id="confirmPassword"
              onChange={props.handlers.changeRegister}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            {props.errors.confirmPassword && <span className="text-xs text-red-500">{props.errors.confirmPassword}</span>}
          </div>
          <button
            type="submit"
            onClick={() => navigate('/')}
            className="mt-2 w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}