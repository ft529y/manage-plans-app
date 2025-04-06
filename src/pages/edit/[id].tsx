import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { MemoData } from '@/common/types';

import { ListData } from '../../common/types';

const EditPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState('');
  const hiddenInput = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hiddenInput.current) {
      hiddenInput.current.style.backgroundColor = 'lightblue';
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/1/memo');
        if (!response.ok) {
          throw new Error('response.ok以外のログが出力されました');
        }

        const data = await response.json();

        const memoData: MemoData = data.find((item: MemoData) => {
          return item.id === id;
        });

        const alignData: string = memoData.memoContent.formData.memo;

        setData(alignData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const updateItem = async () => {
    // have to code update API
    try {
      const res = await fetch(`/api/1/memo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setData(data['data']);

        const url = '/memo';
        router.push(url);
      }
    } catch (error) {
      console.error(error);
    }
    console.log('更新しました！');
  };

  const prev = () => {
    const url = '/memo';
    router.push(url);
  };

  const handleChange = (event: { target: { value: any } }) => {
    setData(event.target.value);

    if (hiddenInput.current) {
      hiddenInput.current.style.backgroundColor = 'white';
    }
  };

  return (
    <>
      <div
        className="max-w-xl mx-auto p-4"
        aria-hidden={true}
        ref={hiddenInput}
      >
        <label
          htmlFor="message"
          className="block text-lg font-medium text-gray-700"
        >
          メッセージ
        </label>
        <textarea
          id="message"
          value={data}
          onChange={handleChange}
          rows={4}
          placeholder="ここにメッセージを入力してください..."
          className="mt-2 w-full p-4 text-sm text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out resize-none"
        ></textarea>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 mr-4 text-white py-2 px-4 rounded-full"
            onClick={() => updateItem()}
          >
            登録
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 mr-4 text-white py-2 px-4 rounded-full"
            onClick={() => prev()}
          >
            戻る
          </button>
        </div>
      </div>
    </>
  );
};

export default EditPage;
