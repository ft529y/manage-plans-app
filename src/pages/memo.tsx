import { useRouter } from 'next/router';
import { FormEvent, memo, useEffect, useState } from 'react';

import { MemoData } from '@/common/types';

const Memo = () => {
  const router = useRouter();
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
      const res = await response.json();
      if (memoData !== null) {
        setMemoData([
          ...memoData,
          {
            id: res.uuid,
            memoContent: { formData: { memo: res.data } },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToEdit = (id: string) => {
    const url = `edit/${id}`;
    router.push(url);
  };

  const removeTask = (removeItem: MemoData) => {
    if (memoData) {
      const removeData = memoData.filter((item) => {
        return removeItem.id !== item.id;
      });
      setMemoData(removeData);
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

      <div className="text-center w-1/2 mx-auto">
        {memoData !== null && memoData !== undefined ? (
          memoData.map((item) => (
            <div className="py-3" key={item.id}>
              <p className="rounded-full bg-slate-400 p-4 mb-4">
                登録した日時 :{item.memoContent.formData.memo}
              </p>

              <div className="ml-auto px-8">
                <button
                  className="bg-blue-500 hover:bg-blue-700 mr-4 text-white py-2 px-4 rounded-full"
                  onClick={() => redirectToEdit(item.id)}
                >
                  更新
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                  onClick={() => removeTask(item)}
                >
                  削除
                </button>
              </div>
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
