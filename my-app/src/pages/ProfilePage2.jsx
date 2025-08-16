import React from "react";
import AtalBhawan from "../assets/atalbhawan.jpg";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    totalEvents: 5,
    completed: 2,
    upcoming: 3,
  });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEdit = () => {
    setEditMode(true);
  };

  const [editableUser, setEditableUser] = useState({
    username: "",
    rollno: "",
    email: "",
    college: "",
  });


  const handleSave = async () => {
    setEditMode(false);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true);
      // const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/user/profile`,
       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/user/profile`,
        editableUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (res.data.success) {
        alert("Profile updated successfully!");
        setUser(res.data.data);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating.");
    }
  };


  const handleLogout = () => {
    const auth = getAuth();

    signOut(auth)
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleChange = (field, value) => {
    setEditableUser((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(true);
          console.log("Token:", token);
          const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/profile`, {
            // const res = await axios.get('http://localhost:4200/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res);

          if (res.data.success) {
            setUser(res.data.user);
            setEditableUser({
              username: res.data.user.username,
              rollno: res.data.user.rollno,
              email: res.data.user.email,
              college: res.data.user.college,
              phone: res.data.user.phone
            });


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
    <div className="flex justify-center px-4 mt-8 mb-12">

      <div className="w-full max-w-4xl rounded-2xl text-white font-sans shadow-2xl overflow-hidden relative">

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex space-x-3">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-sm px-4 py-1 rounded-md border border-white/20"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-md"
            >
              Edit Profile
            </button>

          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-sm px-4 py-1 rounded-md"
          >
            Logout
          </button>

          {user.role === "admin" && (
            <Link to={"/admin"} >
              <p className="text-white">ADMINpage</p>
            </Link>
          )}
        </div>


        {/* Background Banner */}
        <div className="relative w-full h-52">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${AtalBhawan})` }}
          ></div>

          {/* Profile Icon */}
          <div className="absolute left-10 bottom-[-3rem] w-32 h-32 rounded-full border-4 border-white bg-white/10 flex items-center justify-center shadow-md backdrop-blur">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
          <div className="flex pt-20 px-10 gap-10 items-start">
            <div className="w-32" />
            <div className="flex flex-col justify-center w-full max-w-lg">
              {editMode ? (
                <>
                  {/* <input
                  className="text-3xl font-bold bg-transparent border-b border-white/30 mb-2 outline-none"
                  value={editableUser.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                /> */}
                  <h2 className="text-3xl font-bold">{user.username}</h2>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-300 mb-1">Roll Number</label>
                    <input
                      className="mt-1 bg-green-700 px-3 py-1 rounded-md text-base font-medium max-w-fit outline-none"
                      value={editableUser.rollno}
                      onChange={(e) => handleChange("rollno", e.target.value)}
                    />
                  </div>
                  {/* <input
                  className="mt-4 text-lg bg-transparent border-b border-white/20 outline-none"
                  value={editableUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                /> */}
                <div className="flex items-baseline gap-4">
                  <label className="text-sm text-gray-300 mb-1">Phone</label>
                  <input
                    className="mt-4 text-lg bg-transparent border-b border-white/20 outline-none"
                    value={editableUser.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
                <div className="flex items-baseline gap-4">
                  <label className="text-sm text-gray-300 mb-1">College</label>
                  <input
                    className="mt-1 text-md text-gray-300 bg-transparent border-b border-white/10 outline-none"
                    value={editableUser.college}
                    onChange={(e) => handleChange("college", e.target.value)}
                  />
                </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold">{user.username}</h2>
                  <p className="mt-2 bg-green-700 px-3 py-1 rounded-md text-base font-medium max-w-fit">
                    Roll No: {user.rollno}
                  </p>
                  <p className="mt-4 text-lg">{user.email}</p>
                  <p className="mt-4 text-lg">{user.phone}</p>
                  <p className="text-md text-gray-300">{user.college}</p>
                </>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 mt-10 text-center border-t border-white/20 pt-6 px-10 pb-10">
            <div>
              <p className="text-sm text-gray-400">Total Events</p>
              <p className="text-2xl font-semibold">{profile.totalEvents}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-semibold">{profile.completed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Upcoming</p>
              <p className="text-2xl font-semibold">{profile.upcoming}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
