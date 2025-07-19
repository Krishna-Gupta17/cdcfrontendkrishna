import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/navbar/Monochromewhite_CDC.png";
import home from "../assets/homeicon.png";
import event from "../assets/image20.png";
import members from "../assets/image19.png";
import contact from "../assets/image21.png";
import insta from "../assets/socialmedia/insta.png";
import tele from "../assets/socialmedia/telegram.png";
import youtube from "../assets/socialmedia/youtube.png";
import linkedin from "../assets/socialmedia/linkedin.png";
const Footer = () =>{
    return(
        <footer className= "text-white px-6 py-12 flex  justify-between items-start gap-10 bg-gradient-to-r from-[#0D0D2B] to-[#14143D]">
            <div className="hidden md:flex flex-row w-full"> 
                <div className="flex w-full md:w-[40%] gap-[30%]">
                    <div className="flex space-x-3 -mt-5">
                        <div>
                            <img src={logo} alt="" className="w-[34px] custom-md3:w-[42px]" />
                        </div>
                        <div>
                            <div className="space-y-3">
                                <h1 className="text-[24px] custom-md3:text-[26px] font-inter font-bold leading-[1.2]">CODERS AND <br/>
                                    DEVELOPERS CLUB</h1>
                                <p className="font-inter font-semibold text-[18px] custom-md3:text-[16px] leading-[1.2]">Madan Mohan Malaviya University of<br />
                                    Technology,<br />
                                    Gorakhpur, Uttar Pradesh
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-px h-25 bg-gray-500" />
                <div className="flex justify-center w-full md:w-[40%] custom-md3:w-[35%] ">
                    <div className="-mt-5 w-full">
                        <h3 className="font-inter text-[16px] custom-md3:text-[18px] font-bold mb-[6%] text-center ">NAVIGATION</h3>
                        <div className="w-full">
                            <ul className=" text-base font-inter justify-items-center">
                                <div className="space-y-8 w-full">
                                    <div className="flex justify-center gap-[17%]">
                                        <Link to="/">
                                        <li className="flex items-center gap-2 transition-transform duration-300 hover:scale-125">
                                            <img src={home} alt="home" className="w-[24px] custom-md3:w-[33px]"/>
                                            HOME 
                                        </li>
                                        </Link>
                                        <Link to="/team">
                                        <li className="flex items-center gap-2 transition-transform duration-300 hover:scale-125">
                                            <img src={members} alt="members" className="w-[24px] custom-md3:w-[33px]"/>
                                            MEMBERS
                                        </li>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center gap-[17%]">
                                        <Link to="/event">
                                        <li className="flex items-center gap-2 transition-transform duration-300 hover:scale-125"> 
                                            <img src={event} alt="events" className="w-[24px] custom-md3:w-[33px]"/>
                                            EVENT
                                        </li>
                                        </Link>
                                        <Link to="/contact">
                                        <li className="flex items-center gap-2 transition-transform duration-300 hover:scale-125">
                                            <img src={contact} alt="contact" className="w-[24px] custom-md3:w-[33px]"/>
                                            CONTACT
                                        </li>
                                        </Link>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-px h-25 bg-gray-500" />
                <div className="w-full md:w-[22%] custom-md3:w-[27%] flex justify-center">
                <div className="-mt-5 ">
                    <h3 className="font-inter text-[16px] custom-md3:text-[18px] font-bold mb-[28%] text-center ">REACH US</h3>
                    <div className="grid grid-cols-2 gap-[40%]">
                        <div className="w-[40px]">
                            <a href="https://www.linkedin.com/company/codechef-mmmut-chapter/" target=" ">
                            <img src={linkedin} alt="" className="w-[33px] transition-transform duration-300 hover:scale-125" />
                            </a>
                        </div>
                        <div className="w-[40px]">
                            <a href="http://www.youtube.com/@cdcmmmut" target=" ">
                            <img src={youtube} alt="" className="w-[33px] transition-transform duration-300 hover:scale-125" />
                            </a>
                        </div>
                        <div className="w-[40px]">
                            <a href="https://www.instagram.com/cdc.mmmut/" target=" ">
                            <img src={insta} alt="" className="w-[33px] transition-transform duration-300 hover:scale-125" />
                            </a>
                        </div>
                        <div className="w-[40px]">
                            <a href="https://t.me/+q7L9GAuUxoNiMjZl" target=" ">
                            <img src={tele} alt="" className="w-[33px] transition-transform duration-300 hover:scale-125" />
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            {/*mobile view*/}
            <div className="md:hidden flex flex-col w-full"> 
                    <div className="flex space-x-3 -mt-5">
                        <div>
                            <img src={logo} alt="" className="w-[33px]" />
                        </div>
                        <div>
                            <div className="space-y-2">
                                <h1 className="text-[24px] font-inter font-bold leading-[1.2]">CODERS AND DEVELOPERS CLUB</h1>
                                <p className="font-inter text-[18px] custom-md3:text-[22px] leading-[1.2]">Madan Mohan Malaviya University of<br />
                                    Technology,<br />
                                    Gorakhpur, Uttar Pradesh
                                </p>
                            </div>
                     </div>
                </div>
                <div className="flex flex-row mt-10 w-full justify-center">
                    <div className="w-[60%]">
                        <h3 className="font-inter text-[16px] custom-md3:text-[20px] font-bold mb-[6%] text-center ">NAVIGATION</h3>
                        <div className="w-full">
                            <ul className=" text-sm font-inter justify-items-center">
                                <div className="space-y-8 w-full">
                                    <div className="flex justify-center gap-[17%]">
                                        <Link to="/">
                                        <li className="flex items-center gap-2">
                                            <img src={home} alt="home" className="w-[20px] sm:w-[24px] "/>
                                            HOME
                                        </li>
                                        </Link>
                                        <Link to="/team">
                                        <li className="flex items-center gap-2">
                                            <img src={members} alt="members" className="w-[20px] sm:w-[24px]"/>
                                            MEMBERS
                                        </li>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center gap-[17%]">
                                        <Link to="/event">
                                        <li className="flex items-center gap-2"> 
                                            <img src={event} alt="events" className="w-[20px] sm:w-[24px]"/>
                                            EVENT
                                        </li>
                                        </Link>
                                        <Link to="/contact">
                                        <li className="flex items-center gap-2"> 
                                            <img src={contact} alt="contact" className="w-[20px] sm:w-[24px]"/>
                                            CONTACT
                                        </li>
                                        </Link>
                                    </div>
                                </div>
                            </ul>
                        </div>
                </div>
                <div className="w-px h-25 bg-gray-500 ml-[4%] mr-[4%]" />
                <div className="w-[30%] justify-items-center">
                    <h3 className="font-inter text-[16px] custom-md3:text-[20px] font-bold mb-[10%] text-center ">REACH US</h3>
                    <div className="grid grid-cols-2 gap-[30%] w-[80%] justify-items-center">
                        <div className="w-[30px] sm:w-[40px]">
                                <a href="https://www.linkedin.com/company/codechef-mmmut-chapter/" target=" ">
                                    <img src={linkedin} alt="" className="w-[24px] sm:w-[33px]" />
                                </a>
                        </div>
                        <div className="w-[30px] sm:w-[40px]">
                                <a href="http://www.youtube.com/@cdcmmmut" target=" ">
                                    <img src={youtube} alt="" className="w-[24px] sm:w-[33px]" />
                                </a>
                        </div>
                        <div className="w-[30px] sm:w-[40px]">
                                <a href="https://www.instagram.com/cdc.mmmut/" target=" ">
                                    <img src={insta} alt="" className="w-[24px] sm:w-[33px]" />
                                </a>
                        </div>
                        <div className="w-[30px] sm:w-[40px]">
                                <a href="https://t.me/+q7L9GAuUxoNiMjZl" target=" ">
                                    <img src={tele} alt="" className="w-[24px] sm:w-[33px]" />
                                </a>
                        </div>
                    </div>
                </div>
                </div>
                </div>
        </footer>
    )
}

export default Footer;