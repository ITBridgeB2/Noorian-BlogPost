// pages/Register.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Make sure this file exists

// ✅ Validation schema
const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, phone, email, password } = data;

    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        phone,
        email,
        password,
      });

      alert(res.data.message || "Registered successfully!");
      reset();
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input {...register("name")} placeholder="Name" className="input" />
            <p className="error-message">{errors.name?.message}</p>
          </div>

          <div>
            <input {...register("phone")} placeholder="Phone Number" className="input" />
            <p className="error-message">{errors.phone?.message}</p>
          </div>

          <div>
            <input {...register("email")} placeholder="Email" className="input" />
            <p className="error-message">{errors.email?.message}</p>
          </div>

          <div>
            <input type="password" {...register("password")} placeholder="Password" className="input" />
            <p className="error-message">{errors.password?.message}</p>
          </div>

          <div>
            <input type="password" {...register("confirmPassword")} placeholder="Confirm Password" className="input" />
            <p className="error-message">{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
}
