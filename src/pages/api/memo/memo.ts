import { NextApiRequest, NextApiResponse } from 'next';

export interface MemoData {
  id: string;
  memoContent: { formData: { memo: string } };
}

// From now on, it will be retrieved from the DB.
let dummyMemo: MemoData[] = [
  {
    id: '1',
    memoContent: { formData: { memo: '確認テストのメモです。' } },
  },
  {
    id: '2',
    memoContent: { formData: { memo: '今日の目標達成しました。' } },
  },
  {
    id: '3',
    memoContent: { formData: { memo: 'dummyのメモです。DBを作成します。' } },
  },
];
const { v4: uuid4 } = require('uuid');

const Memo = (req: NextApiRequest, res: NextApiResponse) => {
  let memoData: MemoData = {
    id: '',
    memoContent: { formData: { memo: '' } },
  };
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(dummyMemo);
  }
};

export default Memo;
