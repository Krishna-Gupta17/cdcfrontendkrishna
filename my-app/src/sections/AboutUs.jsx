import React, { useRef } from "react";
import Aim from "../assets/aboutus/Aim.png";
import Mission from "../assets/aboutus/Mission.png";
import Vision from "../assets/aboutus/Vision.png";
const features = [
  {
    title: "AIM",
    icon: Aim,
    desc: "We aim to enhance coding skills and foster innovation through interactive events and workshops. We provide a platform for hands-on learning, collaboration and preparation for future tech challenges.",
  },
  {
    title: "MISSION",
    icon: Mission,
    desc: "Our mission is to foster the growth and excellence of our college's dynamic coding culture. We strive to build a thriving community that inspires creativity, teamwork and a deep passion for technology.",
  },
  {
    title: "VISION",
    icon: Vision,
    desc: "Our vision is to empower students in coding and technology by fostering continuous innovation, meaningful collaboration and hands-on learning, shaping skilled and confident developers for the tech industry's future.",
  },
];

export default function AboutUs() {
  const cardRef = useRef(null);
  const animationRef = useRef(null);

  const handleMouseMove = (e) => {
    cancelAnimationFrame(animationRef.current);

    animationRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 4;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transition = "transform 0.5s ease";
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;

    setTimeout(() => {
      card.style.transition = "";
    }, 500);
  };

  const loopedFeatures = [...features, ...features];

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center bg-transparent px-4 py-[2%]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          w-full max-w-7xl
          custom-md4:h-[80vh]
          h-[67vh]
          rounded-3xl
          bg-transparent
          backdrop-blur-2xl
          transition-transform duration-200 ease-out
          hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)]
          custom-md4:p-10
          p-0
          flex flex-col custom-md1:flex-row gap-10
          will-change-transform
          overflow-hidden
          mt-20
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Left Side */}
        <div className="hidden custom-md4:block flex-1 mt-24 mr-4 text-white">
          <h2 className="text-[4.05vw] text-center font-bold mb-3">About Us</h2>
          <p className="text-[1.62vw] text-justify text-white/90 leading-tight" style={{fontFamily:'Coolvetica'}}>
            The Coders & Developers Club MMMUT fosters a strong coding culture by empowering students
            with continuous learning, tech awareness, and active contest involvement. Collaborating
            with faculty and alumni, we equip members with industry-relevant skills, inspiring innovation,
            teamwork, and technical excellence.
          </p>
        </div>
        <div className="custom-md4:hidden flex-1 px-4 pt-4 text-white">
          <h2 className="text-2xl sm:text-3xl text-center font-bold mb-3">About Us</h2>
          <p className="text-sm sm:text-base text-justify text-white/90 leading-snug" style={{ fontFamily: 'Coolvetica' }}>
            The Coders & Developers Club MMMUT fosters a strong coding culture by empowering students
            with continuous learning, tech awareness, and active contest involvement. Collaborating
            with faculty and alumni, we equip members with industry-relevant skills, inspiring innovation,
            teamwork, and technical excellence.
          </p>
        </div>

        <div className="flex-1 overflow-hidden h-[100%]  mt-0 relative">
          <div className="hidden custom-md4:block absolute top-0 left-0 w-full animate-verticalLoop ">
            {loopedFeatures.map((item, idx) => (
              <>
              <div key={idx} className="items-start mb-[6%] mt-0 h-[50%] w-[530px] px-2">
                <div className="flex justify-center items-center mb-[2%]">
                <div><img src={item.icon} alt="icon" className="w-[3vw]"/></div>
                <div>
                  <h3 className="text-[2.6vw] font-semibold text-white">{item.title}</h3>
                </div>
                </div>
                <div className=" flex justify-center">
                  <p className="w-[475px] text-white/80 text-justify text-[1.5vw] leading-tight" style={{fontFamily:'Coolvetica'}}>{item.desc}</p>
                </div>
                <div className="mt-[5%] w-full"><hr className="border-spacing-0 border-white-500 w-100 mx-auto " /></div>
              </div>
              
              </>
            ))}
          </div>
          <div className="custom-md4:hidden absolute top-0 left-0 h-full flex animate-horizontalLoop px-2">
            {loopedFeatures.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-[80vw] sm:w-[70vw] px-4 mr-4">
                <div className="flex items-center mb-2">
                  <img src={item.icon} alt={item.title} className="w-6 h-6 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-white/80 text-justify leading-snug" style={{ fontFamily: 'Coolvetica' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}