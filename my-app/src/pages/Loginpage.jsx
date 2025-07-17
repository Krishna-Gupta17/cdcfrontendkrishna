import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginimage from "../assets/LOGIN/loginimage.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import { auth, githubProvider, googleProvider } from '../firebase.js';
import { setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

   const getUserToken = async () => {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken(true);  // true forces token refresh
          console.log("Firebase Token:", token);
          return token;
        } else {
          console.log("No user is logged in");
          return null;
        }
      };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await userCredential.user.getIdToken(true);

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/firebase-auth/login`, {
        firebaseToken
      });

      console.log("User logged in:", res.data);
      getUserToken();

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };



  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
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
      await setPersistence(auth, browserLocalPersistence);
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

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14 max-w-[1200px] mx-auto pb-16 pt-12 px-4 sm:px-6">
        {/* Image Section */}
        <div className="order-1 lg:order-2 flex-1 flex justify-center mb-8 lg:mb-0">
          <img
            src={loginimage}
            alt="Login"
            className="
      w-auto
      h-auto
      max-w-full
      lg:max-w-[600px]
      lg:h-[420px]
      md:max-w-[450px]
      md:h-[320px]
      sm:max-w-[300px]
      sm:h-[220px]
      object-contain
      rounded-xl
      px-4
      pb-6
    "
          />
        </div>


        {/* Form Section */}
        <div className="order-2 lg:order-1 flex flex-col items-center flex-1 w-full max-w-[500px] text-white">
          {/* Large Screen Heading */}
          <h1 className="hidden lg:block text-4xl md:text-6xl font-bold mb-6 text-center font-inter">
            Welcome!
          </h1>

          <div className="w-full max-w-[386px] flex flex-col">
            {/* Small Screen Heading */}
            <h1 className="block lg:hidden text-4xl sm:text-5xl font-bold text-center text-white mb-10 font-inter">
              Welcome!
            </h1>

            {/* Email */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <label className="block mb-2 text-gray-400 text-[18px] sm:text-[23px] font-inter">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-[44px] sm:h-[48px] text-[16px] sm:text-[18px] px-4 py-2 rounded-lg text-white placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <label className="block mb-2 text-gray-400 text-[18px] sm:text-[23px] font-inter font-light">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-[44px] sm:h-[48px] px-4 py-2 rounded-lg text-white placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none pr-10 text-[16px] sm:text-[18px]"
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <p className="text-gray-400 mb-4 px-2 sm:px-4 text-start hover:underline cursor-pointer font-sans italic text-[16px] sm:text-[20px]">
              Forgot your Password?
            </p>

            {/* Sign Up */}
            <p className="text-[16px] sm:text-[23px] mb-4 text-center font-inter px-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#6568FF] hover:underline cursor-pointer font-inter"
              >
                SignUp
              </Link>
            </p>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full sm:w-[248px] h-[40px] sm:h-[44px] rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-semibold uppercase flex items-center justify-center mx-auto text-[14px] sm:text-[16px]"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center my-6 sm:my-8 w-full max-w-[386px] mx-auto">
              <div className="flex-grow h-px bg-gray-500"></div>
              <span className="px-2 sm:px-3 text-gray-400 text-xs sm:text-sm font-inter">
                OR LOGIN WITH
              </span>
              <div className="flex-grow h-px bg-gray-500"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-[386px] mx-auto px-2 sm:px-0">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 sm:gap-3 w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-medium text-[14px] sm:text-[16px]"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-2 sm:gap-3 w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-medium text-[14px] sm:text-[16px]"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.7-.8 1.7-.8.1-.9.4-1.5.7-1.8-2.5-.3-5.1-1.2-5.1-5.3 0-1.2.4-2.2 1.1-3.1-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3.1 1.2.9-.3 2-.5 3-.5s2.1.2 3 .5c2.2-1.5 3.1-1.2 3.1-1.2.6 1.7.2 2.9.1 3.2.7.9 1.1 2 1.1 3.1 0 4.1-2.6 5-5.1 5.3.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.2 21.4 24 17 24 12c0-6.27-5.23-11.5-12-11.5z" />
                </svg>
                Continue with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
