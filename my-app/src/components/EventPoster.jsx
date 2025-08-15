import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Code2, Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventPoster = ({ event }) => {
  const posterRef = useRef(null);
  const titleRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const poster = posterRef.current;
    const title = titleRef.current;
    const glow = glowRef.current;
    const particles = particlesRef.current;

    if (!poster || !title || !glow || !particles) return;

    // Initial setup
    gsap.set(title, { y: 20, opacity: 0 });
    gsap.set(['.event-detail'], { x: -30, opacity: 0 });
    gsap.set(['.floating-particle'], { scale: 0, rotation: 0 });

    // Entrance animation
    const tl = gsap.timeline();

    tl.to(glow, {
      scale: 1.2,
      opacity: 0.8,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    })
      .to(title, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, 0.3)
      .to('.event-detail', {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, 0.6)
      .to('.floating-particle', {
        scale: 1,
        rotation: 360,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, 0.8);

    // Continuous floating animation for particles
    gsap.to('.floating-particle', {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.3
    });

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(poster, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to('.neon-text', {
        textShadow: '0 0 20px #8B5CF6, 0 0 40px #8B5CF6, 0 0 60px #8B5CF6',
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(poster, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to('.neon-text', {
        textShadow: '0 0 10px #8B5CF6, 0 0 20px #8B5CF6',
        duration: 0.3
      });
    };

    poster.addEventListener('mouseenter', handleMouseEnter);
    poster.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      poster.removeEventListener('mouseenter', handleMouseEnter);
      poster.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={posterRef}
      className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-2xl overflow-hidden border border-purple-500/30 cursor-pointer"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
        `
      }}
    >
      {/* Animated background glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-50"
      />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Cyberpunk grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-purple-300 text-sm font-medium mb-2 tracking-wider">
            CODERS & DEVELOPERS CLUB PRESENTS
          </div>
          <div
            ref={titleRef}
            className="neon-text text-3xl font-bold text-white mb-2"
            style={{
              textShadow: '0 0 10px #8B5CF6, 0 0 20px #8B5CF6',
              fontFamily: 'monospace',
              letterSpacing: '2px'
            }}
          >
            {event.title.toUpperCase()}
          </div>
          <div className="text-purple-400 text-sm">
            {event.type}
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="event-detail flex items-center text-white text-sm">
            <Calendar className="w-4 h-4 mr-3 text-purple-400" />
            <span>{event.date}</span>
          </div>

          <div className="event-detail flex items-center text-white text-sm">
            <Clock className="w-4 h-4 mr-3 text-blue-400" />
            <span>Duration: {event.duration}</span>
          </div>

          <div className="event-detail flex items-center text-white text-sm">
            <MapPin className="w-4 h-4 mr-3 text-green-400" />
            <span>Platform: {event.venue.online.platform}</span>
          </div>

          <div className="event-detail flex items-center text-white text-sm">
            <Users className="w-4 h-4 mr-3 text-pink-400" />
            <span>Team Size: {event.registration.teamSize}</span>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Code2 className="w-5 h-5 text-purple-400 opacity-60" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent" />
          </div>
          <div className="text-xs text-purple-300 font-mono">
            @cdc.mmmut
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-purple-500/50" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-blue-500/50" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-green-500/50" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-pink-500/50" />
    </div>
  );
};

export default EventPoster;
