import { Link } from "react-router-dom";
import React, {useRef, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Herosection from "../sections/Herosection";
import AboutUs from "../sections/AboutUs";
import Reviews from "../sections/Reviews";
import Carousel3D from "../sections/Carousel3D";
import Eventsection from "../sections/Eventsection";


const Home = () => {
  const eventRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#events" && eventRef.current) {
      eventRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Herosection />
      <div ref={eventRef}>
        <Eventsection/>
      </div>
      <AboutUs />
      <Carousel3D />
      <Reviews />
    </>
  );
};

export default Home;
