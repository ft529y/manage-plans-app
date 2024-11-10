import { NextApiRequest, NextApiResponse } from 'next';

import { CalenderEvent } from '../../../common/types';

const calenderAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  // DBへデータを保存する際はnew Date()形式で問題ないと想定。
  let dummyCalenderData: CalenderEvent = {
    start: new Date(2024, 9, 22, 10, 0),
    end: new Date(2024, 9, 22, 12, 0),
    title: 'サンプルデータ挿入',
  };
  const { method } = req;

  if (method === 'GET') {
    try {
      console.log('データ取得確認', dummyCalenderData);
      return res.status(200).json(dummyCalenderData);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(dummyCalenderData);
};

export default calenderAPI;

// {start: '2024-09-22T11:03:04.532Z', end: '2024-09-22T12:03:04.532Z', title: 'サンプルデータ挿入'}
