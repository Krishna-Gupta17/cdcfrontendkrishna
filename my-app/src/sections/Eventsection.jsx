// // import React, { useState } from 'react';
// // import EventDetails from '../components/EventDetails';
// // import eventData from '../data/event';
// // import EventWheel from '../components/EventWheel';

// // const Eventsection = () => {
// //   const [currentIndex, setCurrentIndex] = useState(1);

// //   return (
// //     <>
// //       {/* Desktop layout */}
// //       <div
// //         id="events"
// //         className="h-[600px] w-[100vw] flex relative gap-4 custom-md3:gap-20 mb-10 hidden custom-lg3:flex"
// //       >
// //         {/* Wheel */}
// //         <div className="w-[400px] h-[520px]">
// //           <EventWheel
// //             events={eventData}
// //             currentIndex={currentIndex}
// //             setCurrentIndex={setCurrentIndex}
// //           />
// //         </div>

// //         {/* Details */}
// //         <div>
// //           <EventDetails event={eventData[currentIndex]} />
// //         </div>
// //       </div>

// //       {/* Mobile layout */}
// //       <div
// //         id="events"
// //         className="w-[100vw] flex flex-col custom-lg3:hidden"
// //       >
// //         <div>
// //           <EventWheel
// //             events={eventData}
// //             currentIndex={currentIndex}
// //             setCurrentIndex={setCurrentIndex}
// //           />
// //         </div>
// //         <div>
// //           <EventDetails event={eventData[currentIndex]} />
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Eventsection;



// // // Eventsection.jsx
// import React, { useState } from 'react';
// import EventWheel from '../components/EventWheel';
// import eventData from '../data/event';

// const Eventsection = () => {
//   const [currentIndex, setCurrentIndex] = useState(1);

//   return (
//     <section className="w-full min-h-screen flex items-center justify-center px-4 py-8 bg-[#06051C]">
//       <EventWheel
//         events={eventData}
//         currentIndex={currentIndex}
//         setCurrentIndex={setCurrentIndex}
//       />
//     </section>
//   );
// };

// export default Eventsection;

import React, { useState } from 'react';
import EventWheel from '../components/EventWheel';
import eventData from '../data/event';

const Eventsection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section
      id="events"
      className="w-full h-[65vh] flex flex-col items-center justify-center px-4 py-4 mt-24 mb-24"
    >
      <EventWheel
        events={eventData}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};

export default Eventsection;
