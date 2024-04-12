import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Link from 'next/link';

const localizer = momentLocalizer(moment);

const event = [
  {
    title: '誕生日',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
];

const MyCalender = () => {
  return (
    <>
      <div className="h-[56rem]">
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="start"
          endAccessor="end"
        />
      </div>

      <div className="text-sky-400 flex justify-center items-center p-8">
        <Link href={{ pathname: '/' }}>ホーム画面へ戻る</Link>
      </div>
    </>
  );
};

export default MyCalender;
