import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/LOGIN/loginimage.png";

import Footer from "../components/Footer";
import { auth, githubProvider, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    college: "",
    rollno: "",
  });


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();

      await axios.post(`${import.meta.env.VITE_SERVER_URL}/firebase-auth/register`, {
        firebaseToken,
        firstName: result.user.displayName?.split(" ")[0] || "",
        lastName: result.user.displayName?.split(" ")[1] || "",
        email: result.user.email,
      });

      console.log("Google login successful:", result.user);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const firebaseToken = await result.user.getIdToken();

      await axios.post(`${import.meta.env.VITE_SERVER_URL}/firebase-auth/register`, {
        firebaseToken,
        firstName: result.user.displayName?.split(" ")[0] || "",
        lastName: result.user.displayName?.split(" ")[1] || "",
        email: result.user.email,
      });

      console.log("GitHub login successful:", result.user);
      navigate("/");
    } catch (err) {
      console.error("GitHub login error:", err);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSignup = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName, phone, college, rollno } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseToken = await userCredential.user.getIdToken(true);
      console.log("Firebase token:", firebaseToken);

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/firebase-auth/register`, {
        firebaseToken,
        firstName,
        lastName,
        phone,
        college,
        rollno,
        email

      });

      console.log("User saved to backend:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message);
    }
  };

  return (
    <>
      <div className="pr-4 pl-4 md:px-5 lg:pr-10 lg:pl-14 flex flex-col-reverse lg:flex-row items-center justify-between gap-4 md:gap-20 xl:gap-40 max-w-[1300px] mx-auto text-white mt-2 mb-12">

        {/* Left - Signup Form */}
        <form onSubmit={handleSignup} className="w-full max-w-[474px] flex-shrink-0 pt-4 space-y-3">

          {/* Mobile heading inside form */}
          <h1 className="block lg:hidden text-4xl font-inter font-bold text-center text-white mt-0 mb-2">
            Welcome!
          </h1>

          {/* Desktop heading */}
          <h1 className="hidden lg:block text-5xl md:text-6xl font-inter font-bold text-center mt-10">
            Welcome!
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-0">
            <div className="w-full">
              <label className="block mb-1 text-base">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full sm:w-[216px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-base">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full sm:w-[216px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-base">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@gmail.com"
              className="w-full h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none  sm:w-[216px]"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter your College Name"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">University Roll Number</label>
            <input
              type="text"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              placeholder="University Roll Number"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-center mt-6 w-full">

            <button
              type="submit"
              className="w-full sm:w-[248px] h-[44px] rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-semibold flex items-center justify-center mx-auto lg:mx-auto"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center my-6 w-full max-w-[474px]">
              <div className="flex-grow h-px bg-gray-500"></div>
              <span className="px-3 text-gray-400 text-sm font-inter">OR SIGN UP WITH</span>
              <div className="flex-grow h-px bg-gray-500"></div>
            </div>

            {/* OAuth buttons */}
            <div className="flex flex-col gap-4 w-full max-w-[474px]">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-medium"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-18.8-1.6-37-4.7-54.7H272v103.7h146.9c-6.3 34.3-25.6 63.3-54.7 82.7v68h88.4c51.8-47.8 80.9-118.4 80.9-199.7z"
                    fill="#4285F4"
                  />
                  <path
                    d="M272 544.3c73.7 0 135.5-24.4 180.6-66.4l-88.4-68c-24.6 16.5-56.4 26-92.2 26-70.9 0-131-47.9-152.5-112.3H27.7v70.9C71.4 475.1 165.4 544.3 272 544.3z"
                    fill="#34A853"
                  />
                  <path
                    d="M119.5 323.6c-10.7-31.4-10.7-65.2 0-96.6V156H27.7c-35.7 71.5-35.7 156.8 0 228.3l91.8-70.7z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M272 107.2c39.9-.6 78.5 14 107.7 41.6l80.9-80.9C417.5 23.9 347.1-1 272 0 165.4 0 71.4 69.2 27.7 156l91.8 70.9C141 155 201.1 107.2 272 107.2z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.7-.8 1.7-.8.1-.9.4-1.5.7-1.8-2.5-.3-5.1-1.2-5.1-5.3 0-1.2.4-2.2 1.1-3.1-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3.1 1.2.9-.3 2-.5 3-.5s2.1.2 3 .5c2.2-1.5 3.1-1.2 3.1-1.2.6 1.7.2 2.9.1 3.2.7.9 1.1 2 1.1 3.1 0 4.1-2.6 5-5.1 5.3.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.2 21.4 24 17 24 12c0-6.27-5.23-11.5-12-11.5z" />
                </svg>
                Continue with GitHub
              </button>

              <p className="text-[16px] sm:text-[23px] mb-4 text-center font-inter px-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#6568FF] hover:underline cursor-pointer font-inter"
                >
                  Login
                </Link>
              </p>
            </div>

          </div>

        </form>

        {/* Right - Image */}
        <div className="w-full flex flex-col items-center justify-center flex-grow mt-2 lg:mt-0 gap-6">
          <img
            src={signupImage}
            alt="Signup"
            className="w-full max-w-[552px] h-auto object-contain rounded-xl m-0"
          />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
