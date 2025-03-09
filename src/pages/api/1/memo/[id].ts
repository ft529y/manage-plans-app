import { NextApiRequest, NextApiResponse } from 'next';

const UpdateMemoAPI = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { data } = req.body;

  // DBへデータを登録する。今後DBコードを実装する。
  if (method === 'PUT') {
    res.status(200).json({
      message: 'メモの更新に成功しました。',
      data: data,
    });
  }
};

export default UpdateMemoAPI;
