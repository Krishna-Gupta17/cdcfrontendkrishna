import React, { useState } from 'react';
import Eventregimage from "../assets/EventRegisteration/eventreg.png";
import API from '../api';
import { auth } from '../firebase'

const initialMember = {
  name: '',
  email: '',
  phone: '',
  roll: '',
  codeforces: '',
};

export default function EventRegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    leader: { ...initialMember },
    teammate1: { ...initialMember },
    teammate2: { ...initialMember },
    payment: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      const res = await API.post('/api/register', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data.success) throw new Error('Registration failed');
      alert('Registration successful!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col justify-between bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto flex flex-col gap-8 bg-black bg-opacity-40 p-8 rounded-xl shadow-xl backdrop-blur-lg"
        >

          <div className="flex flex-row justify-center items-center items-start gap-4 md:gap-10 flex-wrap md:flex-nowrap">

            <div className="flex-shrink-0 flex justify-center">
              <img
                src={Eventregimage}
                alt="Event poster"
                className="w-32 sm:w-40 md:w-52 rounded-xl shadow-2xl"
              />
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center ">
              <h2 className="text-2xl md:text-3xl font-bold">Register Here</h2>
              <div className="w-full max-w-md border border-gray-600 bg-black bg-opacity-30 p-6 rounded-xl shadow-md space-y-4">
                <label htmlFor="name" className="block font-semibold text-left mb-1">Team Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your team name"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Members */}
          <MemberSection title="Leader" sectionKey="leader" member={formData.leader} handleChange={handleChange} />
          <MemberSection title="Teammate 1" sectionKey="teammate1" member={formData.teammate1} handleChange={handleChange} />
          <MemberSection title="Teammate 2" sectionKey="teammate2" member={formData.teammate2} handleChange={handleChange} />

          {/* Payment */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Input label="Payment Reference / Amount" name="payment" value={formData.payment} onChange={handleChange} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}

const MemberSection = ({ title, sectionKey, member, handleChange }) => (
  <fieldset className="border border-gray-600 bg-black bg-opacity-30 p-6 rounded-xl shadow-md space-y-4">
    <legend className="text-lg font-semibold px-2">{title}</legend>
    <div className="grid md:grid-cols-2 gap-4">
      <Input label="Name" name={`${sectionKey}.name`} value={member.name} onChange={handleChange} />
      <Input label="Email" name={`${sectionKey}.email`} type="email" value={member.email} onChange={handleChange} />
      <Input label="Phone No" name={`${sectionKey}.phone`} value={member.phone} onChange={handleChange} />
      <Input label="University Roll No" name={`${sectionKey}.roll`} value={member.roll} onChange={handleChange} />
      <Input label="Codeforces ID" name={`${sectionKey}.codeforces`} value={member.codeforces} onChange={handleChange} />
    </div>
  </fieldset>
);

const Input = ({ label, name, type = 'text', value, onChange }) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={name} className="text-sm font-medium">{label}</label>
    <input                    rows="3"
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      required
    />
  </div>
);
