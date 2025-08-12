import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    batch: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const axios = (await import('https://cdn.skypack.dev/axios')).default;

        const usersResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/users`);
        const membersResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/members`);
        const teamsResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/teams`);

        // const usersResponse = await axios.get(`http://localhost:4200/admin/users`);
        // const membersResponse = await axios.get(`http://localhost:4200/admin/members`);
        // const teamsResponse = await axios.get(`http://localhost:4200/admin/teams`);

        setUsers(usersResponse.data);
        setMembers(membersResponse.data);
        setTeams(teamsResponse.data);

      } catch (err) {
        console.error("Error loading users or members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          throw new Error('Not logged in.');
        }

        const token = await currentUser.getIdToken(true);

        // const res = await fetch(`http://localhost:4200/admin/users/${userId}`, {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`Failed to delete user: ${res.statusText}`);
        }

        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Could not delete user. Please try again.');
      }
    };
  }

  const handleDeleteMember = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error('Not logged in.');

        const token = await currentUser.getIdToken(true);

        // const res = await fetch(`http://localhost:4200/admin/members/${memberId}`, {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/members/${memberId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to delete member.');
        }

        setMembers(prevMembers => prevMembers.filter(member => member._id !== memberId));
        alert('Member removed successfully');

      } catch (error) {
        console.error('Error removing member:', error);
        alert(`Could not remove member: ${error.message}`);
      }
    }
  }


  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error('Not logged in.');

        const token = await currentUser.getIdToken(true);

        // const res = await fetch(`http://localhost:4200/admin/teams/${teamId}`, { 
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/teams/${teamId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to delete team.');
        }

        setTeams(prevTeams => prevTeams.filter(team => team._id !== teamId));
        alert('Team deleted successfully');

      } catch (error) {
        console.error('Error deleting team:', error);
        alert(`Could not delete team: ${error.message}`);
      }
    }
  };


const handleAddMember = () => {
  if (newMember.name && newMember.email && newMember.role && newMember.batch) {
    const member = {
      _id: Date.now().toString(),
      memberName: newMember.name,
      memberemail: newMember.email,
      MemberRole: newMember.role
    };
    setMembers([...members, member]);
    setNewMember({ name: '', email: '', role: '', batch: '' });
  } else {
    alert('Please fill in all fields');
  }
};

// Filter functions
const filteredUsers = users.filter(user =>
  (user.firstName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredMembers = members.filter(member =>
  member.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  member.memberemail.toLowerCase().includes(searchTerm.toLowerCase())
);

const filteredTeams = teams.filter(team =>
  team.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const TabButton = ({ id, label, icon, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive
      ? 'bg-blue-600 text-white'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
  >
    <span className="text-lg">{icon}</span>
    {label}
  </button>
);

const UserCard = ({ user }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === 'admin'
        ? 'bg-purple-100 text-purple-800'
        : 'bg-green-100 text-green-800'
        }`}>
        {user.role}
      </span>
    </div>
    <div className="space-y-2 mb-4">
      <p className="text-sm text-gray-600">College: {user.college}</p>
      <p className="text-sm text-gray-600">Roll No: {user.universityRollNo}</p>
    </div>
    <div className="flex gap-2">
      <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
        Edit
      </button>
      <button
        onClick={() => handleDeleteUser(user._id)}
        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
);

const MemberCard = ({ member }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{member.memberName}</h3>
        <p className="text-gray-600">{member.memberEmail}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${member.memberRole === 'admin'
        ? 'bg-purple-100 text-purple-800'
        : 'bg-green-100 text-green-800'
        }`}>
        {member.memberRole}
      </span>
    </div>
    <div className="flex gap-2">
      <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
        Edit
      </button>
      <button
        onClick={() => handleDeleteMember(member._id)}
        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
);

const TeamCard = ({ team }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
        <p className="text-gray-600">Ranking: #{team.ranking}</p>
      </div>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
        {team.members.length} members
      </span>
    </div>
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Members:</h4>
      <div className="space-y-1">
        {team.members.map((member, index) => (
          <div key={index} className="text-sm text-gray-600">
            {member.name} - {member.email}
          </div>
        ))}
      </div>
    </div>
    <div className="flex gap-2">
      <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
        Edit
      </button>
      <button
        onClick={() => handleDeleteTeam(team._id)}
        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
);

if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, teams, and members</p>
      </div>
      <div className="flex gap-4 mb-6">
        <TabButton
          id="users"
          label="Users"
          isActive={activeTab === 'users'}
          onClick={setActiveTab}
        />
        <TabButton
          id="teams"
          label="Teams"
          isActive={activeTab === 'teams'}
          onClick={setActiveTab}
        />
        <TabButton
          id="members"
          label="Members"
          isActive={activeTab === 'members'}
          onClick={setActiveTab}
        />
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'users' && filteredUsers.map(user => (
          <UserCard key={user._id} user={user} />
        ))}

        {activeTab === 'teams' && filteredTeams.map(team => (
          <TeamCard key={team._id} team={team} />
        ))}

        {activeTab === 'members' && (
          <>
            {filteredMembers.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}

            <div className="col-span-full">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Member</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Member Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Member Email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                  <select
                    value={newMember.batch}
                    onChange={(e) => setNewMember({ ...newMember, batch: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Batch</option>
                    <option value="2024-28">2024-28</option>
                    <option value="2023-27">2023-27</option>
                    <option value="2022-26">2022-26</option>
                    <option value="2021-25">2021-25</option>
                    <option value="2020-24">2020-24</option>
                    <option value="2019-23">2019-23</option>
                    <option value="2018-22">2018-22</option>
                    <option value="2017-21">2017-21</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="md:col-span-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teams</p>
              <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{members.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default AdminPage;