import { ChangeEvent, FormEvent, useState } from 'react';

const List = () => {
  const [formData, setFormData] = useState({
    text: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevState) => {
      // console.log(formData);
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1 className="text-xl">買い物リスト</h1>
        <div>
          <form onSubmit={sendListItem}>
            <div>
              <label htmlFor="item"></label>
              <input
                type="text"
                name="list"
                id="list"
                value={formData.text}
                onChange={handleChange}
                placeholder="入力してください。"
              />
            </div>
            <button type="submit">送信</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default List;
