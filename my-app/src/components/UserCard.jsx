// UserCard.jsx
import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-[#6568FF] bg-opacity-25 border-2 border-[#4c4ca0] rounded-lg shadow-lg text-white p-6 w-1/2 mx-auto mt-10">
      <h2 className="text-center text-xl font-semibold mb-6">
        College: {user.college}
      </h2>
      <div className="flex justify-between mb-4">
        <span>Contact Details: {user.phone}</span>
        <span>Roll Number: {user.rollno}</span>
      </div>
      <div className="flex justify-between">
        <span>Branch: {user.eventProfile?.branch || "N/A"}</span>
        <span>Year: {user.eventProfile?.year || "N/A"}</span>
      </div>
    </div>
  );
};

export default UserCard;
