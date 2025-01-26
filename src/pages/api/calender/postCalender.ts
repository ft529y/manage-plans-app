import { NextApiRequest, NextApiResponse } from 'next';

import { Calender } from '@/common/types';

const { v4: uuid4 } = require('uuid');

// 日付に対して予定を登録する(未完了 : 今後DBへデータを登録する際にgetCalenderのresponseデータを登録する。)
const postCalenderAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    try {
      const uuid: string = uuid4();
      const sentence = req.body['reqObj'];
      res.status(200).json({
        id: uuid,
      });
    } catch (err) {
      console.error(err);
    }
  }
};

export default postCalenderAPI;
