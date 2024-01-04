import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false)
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(true);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-200 rounded-lg shadow-md mt-14">
      <h1 className="text-3xl text-center font-semibold my-7 text-gray-800">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border border-gray-300 p-3 rounded-lg mb-4"
          onChange={handleChange}
        />
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
      </form>
      <div className="text-center mt-5">
        <div className="flex items-center justify-center">
          <p className="text-gray-600 mr-2">Have an account?</p>
          <Link
            to="/sign-in"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>
        {error && (
          <div className="mt-3">
            <p className="text-red-500 font-semibold">Something went wrong</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
