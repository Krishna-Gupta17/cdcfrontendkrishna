// import React from "react";
// import { useParams } from "react-router-dom";
// import eventDes from "../data/eventDes";
// import eventdata from "../data/event";
// import timelineData from "../data/timelineData";
// import EventCard from "../components/EventPage/EventCard";
// import StatsCard from "../components/EventPage/StatsCard";
// import WinnerCard from "../components/EventPage/WinnerCard";
// import EventDetails from "../components/EventDetails";
// import { motion } from "framer-motion";

// const EventsPage = () => {
//   const { eventId } = useParams();
//   const currentEvent = eventDes.find((event) => event.id === eventId);

//   if (!currentEvent) {
//     return (
//       <div className="text-white text-center mt-20 text-2xl">
//         Event not found.
//       </div>
//     );
//   }

//   // Filter timeline for only this event
//   const filteredTimeline = timelineData.filter((item) => item.id === eventId);

//   // Group ranks by year
//   const timelineByYear = {};
//   filteredTimeline.forEach((item) => {
//     if (!timelineByYear[item.year]) {
//       timelineByYear[item.year] = {
//         stats: item.stats,
//         ranks: [],
//       };
//     }
//     timelineByYear[item.year].ranks.push(item);
//   });

//   const sortedYears = Object.keys(timelineByYear).sort((a, b) => b - a);

//   return (
//     <div className="bg-transparent text-white font-inter min-h-screen pb-20 relative overflow-x-hidden">
//       {/* Event Description */}
//       <div className="flex items-center justify-center mt-10 px-4">
//         <EventCard event={currentEvent} />
//       </div>

//       <div className="relative cursor-pointer w-fit mx-auto mt-1 mb-16">
//         {/* 'REGISTER */}
//         <a
//           href="/register"

//           className="
//             relative z-10
//             bg-red-500 text-white font-bold text-2xl
//             py-4 px-12 inline-block
//             rounded-lg
//           "
//         >
//           REGISTER
//         </a>

//         {/* 'NOW' */}
//         <a
//           href="/register"
//           className="
//             absolute top-full left-1/2 -translate-x-1/2 -mt-2
//             w-auto
//             bg-gray-400 text-black font-bold text-2xl
//             py-2 px-8
//             flex items-center justify-center
//             rounded-lg
//             z-20
//             hover:bg-gray-500 transition-colors duration-300
//           "
//         >
//           NOW
//         </a>
//       </div>


//       {/* Render timeline only if data exists */}
//       {filteredTimeline.length > 0 && (
//         <>
//           {/* Title */}
//           <h2 className="text-4xl font-bold text-center mt-20 mb-16">
//             Winners Through the Years
//           </h2>
//           {/* Timeline Section */}
//           <div className="relative w-full max-w-7xl mx-auto px-4 pb-10">
//             {/* Vertical Line */}
//             <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-white/40 z-0" />

//             {sortedYears.map((year, index) => (
//               <React.Fragment key={year}>
//                 {/* Year Point */}
//                 <div className="relative flex justify-center mb-1">
//                   <div className="bg-white text-black text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center border-4 border-black z-20">
//                     {year}
//                   </div>
//                 </div>

//                 {/* Cards between this year and the next */}
//                 <motion.div
//                   className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-x-20 mb-8"
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: false, amount: 0.3 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <div className="md:w-1/2 md:pr-10 flex justify-end mb-6 md:mb-0">
//                     <StatsCard stats={timelineByYear[year].stats} />
//                   </div>

//                   <div className="md:w-1/2 flex justify-start pl-8">
//                     <WinnerCard eventId={eventId} year={year} />
//                   </div>
//                 </motion.div>

//               </React.Fragment>
//             ))}
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full z-20"></div>
//           </div>

//         </>
//       )}
//     </div>
//   );
// };

// export default EventsPage;

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Users, Trophy, ArrowRight, Code2 } from 'lucide-react';
import { events } from '../data/eventdetails';
import EventPoster from './EventPoster';
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase';

gsap.registerPlugin(ScrollTrigger);

const EventsPages = () => {
  const headerRef = useRef(null);
  const eventsGridRef = useRef(null);
  const ctaRef = useRef(null);
     const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const user = auth.currentUser;
      if(!user) navigate("/login")
      const token = await user.getIdToken();

      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/team-status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.hasTeam) {
        navigate("/dashboard");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.error("API Error:", error);
      // Optionally show an error message instead of navigating
    }
  };

  useEffect(() => {
    const header = headerRef.current;
    const eventsGrid = eventsGridRef.current;
    const cta = ctaRef.current;

    if (!header || !eventsGrid || !cta) return;

    // Header animation
    gsap.fromTo(
      header.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );

    // Events grid animation
    gsap.fromTo(
      '.event-card',
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: eventsGrid,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // CTA animation
    gsap.fromTo(
      cta,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cta,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Floating animation for header icon
    gsap.to('.floating-icon', {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
        <div
          ref={headerRef}
          className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center"
        >
          <div className="flex justify-center items-center mb-6">
            <Code2 className="floating-icon w-12 h-12 text-purple-400 mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Events
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join our competitive programming events designed to challenge your coding skills,
            foster innovation, and connect you with like-minded programmers.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div
        ref={eventsGridRef}
        className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Event Poster */}
              <div className="relative overflow-hidden">
                <EventPoster event={event} />
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>

                {/* Event Meta Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.duration}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {event.registration.teamSize}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {event.difficulty}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    to={`/eventpage/${event.id}`}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center group"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                  onClick={handleClick}
                  className="px-6 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white rounded-lg font-medium transition-all duration-200">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div ref={ctaRef} className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Code?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our coding community and participate in challenging competitions that will
            enhance your programming skills and connect you with fellow developers.
          </p>
          
<Link to="https://discord.gg/KaDf3ZYahy">
  <button
    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 hover:transform hover:scale-105"
  >
    Join Our Society
  </button>
</Link>

        </div>
      </div>
    </div>
  );
};

export default EventsPages;
