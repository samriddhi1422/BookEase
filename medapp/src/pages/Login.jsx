import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginStart,loginFailure,loginSuccess, }from '../slice/authSlice';

function Login() {
  const[state, setState]= useState('signUp');
  const[email , setEmail] = useState('')
  const[name , setName] = useState('')
  const[password , setPassword] = useState('')
  const dispatch = useDispatch();
const navigate = useNavigate();

 
  const handleRegister = async (e) => {
      e.preventDefault();
       console.log("Login button clicked "); 
      dispatch(loginStart());
  if(state=='signUp'){
    try {
       
        const res = await fetch('http://localhost:4000/api/patient/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password ,name}),
        });
        console.log("Response status:", res.status); 
      const data = await res.json();
      console.log("Response data:", data); 
  
       
        if (!res.ok) throw new Error(data.message);
  
       
        if (data.success) {
   dispatch(loginSuccess({ user: data.user, token: data.token }));
    localStorage.setItem('token', data.token);
    navigate('/'); 
    window.location.reload();
  } else {
    dispatch(loginFailure(data.message));
    toast.error(data.message)
  }
  
      } 
      
       catch (err) {
       toast.error(err.message)
            console.error("Error during login:", err)
        dispatch(loginFailure(err.message));
      }

  }
     

  if(state!='signUp'){
    try {
    const res = await fetch("http://localhost:4000/api/patient/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login Response:", data);

    if (!res.ok || data.success === false) {
      toast.error(data.message);
      dispatch(loginFailure(data.message));
      return;
    }

    dispatch(loginSuccess({ user: data.user, token: data.token }));
    localStorage.setItem("token", data.token);
    toast.success("Login successful!");
    navigate("/");
  } catch (err) {
    toast.error("Login failed");
    dispatch(loginFailure(err.message));
  }
  }
    };
  
  
  return (
   <div className="min-h-screen flex items-center justify-center bg-blue-50">
   
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          {state === 'signUp' ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          {state === 'signUp' ? "Please Signup to Create Account" : "Login To Book Appointments"}
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
            {state === 'signUp' &&
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
            }
          

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
          {state === 'signUp' ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
         
          {state === 'signUp'
          
           ?<p> Already have and account ? <span  className="text-blue-700 font-medium hover:underline cursor-pointer" onClick={()=> setState('login')}>Login here</span> </p>  
           :<p> Don't have an account ? <span  className="text-blue-700 font-medium hover:underline cursor-pointer" onClick={()=> setState('signUp')}>Create One</span> </p>  
        }
        </p>
      </div>
    </div>
  )
}

export default Login