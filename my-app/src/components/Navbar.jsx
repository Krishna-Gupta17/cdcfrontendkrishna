import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/navbar/Monochromewhite_CDC.png';
import navbarleft from '../assets/navbar/navbarleft.png';
import discord from '../assets/navbar/discord.png';
import twitter from '../assets/navbar/twitter.png';
import github from '../assets/navbar/github.png';
import instagram from '../assets/navbar/instagram.png';
import navbarright from '../assets/navbar/navbarright.png';
import menu from '../assets/navbar/menu.png';
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);

    // useEffect(() => {
    //     const token = localStorage.getItem('firebaseToken');
    //     if (token) {
    //         setCurrentUser(true);
    //     } else {
    //         const unsubscribe = onAuthStateChanged(auth, (user) => {
    //             setCurrentUser(!!user);
    //         });
    //         return () => unsubscribe();
    //     }
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken(); 
                localStorage.setItem('firebaseToken', token);
                setCurrentUser(true);
            } else {
                localStorage.removeItem('firebaseToken');
                setCurrentUser(false);
            }
        });

        return () => unsubscribe();
    }, []);



    return (
        <nav className="w-full font-inter text-white sticky top-0 z-[1000] backdrop-blur-2xl bg-transparent">
            <div className="hidden custom-mdnavbar:flex items-center justify-between py-0 m-0 h-[32%]">
                <div className="flex space-x-[1.6vw] w-[15%]">
                    <div className=" flex flex-col justify-between w-[36%]">
                        <div className="">
                            <img src={navbarleft} alt="Left" className="w-[90%]" />
                        </div>
                        <div className="h-[4%]"></div>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                        <img src={logo} alt="Logo" className="w-[6.5vw]" />
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <ul class="flex space-x-6 text-[16px] custom-md1:text-[19.3232px] custom-lg:text-[17px] font-bold tracking-wider uppercase">
                        <li><Link to="/" class="hover:text-blue-400">Home</Link></li>
                        <li><Link to="/#events" class="hover:text-blue-400">Events</Link></li>
                        <li><Link to="/resources" class="hover:text-blue-400">Resources</Link></li>
                        <li><Link to="/teams" class="hover:text-blue-400">Teams</Link></li>
                        <li><Link to="/contact" class="hover:text-blue-400">Contact</Link></li>
                        {!currentUser ? (
                            <li><Link to="/login" class="hover:text-blue-400">Login</Link></li>
                        ) : (
                            <li><Link to="/profile" class="hover:text-blue-400">Profile</Link></li>
                        )}
                        { }

                    </ul>
                </div>
                <div className=" w-[20%] flex justify-end relative h-[100%]">
                    <img src={navbarright} alt="Left" className="w-[18vw] h-[100%]" />
                    <div className="absolute top-[40%] right-[35%] flex space-x-[1vw]">
                        <a href="#" class="hover:text-blue-400"> <img src={github} alt="Left" className="w-[1.4vw]" /></a>
                        <a href="#" class="hover:text-blue-400"><img src={discord} alt="Left" className="w-[1.4vw]" /></a>
                        <a href="#" class="hover:text-blue-400"><img src={instagram} alt="Left" className="w-[1.4vw]" /></a>
                        <a href="#" class="hover:text-blue-400"><img src={twitter} alt="Left" className="w-[1.4vw]" /></a>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-full pl-2 pr-3 h-14 custom-mdnavbar:hidden lg:mt-4 md:mt-2 sm-mt:0">
                <img src={logo} alt="Logo" className="h-10 sm:h-16 lg:h-20" />
                <div className="text-xl sm:text-3xl font-bold text-center">
                    Coders & Developers Club
                </div>
                <div className="cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <div className="relative w-6 h-6 cursor-pointer z-[10000]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <span
                            className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1'
                                }`}
                        />
                        <span
                            className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'top-2.5'
                                }`}
                        />
                        <span
                            className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
                                }`}
                        />
                    </div>
                </div>
            </div>
            <div
                className={`fixed top-0 right-0 h-full w-[14%] text-white z-[9999] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white text-2xl font-bold"
                    >
                    </button>
                </div>
                <nav className="flex flex-col items-center space-y-6 mt-8 text-lg font-inter font-semibold h-[50vh]"
                >
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400">Home</Link>
                    <Link to="/#events" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400">Events</Link>
                    <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400">Resources</Link>
                    <Link to="/teams" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400">Teams</Link>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400">Contact</Link>
                    {!currentUser ? (
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400">Login</Link>
                    ) : (
                        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-400">Profile</Link>
                    )}
                </nav>
            </div>
        </nav>
    )
}
export default Navbar;