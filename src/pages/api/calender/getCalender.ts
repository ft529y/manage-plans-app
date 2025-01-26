import { NextApiRequest, NextApiResponse } from 'next';

import { CalenderEvent } from '../../../common/types';

const { v4: uuid4 } = require('uuid');

// データベースから登録済みの予定を取得する。
const getCalenderAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  // DBへデータを保存する際はnew Date()形式で問題ないと想定。
  // DATEはインデックスの関係により9月で返却しても10月表記に変換される。
  let dummyCalenderData: CalenderEvent = {
    id: 2,
    start: new Date(2024, 9, 22, 10, 0),
    end: new Date(2024, 9, 22, 12, 0),
    title: 'サンプルデータ挿入',
  };

  const { method } = req;

  if (method === 'GET') {
    try {
      return res.status(200).json(dummyCalenderData);
    } catch (err) {
      console.error(err);
    }
  }
};

export default getCalenderAPI;
