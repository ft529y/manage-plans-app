import { NextApiRequest, NextApiResponse } from 'next';

const List = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    const { body } = req;
    res.status(200).json({
      message: `POST request received with data!!!: ${JSON.stringify(body)}`,
    });
  }
};

export default List;
