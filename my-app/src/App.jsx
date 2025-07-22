import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MemberProfile from "./pages/MemberProfile";
import Login from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import ResourcePage from "./pages/ResourcePage.jsx";
import Home from "./pages/Home.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import RoadmapPage from "./pages/RoadmapPage.jsx";
import Members from "./pages/Members.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import EventRegisteration from "./pages/EventRegisteration.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import AdminPage from "./pages/adminpage.jsx";
import TeamPage from "./pages/TeamPage.jsx"
import MembersList from "./components/memberPage/MembersList.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Eventsection from "./sections/Eventsection.jsx";
import Blog from "./pages/BlogsPage.jsx";
function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/admin" element={<AdminPage />} />
        <Route path="/event" element={<EventsPage />} />
        <Route path="/resources" element={<ResourcePage />} />
        <Route path="/team" element={<Members />} />
        <Route path="/members/:id" element={<MemberProfile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/roadmap/:domainTitle" element={<RoadmapPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<EventRegisteration/>}/>
        <Route path="/eventpage/:eventId" element={<EventsPage/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/members/blog/:id" element={<Blog />} />
        <Route path="/teams" element={<TeamPage />}>
          <Route index element={<MembersList year="2025" />} />
          <Route path=":year" element={<MembersList />} />
        </Route>
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;