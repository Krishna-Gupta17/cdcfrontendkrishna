import React, { useState, useEffect } from "react";
import placeholder from "../assets/image11.png";
import insta from "../assets/socialmedia/insta.png";
import tele from "../assets/socialmedia/telegram.png";
import youtube from "../assets/socialmedia/youtube.png";
import linkedin from "../assets/socialmedia/linkedin.png";

const reviews = [
  {
    name: "Aditi Rai",
    batch: "CSE'28",
    description:
      "The Coders and Developers Club provides a collaborative environment for building skills, share knowledge, and grow together.",
    image: placeholder,
  },
  {
    name: "Sahil Singh",
    batch: "CSE'27",
    description:
      "This club encourages collaboration and learning, offering a great opportunity for developers to share ideas.",
    image: placeholder,
  },
  {
    name: "Yashvardhan",
    batch: "CSE'27",
    description:
      "I love how the club brings together people from all levels of experience, allowing everyone to learn from each other.",
    image: placeholder,
  },
  {
    name: "Devang Agarwal",
    batch: "CSE'27",
    description:
      "The Coders and Developers Club offers a unique opportunity to work with like-minded individuals and learn from experts.",
    image: placeholder,
  },
  {
    name: "Ayushi",
    batch: "CSE'27",
    description:
      "This club is a great place for anyone interested in tech. It provides a collaborative atmosphere where members can develop their coding skills.",
    image: placeholder,
  },
  {
    name: "Ankit Raj",
    batch: "IT'28",
    description:
      "Community provides one of the best environment for coding and development. The events are highly involving and provides a great opportunity to learn.",
    image: placeholder,
  },
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === reviews.length - visibleCount ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [visibleCount]);

  return (
    <div className="bg-transparent w-full h-auto p-8 flex flex-col items-center">
      <h2 className="text-white text-center font-inter font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-10">
        What Others Think About Us
      </h2>

      <div className="flex justify-center space-x-16 min-h-[18rem] cursor-pointer">
        {reviews
          .slice(currentIndex, currentIndex + visibleCount)
          .map((review, index) => (
            <div
              key={index}
              className="relative w-72 p-6 rounded-lg bg-[rgba(255,255,255,0.1)] text-center shadow-lg border border-blue-500 hover:bg-white/20 transition-all duration-500 clip-card"
            >
              <style jsx>
                {`
                  .clip-card {
                    clip-path: polygon(
                      0 0,
                      90% 0,
                      100% 10%,
                      100% 100%,
                      10% 100%,
                      0 90%
                    );
                    transition: background-color 0.5s ease;
                  }

                  .clip-card:hover {
                    animation: clipChange 0.5s ease-in-out forwards;
                  }

                  @keyframes clipChange {
                    0% {
                      clip-path: polygon(
                        0 0,
                        90% 0,
                        100% 10%,
                        100% 100%,
                        10% 100%,
                        0 90%
                      );
                    }
                    25% {
                      clip-path: polygon(
                        0 0,
                        95% 0,
                        100% 5%,
                        100% 100%,
                        5% 100%,
                        0 95%
                      );
                    }
                    50% {
                      clip-path: polygon(
                        0 0,
                        98% 0,
                        100% 2%,
                        100% 100%,
                        2% 100%,
                        0 98%
                      );
                    }
                    75% {
                      clip-path: polygon(
                        0 0,
                        99% 0,
                        100% 1%,
                        100% 100%,
                        1% 100%,
                        0 99%
                      );
                    }
                    100% {
                      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                  }
                `}
              </style>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                  {review.image ? (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="text-white text-3xl">👤</div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                <p className="text-gray-400">{review.batch}</p>
                <p className="text-sm text-blue-400 mt-2">{review.description}</p>
              </div>
            </div>
          ))}
      </div>
      <div>
        <h2 className="text-white text-center font-inter font-bold text-3xl sm:text-4xl custom-md2:text-5xl custom-md3:text-6xl mt-14">Join Our Community</h2>
        <div className=" grid grid-cols-4 gap-20 my-[4%] justify-items-center hidden sm:grid">
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
            <a href="https://www.instagram.com/cdc.mmmut/" target=" ">
              <img src={insta} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">1.2K+</h4>
          </div>
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
            <a href="https://www.linkedin.com/company/codechef-mmmut-chapter/" target=" ">
              <img src={linkedin} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">2K+</h4>
          </div>
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
            <a href="https://t.me/+q7L9GAuUxoNiMjZl" target=" ">
              <img src={tele} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">1.1K+</h4>
          </div>
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
            <a href="http://www.youtube.com/@cdcmmmut" target=" ">
              <img src={youtube} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">300+</h4>
          </div>
        </div>
        <div className=" grid grid-cols-2 m-[2%] justify-items-center sm:hidden">
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
            <a href="https://www.instagram.com/cdc.mmmut/" target=" ">
              <img src={insta} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-xl text-white mt-1">1.2K+</h4>
          </div>
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
            <a href="https://www.linkedin.com/company/codechef-mmmut-chapter/" target=" ">
              <img src={linkedin} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-xl text-white mt-1">2K+</h4>
          </div>
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
            <a href="https://t.me/+q7L9GAuUxoNiMjZl" target=" ">
              <img src={tele} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-xl text-white mt-1">1.1K+</h4>
          </div>
          <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
            <a href="http://www.youtube.com/@cdcmmmut" target=" ">
              <img src={youtube} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]" />
            </a>
            <h4 className="text-center font-inter font-bold text-xl text-white mt-1">300K+</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
