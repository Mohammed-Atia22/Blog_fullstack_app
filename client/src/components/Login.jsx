/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from "react-router";

export default function Login(props) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-blue-600">MyBlog</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={props.handlers.handleLogin} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" name="email" id="email"
              onChange={props.handlers.changeLogin}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
            {props.errors.email && <span className="text-xs text-red-500">{props.errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password" name="password" id="password"
              onChange={props.handlers.changeLogin}
              className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            {props.errors.password && <span className="text-xs text-red-500">{props.errors.password}</span>}
          </div>

          <button
            type="submit"
            onClick={() => navigate('/')}
            className="mt-2 w-full py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}