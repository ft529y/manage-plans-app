import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { checkbox, ListData, ListItemProps } from '../common/types';

const ListItem: React.FC<ListItemProps> = (
  { fetchExe } /*removeStuff: () => void*/
) => {
  const [listData, setListData] = useState<ListData[] | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    // const apiUrl = process.env.NEXT_PUBLIC_SECRET_KEY;
    const fetchData = async () => {
      try {
        const response = await fetch('/api/list');

        if (!response.ok) {
          throw new Error('response.ok以外のログが出力されました。');
        }

        const data = await response.json();
        setListData(data);
      } catch (error) {
        console.error('エラーログを取得しました。', error);
      }
    };

    fetchData();

    return () => {
      console.log('画面がアンマウントされました。');
    };
  }, [fetchExe]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (listData !== undefined && listData !== null) {
      const { name, checked } = event.target;

      const updateData = listData.map((item) => {
        if (item.id === name) {
          item.checked = checked;
          return item;
        } else {
          return item;
        }
      });
      setListData(updateData);

      // Write a process to register the checkbox boolean value to the DB
    }
  };

  const removeTask = (index: number, item: ListData) => {
    if (listData !== null) {
      const newItem = [...listData];
      newItem.splice(index, 1);
      setListData(newItem);

      // Send delete information to DB(use the item.id?).
    }
  };

  const sendTask = async () => {
    // Send request information to DB
    try {
      const url = '/api/list?save=true';
      const reponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });
    } catch (error) {
      console.error(error);
    }

    // items: ListData[]
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div>
          {listData !== null && listData !== undefined ? (
            listData.map((item, index) => (
              <div key={item.id} className="py-3 flex items-center">
                <input
                  className="focus:ring-0 w-6 h-6 mx-3"
                  type="checkbox"
                  name={item.id}
                  checked={item.checked}
                  onChange={(event) => handleCheckboxChange(event)}
                />
                {JSON.stringify(item.listName.formData.text, null, 2).replace(
                  /\"/g,
                  ''
                )}

                <div className="ml-auto px-8">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                    onClick={() => removeTask(index, item)}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>買い物リストのデータが存在しません。</p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center py-8">
        {listData !== null && listData !== undefined ? (
          <button
            onClick={() => sendTask()}
            className="bg-blue-900 hover:bg-blue-800 text-white rounded px-4 py-2"
          >
            保存
          </button>
        ) : (
          <button
            disabled={true}
            className="bg-gray-500 text-white rounded px-4 py-2"
          >
            保存
          </button>
        )}
      </div>
    </>
  );
};
export default ListItem;
