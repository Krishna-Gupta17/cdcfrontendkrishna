import React from "react";
// run this command on terminal: npm install react-router-dom
import { useNavigate } from "react-router-dom";
// run this command on terminal: npm install framer-motion
import { motion } from "framer-motion";

const ResourceCard = ({ title, description, image, reverse, index}) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    // this will now navigate to roadmap page
    navigate(`/roadmap/${encodeURIComponent(title)}`);
  };
  return (
    // for animation and transition
    <motion.div
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.15, }}
      viewport={{ once: false, amount: 0.3 }}
      className="relative"
    >
      {/* Resource card */}
      <div
        className={`flex flex-row ${
          reverse ? "flex-row-reverse" : ""
        } justify-between border-2 w-[85vw] border-[#6568ff]/50 bg-[#6568FF]/10 font-inter font-medium text-white mt-2 custom-lg:h-[15vw] mb-2 mx-4 md:mx-16 px-4 md:px-6 py-4 md:py-5 rounded-3xl items-center`}
      >
        {/* Text Section : Tittle and Description */}
        <div className="w-4/5 mx-4">
          <h3 className="text-xl custom-lg:text-[1.8vw] font-bold font-inter text-white mb-2">
            {title}
          </h3>
          <p className="text-sm custom-lg:text-[1.3vw] text-white/80 text-justify mb-4">
            {description}
          </p>

          {/* Learn more Button  (Learn more button below description)*/}
            <button
              onClick={handleLearnMore}
              className="mt-1 bg-white text-black px-3 py-1 text-base custom-lg:text-[1.3vw] rounded-3xl font-semibold hover:bg-[#9294f9] transition duration-300"
            >
              Learn More
            </button>
        </div>

        {/* Image Section */}
        <div className="md:w-[280px] flex flex-col items-center">
          <img
            loading="lazy"
            src={image}
            alt={title}
            className="w-[220px] h-[140px] md-h-[140px] md:w-[220px] custom-lg:w-[20vw] custom-lg:h-[12vw] rounded-md object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
