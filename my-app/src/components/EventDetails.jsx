<div className="text-white px-6 py-11 w-full mt-12">
  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center font-bold mb-10">
    Our Events
  </h2>

  <div className="flex flex-col md:flex-row w-full gap-6">
    {/* Left section (Image + Buttons) */}
    <div className="flex flex-col items-center md:items-start md:w-1/3">
      <img
        src={event.image}
        alt="Event"
        className="rounded-lg shadow-lg mb-4 w-full max-w-[220px]"
      />

      <div className="flex flex-col gap-3 w-full max-w-[220px]">
        <Link to={`/eventpage/${event.id}`}>
          <button className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-lg font-inter font-bold px-4 py-2 w-full rounded-xl transition">
            Event Details
          </button>
        </Link>

        <button
          onClick={handleClick}
          className="bg-[#6568ff]/50 hover:bg-[#4944d8] text-white text-lg font-inter font-bold px-4 py-2 w-full rounded-xl transition"
        >
          Register Now
        </button>
      </div>
    </div>

    {/* Right section (Description + Stats) */}
    <div className="flex flex-col flex-1">
      {/* Description */}
      <div className="mb-4">
        <h3 className="bg-white/20 font-inter text-lg sm:text-xl md:text-2xl font-bold text-center px-4 py-2 rounded-xl inline-block">
          Description
        </h3>
        <p
          className="mt-3 text-base sm:text-lg md:text-xl lg:text-2xl text-justify"
          style={{ fontFamily: "Coolvetica" }}
        >
          {event.description}
        </p>
      </div>

      {/* Stats Card */}
      <div className="rounded-2xl border-2 border-[#6568ff]/30 bg-[#6568ff]/20 text-white p-4 md:p-6 flex flex-col md:flex-row justify-around items-center gap-6">
        {/* Workshops */}
        <div className="flex items-center gap-4">
          <img src={man} className="w-8 sm:w-10 md:w-14" />
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              {event.stats?.workshops ?? event.card?.stats?.workshops ?? 0}+
            </div>
            <div className="text-sm sm:text-base md:text-xl font-medium text-purple-200">
              Students Attended <br /> Workshops
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-4">
          <img src={flag} className="w-8 sm:w-10 md:w-14" />
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              {event.stats?.participants ??
                event.card?.stats?.participants ??
                0}
              +
            </div>
            <div className="text-sm sm:text-base md:text-xl font-medium text-purple-200">
              Participated in <br /> Competition
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
