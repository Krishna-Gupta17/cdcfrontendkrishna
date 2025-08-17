// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import phoneIcon from "../assets/phoneIcon.png";
// import mailIcon from "../assets/mailIcon.png";
// import axios from 'axios';
// import { Player } from "@lottiefiles/react-lottie-player";
// import animationData from '../assets/your-animation.json';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/feedback`, formData);
//       console.log("Feedback submitted:", res.data);
//       alert("Feedback submitted successfully!");
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         message: "",
//       });
//     } catch (err) {
//       console.error("Error submitting feedback:", err);
//       alert("Failed to submit feedback. Please try again later.");
//     }
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

//         {/* Left Side */}
//         <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-r from-[#3D3E56] to-[#23244A] shadow-lg ">
//           <Player
//             autoplay
//             loop
//             src={animationData}
//             style={{ height: "100%", width: "100%" }}
//             className=" opacity-50 "
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl p-4 sm:p-6 flex flex-col justify-start items-start">
//             <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-white">Contact Us</h2>
//             <p className="mb-4 sm:mb-6 text-base sm:text-lg text-white">
//               <b>Feel free to contact us, we’ll get back to you as soon as possible.</b>
//             </p>

//             <div className="space-y-3 text-white">
//               <div className="flex items-center gap-2">
//                 <img src={phoneIcon} alt="phone" className="w-5 h-5" />
//                 <a href="tel:9876567890" className="hover:underline text-white font-medium">
//                   9876567890
//                 </a>
//               </div>
//               <div className="flex items-center gap-2">
//                 <img src={mailIcon} alt="mail" className="w-5 h-5" />
//                 <a href="mailto:cdc.mmmut@gmail.com" className="text-white hover:underline font-medium">
//                   cdc.mmmut@gmail.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 w-full max-w-md mx-auto md:mx-0 "
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="flex flex-col">
//               <label htmlFor="firstName" className="mb-1 font-medium text-white">First Name</label>
//               <input
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your first name"
//                 className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label htmlFor="lastName" className="mb-1 font-medium text-white">Last Name</label>
//               <input
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your last name"
//                 className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="email" className="mb-1 font-medium text-white">Email</label>
//             <input
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               type="email"
//               placeholder="Enter your email"
//               className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="phone" className="mb-1 font-medium text-white">Phone Number</label>
//             <input
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               type="tel"
//               placeholder="Enter your phone number"
//               className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="message" className="mb-1 font-medium text-white">Message</label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="5"
//               placeholder="Write your message here"
//               className="bg-[#2b2d42] border border-[#444] rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:border-[#6568ff] focus:ring-2 focus:ring-[#6568ff]/30 outline-none transition"
//             ></textarea>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-[#6568ff]/80 hover:bg-[#6568ff] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import axios from "axios"; 
import { FaWhatsapp, FaTelegramPlane, FaDiscord } from "react-icons/fa";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import contactpage from "../assets/contact/contactpage.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/feedback`,
        formData
      );
      console.log("Feedback submitted:", res.data);
      alert("Feedback submitted successfully!");
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Get in
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}Touch
              </span> With Us.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Have questions or need assistance? Feel free to reach out to us via the form below or connect with us on WhatsApp and Telegram for quick responses. We’re here to help!
            </p>
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <img
              src={contactpage}
              alt="Developer coding"
              className="relative w-full h-56 object-cover rounded-2xl border border-gray-700/50"
            />
          </div>

        {/* Contact Cards */}
<div className="grid md:grid-cols-3 gap-4">
  {[
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "+91 6386532383",
      href: "https://api.whatsapp.com/send/?phone=6386532383&text&type=phone_number&app_absent=0",
    },
    {
      icon: FaTelegramPlane,
      title: "Telegram",
      value: "CDC - Support",
      href: "https://t.me/+uRatnueLZQRlMzk1",
    },
    {
      icon: FaDiscord,
      title: "Discord",
      value: "Coders and Developers Club",
      href: "https://discord.gg/KaDf3ZYahy",
    },
  ].map((contact, index) => (
    <a
      key={index}
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/50"
    >
      <contact.icon
        className="text-blue-400 group-hover:text-blue-300 mb-2"
        size={24}
      />
      <p className="text-sm text-gray-400 mb-1">{contact.title}</p>
      <p className="text-white font-medium group-hover:text-blue-300 transition-colors duration-200">
        {contact.value}
      </p>
    </a>
  ))}
</div>

        </div>

        {/* Right Side - Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              Contact Us
            </h2>
            <p className="text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-300">
                Thanks for reaching out. We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  icon={User}
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  required
                />
                <InputField
                  icon={User}
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <InputField
                icon={Mail}
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />

              <InputField
                icon={Phone}
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />

              <TextAreaField
                icon={MessageSquare}
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project..."
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        {...props}
        className="w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
      />
    </div>
  </div>
);

const TextAreaField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-4 text-gray-400" size={18} />
      <textarea
        {...props}
        rows={4}
        className="w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 resize-none"
      ></textarea>
    </div>
  </div>
);

export default ContactUs;
