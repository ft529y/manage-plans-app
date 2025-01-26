import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { title } from 'process';
import { useEffect } from 'react';

import { Easy } from '../../common/types';

// お試しページ(使用していない)
const Index = (props: Easy) => {
  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    console.log('画面の表示に成功しました。', currentPath);
  }, []);
  return (
    <>
      <h1>{props.hello}</h1>
      <h1>{props.title}</h1>
      {/* <h1>{props.context}</h1> */}
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Easy> = async (context) => {
  return {
    props: {
      // context: context,
      title: 'タイトル',
      hello: 'こんにちわ！',
    },
  };
};
