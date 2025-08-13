// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Crown, Mail, Code, Edit3, Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

function Dashboard() {
  const [teamName, setTeamName] = useState("");
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [eventDetails] = useState({
    name: "ACM ICPC Regional Contest",
    date: "March 15, 2025",
    location: "Tech University",
    duration: "5 Hours"
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const fetchTeam = async (token) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setUser(res.data.leaderId);
          setTeamName(res.data.name || "");

          const membersArr = [
            {
              id: res.data.leaderId._id,
              name: `${res.data.leaderId.firstName} ${res.data.leaderId.lastName}`,
              email: res.data.leaderId.email,
              codeforcesId: res.data.leaderId.eventProfile?.codeforcesId || "",
              isLeader: true
            },
            ...res.data.members.map(m => ({
              id: m._id,
              name: `${m.firstName} ${m.lastName}`,
              email: m.email,
              codeforcesId: m.eventProfile?.codeforcesId || "",
              isLeader: false
            }))
          ];

          setTeamMembers(membersArr);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(true);
        localStorage.setItem("userToken", token);
        await fetchTeam(token);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (member) => {
    setEditingMember(member.id);
    setEditForm({ ...member });
  };

  const handleSave = () => {
    if (editingMember && editForm) {
      setTeamMembers(prev =>
        prev.map(member =>
          member.id === editingMember
            ? { ...member, ...editForm }
            : member
        )
      );
      setEditingMember(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingMember(null);
    setEditForm({});
  };

  const handleTeamNameEdit = () => {
    setIsEditingTeamName(!isEditingTeamName);
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading dashboard...</div>;
  }

  if (!user) {
    return <div className="text-white text-center mt-10">User not signed in</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06051C] via-[#0A0825] to-[#0D0B2E] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {isEditingTeamName ? (
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="text-4xl font-bold bg-transparent border-b-2 border-blue-400 text-white text-center outline-none"
                onBlur={handleTeamNameEdit}
                onKeyPress={(e) => e.key === 'Enter' && handleTeamNameEdit()}
                autoFocus
              />
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-white">{teamName}</h1>
                <button
                  onClick={handleTeamNameEdit}
                  className="text-blue-400 hover:text-blue-300 transition-colors p-1"
                >
                  <Edit3 size={24} />
                </button>
              </>
            )}
          </div>
          <p className="text-gray-300 text-lg">Competitive Programming Team</p>
        </div>

        {/* Event Details */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-400" size={24} />
            <h2 className="text-xl font-semibold text-white">Event Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-gray-200">
              <Calendar size={18} className="text-blue-400" />
              <span className="text-sm">{eventDetails.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <MapPin size={18} className="text-green-400" />
              <span className="text-sm">{eventDetails.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Users size={18} className="text-purple-400" />
              <span className="text-sm">{eventDetails.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Trophy size={18} className="text-orange-400" />
              <span className="text-sm">{eventDetails.duration}</span>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`relative transition-all duration-300 hover:scale-105 ${
                member.isLeader
                  ? 'bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border-2 border-yellow-400/50 shadow-2xl shadow-yellow-500/20'
                  : 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30'
              } backdrop-blur-sm rounded-xl p-6`}
            >
              {member.isLeader && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                    <Crown size={20} className="text-[#06051C]" />
                  </div>
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  member.isLeader
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-[#06051C]'
                    : 'bg-blue-500/30 text-blue-200'
                }`}>
                  {member.isLeader ? 'TEAM LEADER' : 'MEMBER'}
                </span>
                <button
                  onClick={() => handleEdit(member)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <Edit3 size={18} />
                </button>
              </div>

              {editingMember === member.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Codeforces ID</label>
                    <input
                      type="text"
                      value={editForm.codeforcesId || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, codeforcesId: e.target.value }))}
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">{member.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-gray-400" />
                      <span className="text-gray-200 text-sm">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code size={18} className="text-gray-400" />
                      <span className="text-gray-200 text-sm">{member.codeforcesId}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-600/50">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Contest Ready</span>
                      <span className="text-green-400">✓</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400">
          <p className="text-sm">Ready to code, compete, and conquer! 🚀</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
