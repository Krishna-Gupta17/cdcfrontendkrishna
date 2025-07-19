import React from "react";
import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import placeholder from "../assets/image11.png";
import insta from "../assets/socialmedia/insta.png";
import tele from "../assets/socialmedia/telegram.png";
import youtube from "../assets/socialmedia/youtube.png";
import linkedin from "../assets/socialmedia/linkedin.png";

const reviews = [
    {
        name: "Aditi Rai",
        batch: "CSE'28",
        description: "The Coders and Developers Club provides a collaborative environment for building skills, share knowledge, and grow together.",
        image: placeholder
    },
    {
        name: "Sahil Singh",
        batch: "CSE'27",
        description: "This club encourages collaboration and learning, offering a great opportunity for developers to share ideas.",
        image: placeholder
    },
    {
        name: "Yashvardhan",
        batch: "CSE'27",
        description: "I love how the club brings together people from all levels of experience, allowing everyone to learn from each other.",
        image: placeholder
    },
    {
        name: "Devang Agarwal",
        batch: "CSE'27",
        description: "The Coders and Developers Club offers a unique opportunity to work with like-minded individuals and learn from experts.",
        image: placeholder
    },
    {
        name: "Ayushi",
        batch: "CSE'27",
        description: "This club is a great place for anyone interested in tech. It provides a collaborative atmosphere where members can develop their coding skills.",
        image: placeholder
    },
    {
        name: "Ankit Raj",
        batch: "IT'28",
        description: "Community provides one of the best environment for coding and development. The events are highly involving and provides a great opportunity to learn.",
        image: placeholder
    }
];

const Review=()=>{

    const [groupIndex, setGroupIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setGroupIndex((prev) => (prev + 1) % 2); 
                setFade(true);
            }, 1500);
        }, 13000);

        return () => clearInterval(interval);
    }, []);

    const visibleReviews = reviews.slice(groupIndex * 3, groupIndex * 3 + 3);

    return(
        <div className="relative bg-transparent w-full h-auto">
            <h2 className="text-white text-center font-inter font-bold text-3xl sm:text-4xl custom-md2:text-5xl custom-md3:text-6xl mt-10">What Others Think About Us
            </h2>
            
            <div
                className={`grid custom-md2:grid-cols-3 justify-items-center gap-6 my-7 mx-14 transition-opacity duration-[1500ms] ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
            >
                {visibleReviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        name={review.name}
                        batch={review.batch}
                        description={review.description}
                        image={review.image}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:hidden justify-items-center gap-6 m-7">
                <ReviewCard
                    name={reviews[0].name}
                    batch={reviews[0].batch}
                    description={reviews[0].description}
                    image={reviews[0].image}
                />
            </div>

            <div>
                <h2 className="text-white text-center font-inter font-bold text-3xl sm:text-4xl custom-md2:text-5xl custom-md3:text-6xl mt-14">Join Our Community</h2>
                <div className=" grid grid-cols-4 gap-10% m-[4%] justify-items-center hidden sm:grid">
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
                        <a href="https://www.instagram.com/cdc.mmmut/" target=" ">
                        <img src={insta} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">1.2K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
                        <a href="https://www.linkedin.com/company/codechef-mmmut-chapter/" target=" ">
                        <img src={linkedin} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">2K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
                        <a href="https://t.me/+q7L9GAuUxoNiMjZl" target=" ">
                        <img src={tele} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">1.1K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[155px] rounded-xl m-4 h-[120px] custom-md3:h-[161px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg grid justify-items-center">
                        <a href="http://www.youtube.com/@cdcmmmut" target=" ">
                        <img src={youtube} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[85px] custom-md3:h-[85px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-3xl text-white mt-2">300+</h4>
                    </div>
                </div>
                <div className=" grid grid-cols-2 m-[2%] justify-items-center sm:hidden">
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <a href="https://www.instagram.com/cdc.mmmut/" target=" ">
                        <img src={insta} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-xl text-white mt-1">1.2K+</h4>
                    </div>
                     <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <a href="https://www.linkedin.com/company/codechef-mmmut-chapter/" target=" ">
                        <img src={linkedin} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-xl text-white mt-1">2K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <a href="https://t.me/+q7L9GAuUxoNiMjZl" target=" ">
                        <img src={tele} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-xl text-white mt-1">1.1K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[90px] rounded-xl m-4 h-[90px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <a href="http://www.youtube.com/@cdcmmmut" target=" ">
                        <img src={youtube} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[40px] h-[40px]"/>
                        </a>
                        <h4 className="text-center font-inter font-bold text-xl text-white mt-1">300K+</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;