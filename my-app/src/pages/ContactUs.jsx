import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import phoneIcon from "../assets/phoneIcon.png";
import mailIcon from "../assets/mailIcon.png";
import axios from 'axios';
<<<<<<< HEAD
=======
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from '../assets/your-animation.json';
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    const { firstName, lastName, email, phone, message } = formData;
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/feedback`, {
        firstName,
        lastName,
        phone,
        email,
        message
      });
=======
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/feedback`, formData);
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
      console.log("Feedback submitted:", res.data);
      alert("Feedback submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

<<<<<<< HEAD
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
        {/* Left Side */}
        <div className="relative w-full h-[500px] md:h-auto rounded-xl overflow-hidden 
                        bg-gradient-to-r from-[#3D3E56] to-[#23244A]">
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="w-full h-full object-contain mix-blend-overlay"
          />

          {/* Black overlay for readability */}
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl p-6 flex flex-col justify-start items-start">
            <h2 className="text-6xl font-bold font-inter mb-4 text-white">
              Contact Us
            </h2>
            <p className="mb-6 text-gray-300 text-lg font-inter">
              Feel free to contact us, we will get back to <br /> you as soon as
              possible
=======
        {/* Left Side */}
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-r from-[#3D3E56] to-[#23244A] shadow-lg ">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: "100%", width: "100%" }}
            className=" opacity-50 "
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl p-4 sm:p-6 flex flex-col justify-start items-start">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-white">Contact Us</h2>
            <p className="mb-4 sm:mb-6 text-base sm:text-lg text-white">
              <b>Feel free to contact us, we’ll get back to you as soon as possible.</b>
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
            </p>

            <div className="space-y-3 text-white">
              <div className="flex items-center gap-2">
                <img src={phoneIcon} alt="phone" className="w-5 h-5" />
                <a href="tel:9876567890" className="hover:underline text-white font-medium">
                  9876567890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <img src={mailIcon} alt="mail" className="w-5 h-5" />
                <a href="mailto:cdc.mmmut@gmail.com" className="text-white hover:underline font-medium">
                  cdc.mmmut@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-md mx-auto md:mx-0 "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-1 font-medium text-white">First Name</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
<<<<<<< HEAD
                className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_22%,_#23244A_74%)] rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium border-2 border-slate-400"
=======
                placeholder="Enter your first name"
                className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-1 font-medium text-white">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
<<<<<<< HEAD
                className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_22%,_#23244A_74%)] rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium border-2 border-slate-400"
=======
                placeholder="Enter your last name"
                className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-white">Email</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
<<<<<<< HEAD
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium border-2 border-slate-400"
=======
              placeholder="Enter your email"
              className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium text-white">Phone Number</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
<<<<<<< HEAD
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium border-2 border-slate-400"
=======
              placeholder="Enter your phone number"
              className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="mb-1 font-medium text-white">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
<<<<<<< HEAD
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium border-2 border-slate-400"
=======
              placeholder="Write your message here"
              className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#6568ff]/80 hover:bg-[#6568ff] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
<<<<<<< HEAD

=======
>>>>>>> d2743205f438d35a849c5dac757c618396c3ff4b
    </div>
  );
};

export default ContactUs;
