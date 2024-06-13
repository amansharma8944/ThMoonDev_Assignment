'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from '@/redux/auth/auth.slice';
import useAuthSession from '../hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';

interface LoginFormInputs {
  username: string;
  password: string;
}

const HomePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const dispatch = useAppDispatch();
  const { user, loading } = useAuthSession();

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(setToken(result.token));
        toast.success('Login successful!');
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <ToastContainer />
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-black">Welcome, {user.username}</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-black">Login</h2>
            <p className='text-black'>for sample login-&gt; <br/>username: admin <br/>   </p>  
            <p className='text-black'>     password: admin
            </p>
            <form onSubmit={handleSubmit(handleLogin)}>
              <input
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
                className="w-full px-4 py-2 mt-4 border rounded-md text-black" 
              />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-4 py-2 mt-4 border rounded-md text-black"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">The hook should be usable like this: </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
