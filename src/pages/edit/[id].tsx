import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/1/memo');
        if (!response.ok) {
          throw new Error('response.ok以外のログが出力されました');
        }

        const data = await response.json();

        const memoData = data.find((item: any) => {
          return item.id === id;
        });
        const alignData = memoData.memoContent.formData.memo;
        setData(alignData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const prev = () => {
    const url = '/memo';
    router.push(url);
  };

  return (
    <>
      <div>{data}</div>
      <div>
        <button onClick={() => prev()}>戻る</button>
      </div>
    </>
  );
};

export default EditPage;
