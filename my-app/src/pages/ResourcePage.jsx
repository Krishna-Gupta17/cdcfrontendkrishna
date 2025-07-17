import React from "react";
import ResourceCard from "../components/ResourceCard";
import imgCP from "../assets/resources/Competitive-Programming.png"; 
import imgDSA from "../assets/resources/DataStructuresandAlgorithms.png"; 
import imgWebDev from "../assets/resources/webdev2.png"; 
import imgcyber from "../assets/resources/Cyber-security.png"; 
import imgAiML from "../assets/resources/AiML.png";
import imgGraphic from "../assets/resources/Graphic-Designing.png";
import imgWeb3 from "../assets/resources/blockchain-web3.png";

const ResourcePage = () => {
  // array of resource cards
  const resources = [
    {
      title: "COMPETITIVE PROGRAMMING",
      description:
      "Sharpen your logic, master algorithms, and solve real-time coding challenges — that's the power of Competitive Programming!",
      image: imgCP,
    },
    {
      title: "DATA STRUCTURES AND ALGORITHMS",
      description:
      "Master DSA to crack coding problems, ace tech interviews, and build the mindset of a real-world software Engineer!",
      image: imgDSA,
    },
    {
      title: "WEB DEVELOPMENT",
      description:
      "Bring ideas to life— From HTML to React, build stunning websites, smart apps, and powerful user experiences from scratch!",
      image: imgWebDev,
    },
    {
      title: "CYBER SECURITY",
      description:
      "Hack the hackers! Cybersecurity is all about outsmarting threats, guarding data, and being the shield of the digital world.",
      image: imgcyber,
    },
    {
      title: "AI AND MACHINE LEARNING",
      description:
      "Train machines to think, learn, and evolve—AI & ML are how you shape the future with nothing but data and logic.",
      image: imgAiML,
    },
    {
      title: "GRAPHIC DESIGNING",
      description: 
      "Pixels with purpose, colors with chaos— graphic design transforms wild ideas into unforgettable visuals.",
      image: imgGraphic,
    },
    {
      title: "BLOCKCHAIN AND WEB3",
      description:
        "Welcome to the future! Blockchain & Web3 are rewriting the internet—decentralized, secure, and powered by you, not corporations.",
      image: imgWeb3,
    },
  ];

  return (
    <div className="mb-10">
      <div className="flex flex-col items-center">
        {/* Resource Heading */}
        <h1 className="text-3xl md:text-4xl text-white custom-lg:text-[4vw] mb-4 custom-lg:mb-12 mt-[1.1vw] font-bold font-inter items-center ">
          Resources
        </h1>
        {/* Resources short Briefing */}
        <p className="leading-none text-xl md:text-2xl custom-lg:text-[2.2vw]  text-white text-center [word-spacing:0.6rem] mb-8 custom-lg:mb-14 mx-2 md:mx-12 px-4 md:px-6 items-center" style={{fontFamily:'Coolvetica'}}>
          Whether you're just getting started or looking to deepen your
          knowledge, these resources are here to inspire, educate, and empower.
          Here you'll find a thoughtfully curated selection of tools, articles,
          guides, and references designed to support your journey.
        </p>
      </div>
      <div className="flex justify-center">
      <div className="flex flex-col gap-10">  {/* gap-1o is for spacing b/w 2 cards (vertically) */}

        {/* Resource Cards in alternate styles and transitions using map method  */}
        {resources.map((res, index) => (
          <ResourceCard
            index={index}
            key={index}
            title={res.title}
            description={res.description}
            image={res.image}
            reverse={index % 2 !== 0} // alternate card layout logic
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ResourcePage;
