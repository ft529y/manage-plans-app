import { ChangeEvent, FormEvent, useState } from 'react';

import ListItem from './ListItem';

const List = () => {
  const [fetchExe, setFetchExe] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevState) => {
      return { ...prevState, text: value };
    });
  };

  const sendListItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();
      setFetchExe((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
    setFormData({ text: '' });
  };

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <div>
          <h1 className="text-3xl font-serif flex justify-center py-3 px-4">
            買い物リスト
          </h1>
          <form onSubmit={sendListItem}>
            <div>
              <label htmlFor="item"></label>
              <input
                className="w-96 rounded py-3 px-4"
                type="text"
                name="list"
                id="list"
                value={formData.text}
                onChange={handleChange}
                placeholder="入力してください。"
              />
            </div>
            <div className="flex justify-end py-2">
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white rounded px-4 py-2"
                type="submit"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </div>

      <ListItem fetchExe={fetchExe} />
    </>
  );
};

export default List;
