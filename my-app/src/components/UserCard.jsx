import React from 'react';

const UserCard = () => {
  return (
    <div className="bg-[#6568FF] bg-opacity-25 border-2 border-[#4c4ca0] rounded-lg shadow-lg text-white p-6 w-1/2 mx-auto mt-10">
      <h2 className="text-center text-xl font-semibold mb-6">College: mmmut gkp</h2>
      <div className="flex justify-between mb-4">
        <span>Contact Details: 1234567890</span>
        <span>Roll Number: 2024021000</span>
      </div>
      <div className="flex justify-between">
        <span>Branch: CSE</span>
        <span>Year: 2028</span>
      </div>
    </div>
  );
};

export default UserCard;
