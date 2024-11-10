import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const MyCalender = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    // ユーザーがデータを登録するためにAPIへPOSTする。
    const title = window.prompt('New Event name');
    if (title) {
      setEvents((prevEvents) => [...prevEvents, { start, end, title }]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calenderResponse = await fetch('/api/calender/getCalender');
        const data = await calenderResponse.json().then((item) => {
          //APIからデータを取得しフロントへ表示させる場合は↓のようにnew Date()化して上げる必要性がある。
          const trueData = {
            id: 1,
            start: new Date(item.start),
            end: new Date(item.end),
            title: 'サンプルデータ挿入',
          };
          setEvents((prevEvents) => [...prevEvents, trueData]);
        });

        if (!calenderResponse.ok) {
          throw new Error('response.ok以外のログが出力されました。');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData().then(() => {
      console.log(events);
    });
  }, []);

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: 'lightblue',
      border: '1px solid blue',
      borderRadius: '5px',
      padding: '5px',
    },
  });

  return (
    <>
      <div className="h-[56rem]">
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          onSelectSlot={handleSelect}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => {
            handleDeleteEvent(event.id);
          }}
        />
      </div>

      <div className="text-sky-400 flex justify-center items-center p-8">
        <Link href={{ pathname: '/' }}>ホーム画面へ戻る</Link>
      </div>
    </>
  );
};

export default MyCalender;
