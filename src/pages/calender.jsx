import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const MyCalender = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = async ({ start, end }) => {
    // ユーザーがデータを登録するためにAPIへPOSTする。(その後データベースへ登録する)
    try {
      const title = window.prompt('New Event name');
      if (title) {
        const reqObj = {
          start: start,
          end: end,
          title: title,
        };
        const res = await fetch('/api/calender/postCalender', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reqObj }),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calenderResponse = await fetch('/api/calender/getCalender');
        const data = await calenderResponse.json().then((item) => {
          //APIからデータを取得しフロントへ表示させる場合は↓のようにnew Date()化して上げる必要性がある。
          const trueData = {
            id: item.id,
            start: new Date(item.start),
            end: new Date(item.end),
            title: item.title,
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

    fetchData().then(() => {});
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
