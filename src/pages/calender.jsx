import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const event = [
  {
    title: '誕生日',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
];

const MyCalender = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  useEffect(() => {
    console.log(new Date());
  }, []);
  return (
    <>
      <div className="h-[56rem]">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelect}
        />
      </div>

      <div className="text-sky-400 flex justify-center items-center p-8">
        <Link href={{ pathname: '/' }}>ホーム画面へ戻る</Link>
      </div>
    </>
  );
};

export default MyCalender;
