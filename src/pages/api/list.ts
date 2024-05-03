import { NextApiRequest, NextApiResponse } from 'next';

const { v4: uuid4 } = require('uuid');

export interface ListData {
  id: string;
  listName: { formData: { text: string } };
}

let tempListData: ListData[] = [];

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
  }

  if (method === 'POST') {
    const { body } = req;
    const text: string = body.formData.text;
    const uuid: string = uuid4();
    res.status(200).json({
      message: `POST request received with data!!!: ${JSON.stringify(body)}`,
    });
    listData = {
      id: uuid,
      listName: { formData: { text } },
    };
    tempListData.push(listData);
  }

  if (method === 'DELETE') {
  }
};

export default List;
