// TeamDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/UserCard";

const TeamDashboard = () => {
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // or cookies
          },
        });
        setTeam(res.data);
      } catch (error) {
        if (error.response?.status === 403) {
          navigate("/event-registration"); // redirect here if no team
        }
      }
    };
    fetchTeam();
  }, [navigate]);

  return team ? (
    <div>
      <h2>{team.name}</h2>
      {team.members.map((m) => (
        <UserCard key={m._id} user={m} />
      ))}
    </div>
  ) : null;
};

export default TeamDashboard;
