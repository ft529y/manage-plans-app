import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const number = params?.number;
  console.log(number);
  return (
    <>
      <h1>settings画面です。</h1>
      <p>{router.query.id}</p>
    </>
  );
};

export default Settings;
