/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import "./index.css";
import Home from './components/Home.jsx'
import { Routes, Route } from "react-router";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AddPost from './components/AddPost.jsx';
import UpdatePost from './components/UpdatePost.jsx';
import axios from "axios";

function App() {
  let name = '';
  const [content, setContent] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const fetchPosts = () => {
    axios.get("http://localhost:5000/api/data/posts")
      .then(res => setContent(res.data.posts))
      .catch(err => console.error("Failed to fetch posts:", err));
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/auth/signup", registerData)
      .then(res => {
        console.log("Registered:", res.data);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        localStorage.setItem("name", res.data.user.name);
      })
      .catch(err => {
        console.error("Register error:", err.response?.data?.message || err.message);
      });
  };

  const [registerErrors, setRegisterErrors] = useState({name: "",email: "",password: "",confirmPassword: ""});
  const changeRegister = (e) => {
    const { name, value } = e.target;
    if(name === 'name' && value.length < 5){
      setRegisterErrors(prev => ({...prev, [name]: 'Name must be at least 5 characters long'}));
    } else if(name === 'password' && value.length < 5){
      setRegisterErrors(prev => ({...prev, [name]: 'Password must be at least 5 characters long'}));
    } else if(name === 'confirmPassword' && value !== registerData.password){
      setRegisterErrors(prev => ({...prev, [name]: 'Passwords do not match'}));
    } else {
      setRegisterErrors(prev => ({...prev, [name]: ''}));
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/auth/login", loginData)
      .then(res => {
        console.log("Logged in:", res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        setToken(res.data.token);
      })
      .catch(err => {
        console.error("Login error:", err.response?.data?.message || err.message);
      });
  };

  const [loginErrors, setLoginErrors] = useState({email: "", password: ""});
  const changeLogin = (e) => {
    const { name, value } = e.target;
    if(name === 'email' && !/\S+@\S+\.\S+/.test(value)){
      setLoginErrors(prev => ({...prev, [name]: 'Invalid email format'}));
    } else if(name === 'password' && value.length < 5){
      setLoginErrors(prev => ({...prev, [name]: 'Password must be at least 5 characters long'}));
    } else {
      setLoginErrors(prev => ({...prev, [name]: ''}));
      setLoginData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDeletePost = (id)=>{
    const token = localStorage.getItem("token");
    axios.delete(`http://localhost:5000/api/data/posts/${id}`,{headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
      console.log("Deleted:", res.data);
      setContent(prev => prev.filter(post => post.id !== id));
    })
    .catch(err => {
      console.error("Delete error:", err.response?.data?.message || err.message);
    });
  }

  const handleAddPost = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios.post(`http://localhost:5000/api/data/posts`,post,{headers: {Authorization: `Bearer ${token}`}})
    .then(res => setContent(prev => [...prev, res.data.post]))
    .catch(error => console.log(error));
  };

  const [addPostErrors, setAddPostErrors] = useState({title: "", description: "", image: ""});
  const changeAddPost = (e) => {
    const { name, value } = e.target;
    if(name === 'title' && value.length < 5){
      setAddPostErrors(prev => ({...prev, [name]: 'Title must be at least 5 characters long'}));
    } else if(name === 'description' && value.length < 50){
      setAddPostErrors(prev => ({...prev, [name]: 'Description must be at least 10 characters long'}));
    // } else if(name === 'image' && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(value)){
    //   setAddPostErrors(prev => ({...prev, [name]: 'Image must be a valid URL ending with .jpg, .jpeg, .png, or .gif'}));
    } else {
      setAddPostErrors(prev => ({...prev, [name]: ''}));
      setPost(prev => ({ ...prev, [name]: value }));
    }
  };
  
  return (
    <Routes>
    <Route path="/" element={<Home fetchPosts={fetchPosts}  token={token} name={localStorage.getItem('name')} data={content} handlers={{handleDeletePost}} />} />
      <Route
        path="/login"
        element={<Login fetchPosts={fetchPosts} handlers={{ handleLogin, changeLogin }} errors={loginErrors} />}
      />
      <Route
        path="/register"
        element={<Register fetchPosts={fetchPosts} handlers={{ handleRegister, changeRegister }} errors={registerErrors} />}
      />
      <Route path='/addPost' element={<AddPost fetchPosts={fetchPosts} handlers={{handleAddPost, changeAddPost }} errors={addPostErrors} />} />
      <Route path='/updatePost/:id' element={<UpdatePost fetchPosts={fetchPosts}/>} />
    </Routes>
  );
}

export default App;