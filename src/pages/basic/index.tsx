import { GetServerSideProps } from 'next';
import { title } from 'process';

import { Easy } from '../../common/types';

interface ContextType {
  query: '';
}

const Index = (props: Easy) => {
  // console.log(props);
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
  // console.log(context);
  return {
    props: {
      // context: context,
      title: 'タイトル',
      hello: 'こんにちわ！',
    },
  };
};
