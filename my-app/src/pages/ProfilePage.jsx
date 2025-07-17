import React from "react";
import Footer from "../components/Footer";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(true);
          console.log("Token:", token);
          const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res)
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            console.warn("Backend did not return success");
          }
        } catch (error) {
          console.error("Error in fetchUserData:", error);
        }
      }
      else {
        console.log("No user is signed in");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading your profile...</div>;

  if (!user)
    return <div className="text-white text-center mt-10">Please log in to view your profile.</div>;

  return (
    <div>
      <div className="min-h-screen w-full text-white px-4 py-8 md:px-8 lg:px-16 font-inter">

        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Welcome,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6568FF] to-[#9A5FFF]">
            {user ? user.username : "Guest"}
          </span>
        </h1>
        <button onClick={handleLogout}>
          LOGOUT
        </button>

        {user.role === "admin" &&(
          <Link to={"/admin"} >
            <p className="text-white">ADMINpage</p>
          </Link>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="sm:col-span-2 flex flex-col items-center justify-center p-6 bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl min-h-[160px]">
            <UserIcon className="w-20 h-20 text-white mb-3" />
            <h2 className="text-3xl font-bold"> {user ? user.username : "Guest"}</h2>
          </div>


          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl min-h-[160px]">
            <PhoneIcon className="w-8 h-8 text-blue-300 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-400 text-base">Contact</p>
              <p className="text-lg font-medium break-words">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl min-h-[160px]">
            <EnvelopeIcon className="w-8 h-8 text-purple-300 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-400 text-base">Email</p>
              <p className="text-lg font-medium break-words">
                {user.email}
              </p>
            </div>
          </div>


          <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl min-h-[160px]">
            <IdentificationIcon className="w-8 h-8 text-cyan-300 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-400 text-base">Roll No.</p>
              <p className="text-lg font-medium break-words">{user.rollno}</p>
            </div>
          </div>

          <div className="lg:col-span-1 flex items-center gap-4 p-5 bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl min-h-[160px]">
            <BuildingLibraryIcon className="w-8 h-8 text-blue-300 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-400 text-base">College</p>
              <p className="text-lg font-medium break-words">
                {user.college}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl p-6 flex flex-col justify-center items-center min-h-[160px]">
            <ChartBarIcon className="w-10 h-10 text-green-400 mb-2" />
            <h3 className="text-xl font-semibold text-white text-center">
              Total Events
            </h3>
            <p className="text-2xl font-bold text-white mt-2">5</p>
          </div>


          <div className="bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl p-6 flex flex-col justify-center items-center min-h-[160px]">
            <CalendarDaysIcon className="w-10 h-10 text-orange-400 mb-2" />
            <h3 className="text-xl font-semibold text-white text-center">
              Upcoming Events
            </h3>
            <p className="text-2xl font-bold text-white mt-2">2</p>
          </div>

          <div className="bg-gradient-to-r from-[#47446A] to-[#2F2C58] rounded-xl p-6 flex flex-col justify-center items-center min-h-[160px]">
            <CheckCircleIcon className="w-10 h-10 text-red-400 mb-2" />
            <h3 className="text-xl font-semibold text-white text-center">
              Completed Events
            </h3>
            <p className="text-2xl font-bold text-white mt-2">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
