import { ChangeEvent, useEffect, useState } from 'react';

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
    // console.log(apiUrl);
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
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });

    // Write a process to register the checkbox boolean value to the DB
  };

  const removeTask = (index: number, item: ListData) => {
    if (listData !== null) {
      const newItem = [...listData];
      newItem.splice(index, 1);
      setListData(newItem);
    }
    // Send delete information to DB(use the item.id?).
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
                  checked={checkedItems[item.id] || false}
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
        <button className="bg-blue-900 hover:bg-blue-800 text-white rounded px-4 py-2">
          保存
        </button>
      </div>

      {/* <div className="flex justify-center items-center py-8">
        <button className="bg-blue-900 hover:bg-blue-800 text-white rounded px-4 py-2">
          保存
        </button>
      </div> */}
    </>
  );
};
export default ListItem;
