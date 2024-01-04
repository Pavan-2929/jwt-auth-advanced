import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../components/GoogleAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const selector = useSelector();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
     e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:8000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-200 rounded-lg shadow-md mt-14">
      <h1 className="text-3xl text-center font-semibold my-7 text-gray-800">
        Sign in
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border border-gray-300 p-3 rounded-lg mb-4"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border border-gray-300 p-3 rounded-lg mb-4"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Sign-UP"}
        </button>
        <GoogleAuth/>
      </form>
      <div className="text-center mt-5">
        <div className="flex items-center justify-center">
          <p className="text-gray-600 mr-2">Do not have an account?</p>
          <Link
            to="/sign-up"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
        <p className="text-red-700 font-semibold mt-5">
          {error ? (error.message || "Something went wrong") : ''}
        </p>
      </div>
    </div>
  );
}

export default SignIn;
