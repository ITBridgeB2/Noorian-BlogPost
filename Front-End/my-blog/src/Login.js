// pages/Login.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// ✅ Validation schema
const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      alert(response.data.message || 'Login successful');
      navigate('/blogpost');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      alert(errorMsg);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email')}
              placeholder="Email"
              type="email"
              className="input-field"
            />
            <p className="error-text">{errors.email?.message}</p>
          </div>
          <div>
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="input-field"
            />
            <p className="error-text">{errors.password?.message}</p>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
