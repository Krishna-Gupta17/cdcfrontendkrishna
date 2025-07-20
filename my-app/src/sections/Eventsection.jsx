import React , {useState} from 'react';
import EventDetails from '../components/EventDetails';
import eventData from '../data/event';
import EventWheel from '../components/EventWheel';

const Eventsection = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    return(
    <>
                <div id="events" className="h-[600px] w-[100vw] flex relative gap-4 custom-md3:gap-20 mb-10 hidden custom-lg3:flex">
                    <div className='w-[400px] h-[520px]' ><EventWheel
                        events={eventData}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                    /></div> <div className=''>
                    <EventDetails event={eventData[currentIndex]} />
                </div></div>
                <div id="events" className='w-[100vw] flex flex-col custom-lg3:hidden'>
                    <div>
                        <EventWheel
                        events={eventData}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                    />
                    </div>
                    <div><EventDetails event={eventData[currentIndex]} /></div>
                </div>
    </>
    )
}
export default Eventsection;