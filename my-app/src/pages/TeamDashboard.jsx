import React from "react";
import UserCard from "../components/UserCard";

const TeamDashboard=()=>{
    return(
        <>
        <div className="m-4 mt-14 space-y-4">
            <h2 className="font-inter text-white text-4xl font-bold text-center">
                Synatx Seige
            </h2>
            <p className="text-2xl font-normal justify-center text-white m-5 ml-16 mr-16" style={{fontFamily:'Coolvetica'}}>
                Syntax Siege is a week-long event featuring five days of offline coding classes to build programming skills. On day six, participants compete in an online contest, culminating in an engaging offline contest on the final day.
            </p>
            <div>
                <h2 className="font-inter font-bold text-3xl mt-12 text-white text-center">
                    Team Name
                </h2>
                <div>
                    <UserCard/>
                </div>
            </div>
        </div> 
        </>
    )
}

export default TeamDashboard;