import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import contactImg from "../assets/Rectangle.png";
import phoneIcon from "../assets/phoneIcon.png";
import mailIcon from "../assets/mailIcon.png";
import { useState } from "react";
import axios from 'axios';


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

    const { firstName, lastName, email, phone, message } = formData;
    try{

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/feedback`, {
        firstName,
        lastName,
        phone,
        email, 
        message
      });
      console.log("Feedback submitted:", res.data);
      alert("Feedback submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });
    }
    catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen">


      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
        {/* Left Side */}
        <div className="relative w-full h-[500px] md:h-auto rounded-xl overflow-hidden">
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="w-full h-full object-cover mr-10 py-[3.8vw]"
          />

          <div className="absolute inset-0 bg-black bg-opacity-0 rounded-xl p-6 flex flex-col justify-start items-start">
            <h2 className="text-6xl font-bold font-inter mb-4 text-white">
              Contact Us
            </h2>
            <p className="mb-6 text-gray-300 text-lg font-inter">
              Feel free to contact us, we will get back to <br /> you as soon as
              possible
            </p>
            <br />

            <div className="space-y-3 text-base text-white">
              <div className="flex items-center gap-2">
                <img
                  src={phoneIcon}
                  alt="phone Icon"
                  className="w-6 h-5 mr-2"
                />
                <a
                  href="tel:9876567890"
                  className="text-gray-300 hover:underline font-inter"
                >
                  9876567890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={mailIcon}
                  alt="mail Icon"
                  className="w-6 h-6 mr-2"
                />
                <a
                  href="mailto:cdc.mmmut@gmail.com"
                  className="text-gray-300 hover:underline font-inter"
                >
                  cdc.mmmut@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid for First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="firstName"
                className="text-lg font-medium font-inter text-white mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder=""
                className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_22%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="lastName"
                className="text-lg font-medium font-inter text-white mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder=""
                className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_22%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="text-lg font-medium font-inter text-white mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder=""
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="phone"
              className="text-lg font-medium font-inter text-white mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="number"
              placeholder=""
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="message"
              className="text-lg font-medium font-inter text-white mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder=""
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
            ></textarea>
          </div>


          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[160px] md:w-[190px] h-[40px] md:h-[30px] bg-[#6568ff]/30 hover:bg-[#6568ff]/60 text-white font-bold py-2 md:py-3.5 px-4 md:px-0 rounded-lg border-2 border-[#6568ff]/50 transition duration-300 font-inter text-xl md:text-xl flex items-center justify-center"
            >
              Submit
            </button>
          </div>


        </form>
      </div>


    </div>
  );
};

export default ContactUs;
