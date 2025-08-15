import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Constants
const TABS = {
  USERS: 'users',
  TEAMS: 'teams',
  MEMBERS: 'members'
};

const PAYMENT_STATUS = ['pending', 'incomplete', 'accepted', 'rejected'];
const ROLES = ['user', 'admin', 'member'];
const BATCHES = ['2024-28', '2023-27', '2022-26', '2021-25', '2020-24', '2019-23', '2018-22', '2017-21'];

// Initial state objects
const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const initialTeamData = {
  name: '',
  leader: { name: "", email: "", codeforces: "" },
  teammate1: { name: "", email: "", codeforces: "" },
  teammate2: { name: "", email: "", codeforces: "" },
  payment: "",
};

const initialNewMember = {
  name: '',
  email: '',
  role: '',
  batch: ''
};

// Utility functions
const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return await user.getIdToken(true);
};

const showAlert = (message) => {
  alert(message);
};

const confirmAction = (message) => {
  return window.confirm(message);
};

// Custom hooks
const useApiCall = () => {
  const [loading, setLoading] = useState(false);

  const apiCall = useCallback(async (asyncFunction) => {
    setLoading(true);
    try {
      return await asyncFunction();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, apiCall };
};

// Sub-components
const TabButton = React.memo(({ id, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
));

const StatsCard = React.memo(({ title, count }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  </div>
));

const UserCard = React.memo(({ user, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        user.role === 'admin'
          ? 'bg-purple-100 text-purple-800'
          : 'bg-green-100 text-green-800'
      }`}>
        {user.role}
      </span>
    </div>
    <div className="space-y-2 mb-4">
      <p className="text-sm text-gray-600">College: {user.college}</p>
      <p className="text-sm text-gray-600">Roll No: {user.rollno}</p>
    </div>
    <div className="flex gap-2">
      <button
        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
        onClick={() => onEdit(user._id)}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(user._id)}
        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
));

const TeamCard = React.memo(({ team, onEdit, onDelete }) => {
  // Safely extract team data with fallbacks
  const teamName = team?.name || 'Unnamed Team';
  const paymentStatus = typeof team?.payment === 'object' ? team.payment?.status || 'pending' : team?.payment || 'pending';
  const leader = team?.leader || {};
  const teammate1 = team?.teammate1 || {};
  const teammate2 = team?.teammate2 || {};
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{teamName}</h3>
          <p className="text-gray-600">Payment: {paymentStatus}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          3 members
        </span>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Members:</h4>
        <div className="space-y-1">
          <div className="text-sm text-gray-600">
            {leader.name || 'No name'} - {leader.email || 'No email'} (Leader)
          </div>
          <div className="text-sm text-gray-600">
            {teammate1.name || 'No name'} - {teammate1.email || 'No email'}
          </div>
          <div className="text-sm text-gray-600">
            {teammate2.name || 'No name'} - {teammate2.email || 'No email'}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          onClick={() => onEdit(team._id)}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(team._id)}
          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

const MemberCard = React.memo(({ member, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{member.memberName}</h3>
        <p className="text-gray-600">{member.memberEmail}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        member.memberRole === 'admin'
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
        onClick={() => onDelete(member._id)}
        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
));

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Form components
const FormInput = ({ label, type = "text", name, value, onChange, placeholder, required = false, className = "" }) => (
  <div className={className}>
    <label className="block text-white mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options, required = false, className = "" }) => (
  <div className={className}>
    <label className="block text-white mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-white text-xl font-bold mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const AdminPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState(TABS.USERS);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editTeamId, setEditTeamId] = useState(null);
  
  // Form data states
  const [userData, setUserData] = useState(initialUserData);
  const [teamData, setTeamData] = useState(initialTeamData);
  const [newMember, setNewMember] = useState(initialNewMember);
  const [editUserData, setEditUserData] = useState({});
  const [editTeamData, setEditTeamData] = useState({});

  const { loading, apiCall } = useApiCall();

  // API calls
  const fetchAllData = useCallback(async () => {
    await apiCall(async () => {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const [usersResponse, membersResponse, teamsResponse] = await Promise.all([
        axios.get(`${serverUrl}/admin/users`),
        axios.get(`${serverUrl}/admin/members`),
        axios.get(`${serverUrl}/admin/teams`)
      ]);
      
      setUsers(usersResponse.data);
      setMembers(membersResponse.data);
      setTeams(teamsResponse.data);
    });
  }, [apiCall]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Filtered data with memoization
  const filteredData = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    
    return {
      users: users.filter(user =>
        (user.firstName || "").toLowerCase().includes(searchLower) ||
        (user.email || "").toLowerCase().includes(searchLower)
      ),
      teams: teams.filter(team => {
        // Add safety checks for team data
        if (!team || typeof team !== 'object') return false;
        const teamName = team.name || '';
        return teamName.toLowerCase().includes(searchLower);
      }),
      members: members.filter(member => {
        // Add safety checks for member data
        if (!member || typeof member !== 'object') return false;
        const memberName = member.memberName || '';
        const memberEmail = member.memberEmail || member.memberemail || '';
        return memberName.toLowerCase().includes(searchLower) ||
               memberEmail.toLowerCase().includes(searchLower);
      })
    };
  }, [users, teams, members, searchTerm]);

  // Event handlers
  const handleInputChange = useCallback((setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleNestedInputChange = useCallback((setter) => (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setter(prev => {
      const updated = { ...prev };
      let obj = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  }, []);

  // User operations
  const handleAddUser = useCallback(async (e) => {
    e.preventDefault();
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/users`,
        userData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (!response.data.success) throw new Error('User creation failed');
      
      setShowAddUser(false);
      setUserData(initialUserData);
      showAlert("User created successfully!");
      await fetchAllData();
    });
  }, [userData, apiCall, fetchAllData]);

  const handleEditUser = useCallback(async (userId) => {
    setEditUserId(userId);
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/admin/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setEditUserData(response.data.user);
    });
  }, [apiCall]);

  const handleUpdateUser = useCallback(async (e) => {
    e.preventDefault();
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/admin/users/${editUserId}`,
        editUserData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (!response.data.success) throw new Error('Update failed');
      
      setUsers(prev => prev.map(u => u._id === editUserId ? response.data.user : u));
      setEditUserId(null);
      showAlert('User updated successfully!');
    });
  }, [editUserId, editUserData, apiCall]);

  const handleDeleteUser = useCallback(async (userId) => {
    if (!confirmAction('Are you sure you want to delete this user?')) return;
    
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      setUsers(prev => prev.filter(user => user._id !== userId));
      showAlert('User deleted successfully');
    });
  }, [apiCall]);

  // Team operations
  const handleAddTeam = useCallback(async (e) => {
    e.preventDefault();
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/register/admin`,
        teamData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (!response.data.success) throw new Error('Team creation failed');
      
      setShowAddTeam(false);
      setTeamData(initialTeamData);
      showAlert('Team created successfully!');
      await fetchAllData();
    });
  }, [teamData, apiCall, fetchAllData]);

  const handleEditTeam = useCallback(async (teamId) => {
    setEditTeamId(teamId);
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/admin/teams/${teamId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setEditTeamData(response.data);
    });
  }, [apiCall]);

  const handleUpdateTeam = useCallback(async (e) => {
    e.preventDefault();
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/admin/teams/${editTeamId}`,
        editTeamData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (!response.data.success) throw new Error('Update failed');
      
      setTeams(prev => prev.map(t => t._id === editTeamId ? response.data.team : t));
      setEditTeamId(null);
      showAlert('Team updated successfully!');
    });
  }, [editTeamId, editTeamData, apiCall]);

  const handleDeleteTeam = useCallback(async (teamId) => {
    if (!confirmAction('Are you sure you want to delete this team?')) return;
    
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/teams/${teamId}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (!response.ok) throw new Error('Failed to delete team');
      
      setTeams(prev => prev.filter(team => team._id !== teamId));
      showAlert('Team deleted successfully');
    });
  }, [apiCall]);

  // Member operations
  const handleAddMember = useCallback(() => {
    if (!newMember.name || !newMember.email || !newMember.role || !newMember.batch) {
      showAlert('Please fill in all fields');
      return;
    }
    
    const member = {
      _id: Date.now().toString(),
      memberName: newMember.name,
      memberEmail: newMember.email,
      memberRole: newMember.role
    };
    
    setMembers(prev => [...prev, member]);
    setNewMember(initialNewMember);
  }, [newMember]);

  const handleDeleteMember = useCallback(async (memberId) => {
    if (!confirmAction('Are you sure you want to delete this member?')) return;
    
    await apiCall(async () => {
      const token = await getAuthToken();
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/members/${memberId}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      if (!response.ok) throw new Error('Failed to delete member');
      
      setMembers(prev => prev.filter(member => member._id !== memberId));
      showAlert('Member deleted successfully');
    });
  }, [apiCall]);

  const currentData = filteredData[activeTab] || [];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, teams, and members</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <TabButton
            id={TABS.USERS}
            label="Users"
            isActive={activeTab === TABS.USERS}
            onClick={setActiveTab}
          />
          <TabButton
            id={TABS.TEAMS}
            label="Teams"
            isActive={activeTab === TABS.TEAMS}
            onClick={setActiveTab}
          />
          <TabButton
            id={TABS.MEMBERS}
            label="Members"
            isActive={activeTab === TABS.MEMBERS}
            onClick={setActiveTab}
          />
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Total Users" count={users.length} />
          <StatsCard title="Total Teams" count={teams.length} />
          <StatsCard title="Total Members" count={members.length} />
        </div>

        {/* Search and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => {
              if (activeTab === TABS.USERS) setShowAddUser(true);
              else if (activeTab === TABS.TEAMS) setShowAddTeam(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === TABS.USERS && currentData.map(user => (
            <UserCard 
              key={user._id} 
              user={user} 
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}

          {activeTab === TABS.TEAMS && currentData.map((team, index) => {
            // Debug logging to help identify the issue
            console.log(`Team ${index}:`, team);
            return (
              <TeamCard 
                key={team._id || `team-${index}`} 
                team={team}
                onEdit={handleEditTeam}
                onDelete={handleDeleteTeam}
              />
            );
          })}

          {activeTab === TABS.MEMBERS && (
            <>
              {currentData.map((member, index) => (
                <MemberCard 
                  key={member._id || `member-${index}`} 
                  member={member}
                  onDelete={handleDeleteMember}
                />
              ))}
              
              {/* Add Member Card */}
              <div className="col-span-full">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Member</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Member Name"
                      value={newMember.name}
                      onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Member Email"
                      value={newMember.email}
                      onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Role</option>
                      {ROLES.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    <select
                      value={newMember.batch}
                      onChange={(e) => setNewMember(prev => ({ ...prev, batch: e.target.value }))}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Batch</option>
                      {BATCHES.map(batch => (
                        <option key={batch} value={batch}>{batch}</option>
                      ))}
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

        {/* Add User Modal */}
        <Modal isOpen={showAddUser} onClose={() => setShowAddUser(false)} title="Create New User">
          <form onSubmit={handleAddUser} className="space-y-4">
            <FormInput
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange(setUserData)}
              placeholder="Enter First Name"
              required
            />
            <FormInput
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange(setUserData)}
              placeholder="Enter Last Name"
              required
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange(setUserData)}
              placeholder="Enter Email"
              required
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange(setUserData)}
              placeholder="Enter Password"
              required
            />
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowAddUser(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create User
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit User Modal */}
        <Modal isOpen={!!editUserId} onClose={() => setEditUserId(null)} title="Edit User">
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <FormInput
              label="First Name"
              name="firstName"
              value={editUserData.firstName || ''}
              onChange={handleInputChange(setEditUserData)}
              placeholder="First Name"
              required
            />
            <FormInput
              label="Last Name"
              name="lastName"
              value={editUserData.lastName || ''}
              onChange={handleInputChange(setEditUserData)}
              placeholder="Last Name"
              required
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={editUserData.email || ''}
              onChange={handleInputChange(setEditUserData)}
              placeholder="Email"
              required
            />
            <FormInput
              label="College"
              name="college"
              value={editUserData.college || ''}
              onChange={handleInputChange(setEditUserData)}
              placeholder="College"
            />
            <FormInput
              label="Roll No"
              name="rollno"
              value={editUserData.rollno || ''}
              onChange={handleInputChange(setEditUserData)}
              placeholder="Roll No"
            />
            <FormSelect
              label="Role"
              name="role"
              value={editUserData.role || ''}
              onChange={handleInputChange(setEditUserData)}
              options={ROLES}
            />
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </Modal>

        {/* Add/Edit Team Modals would be similar - truncated for brevity */}
      </div>
    </div>
  );
};

export default AdminPage;