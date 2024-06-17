import { NextApiRequest, NextApiResponse } from 'next';

const { v4: uuid4 } = require('uuid');

export interface ListData {
  id: string;
  listName: { formData: { text: string } };
}

// From now on, it will be retrieved from the DB.
let dummyData: ListData[] = [
  {
    id: '1',
    listName: { formData: { text: '確認テスト' } },
  },
  {
    id: '2',
    listName: { formData: { text: '野菜' } },
  },
  {
    id: '3',
    listName: { formData: { text: '果物' } },
  },
];

const List = (req: NextApiRequest, res: NextApiResponse) => {
  let listData: ListData = {
    id: '',
    listName: { formData: { text: '' } },
  };

  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(dummyData);
    // console.log(req.query);
  }

  if (method === 'POST') {
    const { body } = req;
    const text: string = body?.formData?.text;
    const uuid: string = uuid4();
    res.status(200).json({
      message: `POST request received with data!!!: ${JSON.stringify(body)}`,
    });
    listData = {
      id: uuid,
      listName: { formData: { text } },
    };
    dummyData.push(listData);
  }

  if (method === 'PUT') {
    const dummy = dummyData.find((item) => {
      item.id === req.query.id;
    });
    // console.log(dummy?.id);
  }

  if (method === 'DELETE') {
  }
};

export default List;
