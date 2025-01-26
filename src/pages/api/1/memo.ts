import { NextApiRequest, NextApiResponse } from 'next';

import { MemoData } from '@/common/types';
import { memoDataMock } from '@/mock/memoDataMock';

// From now on, it will be retrieved from the DB.
let mockData = memoDataMock;
const { v4: uuid4 } = require('uuid');

// APIをgetとpostで分ける。

const MemoAPI = (req: NextApiRequest, res: NextApiResponse) => {
  let memoData: MemoData = {
    id: '',
    memoContent: { formData: { memo: '' } },
  };
  const { method } = req;

  // DBからデータを取得する。今後DBコードを実装する。
  if (method === 'GET') {
    res.status(200).json(mockData);
  }

  // DBへデータを登録する。今後DBコードを実装する。
  if (method === 'POST') {
    const { sentence } = req.body;
    const uuid: string = uuid4();

    res.status(200).json({
      message: `memoリクエストに成功しました。`,
      data: sentence,
      uuid: uuid,
    });
  }
};

export default MemoAPI;
