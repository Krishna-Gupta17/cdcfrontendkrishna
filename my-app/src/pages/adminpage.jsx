import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import API from '../api';
import { auth } from '../firebase';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAddTeam, setAddTeam] = useState(false);
  const [showAddUser, setAddUser] = useState(false);
  const [newMember, setNewMember] = useState({
    memberName: '',
    memberEmail: '',
    memberRole: '',
    memberYear: ''
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [teamData, setTeamData] = useState({
    name: '',
    leader: { name: "", email: "", codeforces: "", firebaseUID: "" },
    teammate1: { name: "", email: "", codeforces: "", firebaseUID: "" },
    teammate2: { name: "", email: "", codeforces: "", firebaseUID: "" },
    payment: { status: "pending", lastupdated: null }
  })

  const [editUserId, setEditUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    college: "",
    rollno: "",
    role: "",
  });

  const [editTeamId, setEditTeamId] = useState(null);
  const [editTeamData, setEditTeamData] = useState({
    name: "",
    leader: { name: "", email: "", codeforces: "" },
    teammate1: { name: "", email: "", codeforces: "" },
    teammate2: { name: "", email: "", codeforces: "" },
    payment: { status: "pending", lastupdated: null }

  });

  const [editMemberId, setEditMemberId] = useState(null);
  const [editMemberData, setEditMemberData] = useState({
    memberName: "",
    memberEmail: "",
    memberRole: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/users`);
        const membersResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/members`);
        const teamsResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/teams`);
        setUsers(usersResponse.data);
        setMembers(membersResponse.data);
        setTeams(teamsResponse.data);
        console.log(usersResponse.data)
        console.log(teamsResponse.data)
      } catch (err) {
        console.error("Error loading users or members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/users`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } });
      if (!res.data.success) throw new Error('User creation failed');
      setAddUser(false);
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      alert("User created successfully!");
    } catch (err) {
      console.error("Admin user creation error:", err);
      alert(err.message);
    }
  }

  const validateTeamEmails = () => {
    const teamEmails = [
      teamData.leader.email,
      teamData.teammate1.email,
      teamData.teammate2.email
    ].filter(email => email.trim() !== '');

    const userEmails = users.map(user => user.email.toLowerCase());
    const invalidEmails = [];
    const duplicateEmails = [];

    // Check if emails exist in users database
    teamEmails.forEach(email => {
      if (!userEmails.includes(email.toLowerCase())) {
        invalidEmails.push(email);
      }
    });

    // Check for duplicate emails within the team
    const emailCounts = {};
    teamEmails.forEach(email => {
      const lowerEmail = email.toLowerCase();
      emailCounts[lowerEmail] = (emailCounts[lowerEmail] || 0) + 1;
      if (emailCounts[lowerEmail] > 1) {
        duplicateEmails.push(email);
      }
    });

    return { invalidEmails, duplicateEmails };
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { invalidEmails, duplicateEmails } = validateTeamEmails();

    if (invalidEmails.length > 0) {
      alert(`The following emails are not registered users:\n${invalidEmails.join('\n')}\n\nPlease make sure all team members are registered users.`);
      return;
    }

    if (duplicateEmails.length > 0) {
      alert(`Duplicate emails found in team:\n${[...new Set(duplicateEmails)].join('\n')}\n\nEach team member must have a unique email.`);
      return;
    }
    const auth = getAuth();
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      console.log(teamData);
      const res = await API.post('/api/register/admin', teamData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data.success) throw new Error('Registration failed');
      alert('Registration successful!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          throw new Error('Not logged in.');
        }

        const token = await currentUser.getIdToken(true);
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

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  }


  const handleTeamData = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setTeamData(prev => {
      const updated = { ...prev };
      let obj = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleAddMember = async (e) => {
  //   if (newMember.name && newMember.email && newMember.role && newMember.batch) {
  //     const member = {
  //       _id: Date.now().toString(),
  //       memberName: newMember.name,
  //       memberEmail: newMember.email,
  //       MemberRole: newMember.role
  //     };
  //     setMembers([...members, member]);
  //     setNewMember({ name: '', email: '', role: '', batch: '' });
  //   } else {
  //     alert('Please fill in all fields');
  //   }
  // };
  e.preventDefault();
    setIsSubmitting(true);

    try {
      const axios = (await import('https://cdn.skypack.dev/axios')).default;
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Not logged in.');

      const token = await currentUser.getIdToken(true);

      const res = await axios.post(
        `http://localhost:4200/admin/members`,
        // `${import.meta.env.VITE_SERVER_URL}/admin/members`,
        newMember,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("Member created:", res.data);
      alert("Member created successfully!");
      setMembers((prev) => [...prev, res.data]);
      
      setNewMember({
        memberName: '',
        memberEmail: '',
        memberRole: '',
        memberYear: ''
      });
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating member:", error);
      alert("Failed to create member. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }


  };

  const filteredData = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();

    return {
      users: users.filter(user =>
        (user.firstName || "").toLowerCase().includes(searchLower) ||
        (user.email || "").toLowerCase().includes(searchLower)
      ),
      teams: teams.filter(team => {
        if (!team || typeof team !== 'object') return false;
        const teamName = team.name || '';
        return teamName.toLowerCase().includes(searchLower);
      }),
      members: members.filter(member => {

        if (!member || typeof member !== 'object') return false;
        const memberName = member.memberName || '';
        const memberEmail = member.memberEmail || member.memberEmail || '';
        return member.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.memberEmail.toLowerCase().includes(searchTerm.toLowerCase())
      })
    };
  }, [users, teams, members, searchTerm]);


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
        <p className="text-sm text-gray-600">Roll No: {user.rollno}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          onClick={() => handleEditUser(user._id)}
        >
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
        <button
          onClick={() => handleEditMember(member._id)}
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
          Edit
        </button>
        <button
          onClick={() => handleDeleteMember(member._id)}
          className="flex items-center gap-1 
		if (!req.user || !roles.includes(req.user.role)) {
			return res.statuspx-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );

  const TeamCard = ({ team, users = [], setEditTeamData }) => {
    const getUserById = (id) => users.find((u) => u._id === id) || {};

    const teamName = team?.name || 'Unnamed Team';
    const paymentStatus =
      typeof team?.payment === 'object'
        ? team.payment?.status || 'pending'
        : team?.payment || 'pending';

    const leader = getUserById(team.leaderId);
    const teammate1 = getUserById(team.members?.[0]);
    const teammate2 = getUserById(team.members?.[1]);

    const handleEditTeam = () => {
      setEditTeamId(team._id)
      setEditTeamData({
        name: teamName,
        leader: {
          name: `${leader.firstName || ''} ${leader.lastName || ''}`.trim(),
          email: leader.email || '',
          codeforces: leader.eventProfile.codeforcesId || ''
        },
        teammate1: {
          name: `${teammate1.firstName || ''} ${teammate1.lastName || ''}`.trim(),
          email: teammate1.email || '',
          codeforces: teammate1.eventProfile.codeforcesId || ''
        },
        teammate2: {
          name: `${teammate2.firstName || ''} ${teammate2.lastName || ''}`.trim(),
          email: teammate2.email || '',
          codeforces: teammate2.eventProfile.codeforcesId || ''
        },
        payment: paymentStatus
      });
    };

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
              {leader.firstName || 'No name'} {leader.lastName || ''} - {leader.email || 'No email'} (Leader)
            </div>
            <div className="text-sm text-gray-600">
              {teammate1.firstName || 'No name'} {teammate1.lastName || ''} - {teammate1.email || 'No email'}
            </div>
            <div className="text-sm text-gray-600">
              {teammate2.firstName || 'No name'} {teammate2.lastName || ''} - {teammate2.email || 'No email'}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            onClick={handleEditTeam}
          >
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
  };

  // Handler to open edit user modal and fetch user data
  const handleEditUser = async (userID) => {
    setEditUserId(userID);
    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken();
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/users/${userID}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditUserData({
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
        college: res.data.user.college,
        rollno: res.data.user.rollno,
        phone: res.data.user.phone,
        role: res.data.user.role
      });
    } catch (err) {
      alert("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = async (memberId) => {
    setEditMemberId(memberId);
    const auth = getAuth();
    const user = auth.currentUser;
    const token = await user.getIdToken();
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/members/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditMemberData({
        memberName: res.data.member.memberName,
        memberEmail: res.data.member.memberEmail,
        memberRole: res.data.member.memberRole,
      });
    } catch (err) {
      alert("Failed to fetch member data");
    } finally {
      setLoading(false);
    }
  };


  const handleEditUserData = (e) => {
    const { name, value } = e.target;
    setEditUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditTeamData = (e) => {
    const { name, value } = e.target;
    if (name === "payment") {
      setEditTeamData(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          status: value,
          lastupdated: new Date().toISOString()
        }
      }));
      return;
    }
    const keys = name.split(".");
    setEditTeamData(prev => {
      const updated = { ...prev };
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleEditMemberData = (e) => {
    const { name, value } = e.target;
    setEditMemberData(prev => ({ ...prev, [name]: value }))
  }

  const submitEditUser = async (e) => {
    e.preventDefault();
    const userID = editUserId;
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/users/${userID}`, editUserData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data.success) throw new Error('Update failed');
      setUsers(users.map(u => u._id === userID ? res.data.user : u));
      setEditUserId(null);
      alert('User updated!');
    } catch (err) {
      alert('Failed to update user');
    }
  };

  const submitEditMember = async (e) => {
    e.preventDefault();
    const memberID = editMemberId;
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/members/${memberID}`, editMemberData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data.success) throw new Error('Update failed');
      setMembers(members.map(m => m._id === memberID ? res.data.member : m));
      const membersResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/members`);
      setMembers(membersResponse.data);
      setEditMemberId(null);
      alert('Member updated!');
    } catch (err) {
      alert('Failed to update member');
    }
  };
  // Email validation for edit team
  const validateEditTeamEmails = () => {
    const teamEmails = [
      editTeamData.leader.email,
      editTeamData.teammate1.email,
      editTeamData.teammate2.email
    ].filter(email => email.trim() !== '');

    const userEmails = users.map(user => user.email.toLowerCase());
    const invalidEmails = [];
    const duplicateEmails = [];

    teamEmails.forEach(email => {
      if (!userEmails.includes(email.toLowerCase())) {
        invalidEmails.push(email);
      }
    });

    const emailCounts = {};
    teamEmails.forEach(email => {
      const lowerEmail = email.toLowerCase();
      emailCounts[lowerEmail] = (emailCounts[lowerEmail] || 0) + 1;
      if (emailCounts[lowerEmail] > 1) {
        duplicateEmails.push(email);
      }
    });

    return { invalidEmails, duplicateEmails };
  };

  const submitEditTeam = async (e) => {
    e.preventDefault();

    const { invalidEmails, duplicateEmails } = validateEditTeamEmails();
    if (invalidEmails.length > 0) {
      alert(`The following emails are not registered users:\n${invalidEmails.join('\n')}\n\nPlease make sure all team members are registered users.`);
      return;
    }
    if (duplicateEmails.length > 0) {
      alert(`Duplicate emails found in team:\n${[...new Set(duplicateEmails)].join('\n')}\n\nEach team member must have a unique email.`);
      return;
    }
    const teamId = editTeamId;
    console.log(teamId);
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      console.log(editTeamData);
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/teams/${teamId}`, editTeamData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data.success) throw new Error('Update failed');
      setTeams(teams.map(t => t._id === teamId ? res.data.team : t));
      setEditTeamId(null);
      alert('Team updated!');
    } catch (err) {
      alert('Failed to update team');
    }
  };

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
  const currentData = filteredData[activeTab] || [];


  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
          <button
            onClick={() => {
              activeTab === "users" ? setAddUser(true) : setAddTeam(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {showAddUser && activeTab === "users" && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setAddUser(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
              >X</button>
              <h2 className="text-white text-xl font-bold mb-6">Create New User</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">FirstName</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleUserData}
                    placeholder="Enter First Name"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">LastName</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleUserData}
                    placeholder="Enter Last Name"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">email</label>
                  <textarea
                    name="email"
                    value={userData.email}
                    onChange={handleUserData}
                    placeholder="Enter Email"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">set Password</label>
                  <textarea
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleUserData}
                    placeholder="Enter password"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setAddUser(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleAddUser}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showAddTeam && activeTab === "teams" && (
          <main className="w-full max-w-5xl flex items-center justify-center overflow-y-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 bg-black bg-opacity-60 p-8 rounded-xl shadow-xl backdrop-blur-lg relative"
            >
              <button
                type="button"
                onClick={() => setAddTeam(false)}
                className="absolute top-4 right-4 text-white font-bold text-xl"
              >
                Cancel
              </button>

              <div className="w-full max-w-md border border-gray-600 bg-black bg-opacity-30 p-6 rounded-xl shadow-md space-y-4">
                <label htmlFor="name" className="block font-semibold text-left mb-1">Team Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={teamData.name}
                  onChange={handleTeamData}
                  placeholder="Enter team name"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="w-full max-w-md border border-gray-600 bg-black bg-opacity-30 p-6 rounded-xl shadow-md space-y-4">
                <label className="block font-semibold text-left mb-1">Leader</label>
                <input
                  name="leader.name"
                  type="text"
                  value={teamData.leader.name}
                  onChange={handleTeamData}
                  placeholder="Leader Name"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg mb-2"
                  required
                />
                <input
                  name="leader.email"
                  type="email"
                  value={teamData.leader.email}
                  onChange={handleTeamData}
                  placeholder="Leader Email"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg mb-2"
                  required
                />
                {teamData.leader.email && !users.some(user => user.email.toLowerCase() === teamData.leader.email.toLowerCase()) && (
                  <div className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    This email is not registered as a user
                  </div>
                )}
                <input
                  name="leader.codeforces"
                  type="text"
                  value={teamData.leader.codeforces}
                  onChange={handleTeamData}
                  placeholder="Leader Codeforces ID"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg"
                />
              </div>

              <div className="w-full max-w-md border border-gray-600 bg-black bg-opacity-30 p-6 rounded-xl shadow-md space-y-4">
                <label className="block font-semibold text-left mb-1">Teammate 1</label>
                <input
                  name="teammate1.name"
                  type="text"
                  value={teamData.teammate1.name}
                  onChange={handleTeamData}
                  placeholder="Teammate 1 Name"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg mb-2"
                  required
                />
                <input
                  name="teammate1.email"
                  type="email"
                  value={teamData.teammate1.email}
                  onChange={handleTeamData}
                  placeholder="Teammate 1 Email"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg mb-2"
                  required
                />
                {teamData.teammate1.email && !users.some(user => user.email.toLowerCase() === teamData.teammate1.email.toLowerCase()) && (
                  <div className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    This email is not registered as a user
                  </div>
                )}
                <input
                  name="teammate1.codeforces"
                  type="text"
                  value={teamData.teammate1.codeforces}
                  onChange={handleTeamData}
                  placeholder="Teammate 1 Codeforces ID"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg"
                />
              </div>

              <div className="w-full max-w-md border border-gray-600 bg-black bg-opacity-30 p-6 rounded-xl shadow-md space-y-4">
                <label className="block font-semibold text-left mb-1">Teammate 2</label>
                <input
                  name="teammate2.name"
                  type="text"
                  value={teamData.teammate2.name}
                  onChange={handleTeamData}
                  placeholder="Teammate 2 Name"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg mb-2"
                  required
                />
                <input
                  name="teammate2.email"
                  type="email"
                  value={teamData.teammate2.email}
                  onChange={handleTeamData}
                  placeholder="Teammate 2 Email"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg mb-2"
                  required
                />
                <input
                  name="teammate2.codeforces"
                  type="text"
                  value={teamData.teammate2.codeforces}
                  onChange={handleTeamData}
                  placeholder="Teammate 2 Codeforces ID"
                  className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 p-3 rounded-lg"
                />
                {teamData.teammate2.email && !users.some(user => user.email.toLowerCase() === teamData.teammate2.email.toLowerCase()) && (
                  <div className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    This email is not registered as a user
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <select
                  name="payment.status"
                  value={teamData.payment.status}
                  onChange={handleTeamData}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                >
                  <option value="pending">pending</option>
                  <option value="incomplete">incomplete</option>
                  <option value="accepted">accepted</option>
                  <option value="rejected">rejected</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </form>
          </main>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'users' && currentData.map(user => (
            <UserCard key={user._id} user={user} />
          ))}

          {activeTab === 'teams' && currentData.map(team => (
            <TeamCard key={team._id} team={team} users={users} setEditTeamData={setEditTeamData} />
          ))}


          {activeTab === 'members' && (
            <>
              {currentData.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}

              <div className="col-span-full">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Member</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Member Name"
                      value={newMember.memberName}
                      onChange={(e) => setNewMember({ ...newMember, memberName: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Member Email"
                      value={newMember.memberEmail}
                      onChange={(e) => setNewMember({ ...newMember, memberEmail: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={newMember.memberRole}
                      onChange={(e) => setNewMember({ ...newMember, memberRole: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
                    <select
                      value={newMember.memberYear}
                      onChange={(e) => setNewMember({ ...newMember, memberYear: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Batch</option>
                      <option value="2024">2024-28</option>
                      <option value="2023">2023-27</option>
                      <option value="2022">2022-26</option>
                      <option value="2021">2021-25</option>
                      <option value="2020">2020-24</option>
                      <option value="2019">2019-23</option>
                      <option value="2018">2018-22</option>
                      <option value="2017">2017-21</option>
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

        {editUserId && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setEditUserId(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
              >X</button>
              <h2 className="text-white text-xl font-bold mb-6">Edit User</h2>
              <form onSubmit={submitEditUser} className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  value={editUserData.firstName}
                  onChange={handleEditUserData}
                  placeholder="First Name"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={editUserData.lastName}
                  onChange={handleEditUserData}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={editUserData.email}
                  onChange={handleEditUserData}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="text"
                  name="college"
                  value={editUserData.college}
                  onChange={handleEditUserData}
                  placeholder="College"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                />
                <input
                  type="text"
                  name="rollno"
                  value={editUserData.rollno}
                  onChange={handleEditUserData}
                  placeholder="Roll No"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                />
                <select
                  name="role"
                  value={editUserData.role}
                  onChange={handleEditUserData}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                >
                  <option value="user">user</option>
                  <option value="admin">Admin</option>
                  <option value="member">member</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md mt-4">Save</button>
              </form>
            </div>
          </div>
        )}

        {editMemberId && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setEditMemberId(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
              >X</button>
              <h2 className="text-white text-xl font-bold mb-6">Edit Member</h2>
              <form onSubmit={submitEditMember} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Member Name</label>
                  <input
                    type="text"
                    name="memberName"
                    value={editMemberData.memberName}
                    onChange={handleEditMemberData}
                    placeholder="Member Name"
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Member Email</label>
                  <input
                    type="email"
                    name="memberEmail"
                    value={editMemberData.memberEmail}
                    onChange={handleEditMemberData}
                    placeholder="Member Email"
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Member Role</label>
                  <select
                    name="memberRole"
                    value={editMemberData.memberRole}
                    onChange={handleEditMemberData}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditMemberId(null)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editTeamId && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setEditTeamId(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
              >X</button>
              <h2 className="text-white text-xl font-bold mb-6">Edit Team</h2>
              <form onSubmit={submitEditTeam} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editTeamData.name}
                  onChange={handleEditTeamData}
                  placeholder="Team Name"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <label className="text-white font-semibold">Leader</label>
                <input
                  type="text"
                  name="leader.name"
                  value={editTeamData.leader.name}
                  onChange={handleEditTeamData}
                  placeholder="Leader Name"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="email"
                  name="leader.email"
                  value={editTeamData.leader.email}
                  onChange={handleEditTeamData}
                  placeholder="Leader Email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                {editTeamData.leader.email && !users.some(user => user.email.toLowerCase() === editTeamData.leader.email.toLowerCase()) && (
                  <div className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    This email is not registered as a user
                  </div>
                )}
                <input
                  type="text"
                  name="leader.codeforces"
                  value={editTeamData.leader.codeforces}
                  onChange={handleEditTeamData}
                  placeholder="Leader Codeforces ID"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                />
                <label className="text-white font-semibold">Teammate 1</label>
                <input
                  type="text"
                  name="teammate1.name"
                  value={editTeamData.teammate1.name}
                  onChange={handleEditTeamData}
                  placeholder="Teammate 1 Name"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="email"
                  name="teammate1.email"
                  value={editTeamData.teammate1.email}
                  onChange={handleEditTeamData}
                  placeholder="Teammate 1 Email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="text"
                  name="teammate1.codeforces"
                  value={editTeamData.teammate1.codeforces}
                  onChange={handleEditTeamData}
                  placeholder="Teammate 1 Codeforces ID"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                />
                {editTeamData.teammate1.email && !users.some(user => user.email.toLowerCase() === editTeamData.teammate1.email.toLowerCase()) && (
                  <div className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    This email is not registered as a user
                  </div>
                )}
                <label className="text-white font-semibold">Teammate 2</label>
                <input
                  type="text"
                  name="teammate2.name"
                  value={editTeamData.teammate2.name}
                  onChange={handleEditTeamData}
                  placeholder="Teammate 2 Name"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="email"
                  name="teammate2.email"
                  value={editTeamData.teammate2.email}
                  onChange={handleEditTeamData}
                  placeholder="Teammate 2 Email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                  required
                />
                {editTeamData.teammate2.email && !users.some(user => user.email.toLowerCase() === editTeamData.teammate2.email.toLowerCase()) && (
                  <div className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    This email is not registered as a user
                  </div>
                )}
                <input
                  type="text"
                  name="teammate2.codeforces"
                  value={editTeamData.teammate2.codeforces}
                  onChange={handleEditTeamData}
                  placeholder="Teammate 2 Codeforces ID"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                />
                <select
                  name="payment.status"
                  value={editTeamData.payment.status}
                  onChange={handleEditTeamData}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white"
                >
                  <option value="pending">pending</option>
                  <option value="incomplete">incomplete</option>
                  <option value="accepted">accepted</option>
                  <option value="rejected">rejected</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md mt-4">Save</button>
                <button
                  type="button"
                  onClick={() => setEditTeamId(null)}
                  className="absolute  right-4 text-gray-400 hover:text-white text-xl font-bold"
                >X</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

export default AdminPage;