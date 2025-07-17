import React from 'react';
import ProfileCard from '../components/Dashboard/ProfileCard';
import TeamCard from '../components/Dashboard/TeamCard';
import EventCard from '../components/Dashboard/EventCard';
import ScoreCard from '../components/Dashboard/ScoreCard';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async (token) => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/dashboard`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    console.warn("Session expired or user not found");
                    handleLogout();
                } else {
                    console.error("Error fetching dashboard:", err);
                }
            } finally {
                setLoading(false);
            }
        };

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken(true);
                localStorage.setItem("userToken", token);
                await fetchUser(token);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);


    const members = ["Member 1", "Member 2", "Member 3", "Member 4"];

    const events = [
        { name: "ORIENTATION", date: "01/01/2025", status: "Completed" },
        { name: "GAME OF CODES", date: "10/07/2025", status: "Ongoing" },
    ];

    return (
        <div>
            {loading ? (
                <div className="text-white text-center mt-10">Loading dashboard...</div>
            ) : user ? (
                <>
                    <ProfileCard user={user} />
                    <TeamCard members={members} />
                    <EventCard events={events} />
                    <ScoreCard />
                </>
            ) : (
                <div className="text-white text-center mt-10">User not signed in</div>
            )}
        </div>
    );
}

export default Dashboard;
