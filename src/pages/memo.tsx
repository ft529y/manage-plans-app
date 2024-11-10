import { FormEvent, memo, useEffect, useState } from 'react';

import { MemoData } from './api/1/memo';

const Memo = () => {
  const [sentence, setSentence] = useState('');
  const [memoData, setMemoData] = useState<MemoData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/1/memo');

        if (!response.ok) {
          throw new Error('response.ok以外のログが出力されました');
        }

        const data = await response.json();
        setMemoData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const autoTxtArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setSentence(e.target.value);
  };

  const sendMemo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/1/memo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full justify-center flex-col items-center flex">
        <h1 className="p-5 font-bold text-2xl">メモ</h1>
        <form onSubmit={sendMemo}>
          <textarea
            className="w-[300px] resize-none overflow-hidden rounded-lg border p-3 text-sm"
            placeholder="テキストを入力して下さい。"
            onChange={(e) => {
              autoTxtArea(e);
            }}
          ></textarea>

          <div className="flex justify-end py-2">
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white rounded px-4 py-2"
              type="submit"
            >
              保存
            </button>
          </div>
        </form>
      </div>
      <div>
        {memoData !== null && memoData !== undefined ? (
          memoData.map((item) => (
            <div key={item.id}>
              <p>{item.memoContent.formData.memo}</p>
            </div>
          ))
        ) : (
          <p>メモデータがありません。</p>
        )}
      </div>
      <div></div>
    </>
  );
};

export default Memo;
