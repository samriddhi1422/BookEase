import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginStart,loginFailure,loginSuccess, } from '../../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function Login() {
    const[state,setState] = useState('Admin')
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
     console.log("Login button clicked "); 
    dispatch(loginStart());

    try {
      if(state=='Admin'){
  const res = await fetch('https://bookease-backend-ju5w.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log("Response status:", res.status); 
    const data = await res.json();
    console.log("Response data:", data); 

     
      if (!res.ok) throw new Error(data.message);

      dispatch(loginSuccess({ user: data.admin, token: data.token }));
      if (data.success) {
  dispatch(loginSuccess({ user: data.admin, token: data.token }));
  localStorage.setItem('token', data.token);
  navigate('/'); 
} else {
  dispatch(loginFailure(data.message));
  toast.error(data.message)
}
      }
      else{
         const res = await fetch('https://bookease-backend-ju5w.onrender.com/api/doctor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log("Response status:", res.status); 
    const data = await res.json();  
    console.log("Response data:", data); 

     
      if (!res.ok) throw new Error(data.message);

     dispatch(loginSuccess({ user: data.doctor, token: data.token }));

      if (data.success) {
dispatch(loginSuccess({ user: data.doctor, token: data.token }));
  localStorage.setItem('dtoken', data.token);
  navigate('/doctor/dashboard'); 
} else {
  dispatch(loginFailure(data.message));
  toast.error(data.message)
}
      }
     
    
    } catch (err) {
          console.error("Error during login:", err)
      dispatch(loginFailure(err.message));
    }
  };

    
  return (
    <div>
         <div className="min-h-screen flex items-center justify-center bg-blue-50">
             <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border border-blue-100">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                   <span className='text-blue-500'>{state}</span> Login
        </h2>
  <form onSubmit={handleLogin}>
 
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
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
              Password
            </label>
            <input
              type="password"
               value={password}
          onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 "
              placeholder="••••••••"
              required
            />
          </div>
           <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition mt-5"
          >
          {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {state=== 'Admin' ? <p className='text-center text-sm text-blue-700 mt-5'>Doctor Login ? <span className="text-gray-500 font-medium hover:underline cursor-pointer" onClick={()=>setState('Doctor')}>Click Here</span></p>
          : <p className='text-center text-sm text-blue-700 mt-5'>Admin Login ? <span className="text-gray-500 font-medium hover:underline cursor-pointer" onClick={()=>setState('Admin')}>Click Here</span></p>}
          
  </form>
       
  </div>
    </div>
    </div>
  )
}

export default Login