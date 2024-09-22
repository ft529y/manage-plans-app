import { NextApiRequest, NextApiResponse } from 'next';

import closeDB from '../utils/closeDB';
import connectDB from '../utils/connectDB';
import { ListModel } from '../utils/shemaModels';

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

const ListAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  // await connectDB();
  // await closeDB();
  let listData: ListData = {
    id: '',
    listName: { formData: { text: '' } },
  };

  const { method } = req;

  // if (method === 'GET') {
  //   const allListData = await ListModel.find();
  //   res.status(200).json(allListData);
  // }

  if (method === 'GET') {
    return res.status(200).json(dummyData);
  }

  if (method === 'POST') {
    try {
      const { body } = req;
      const text: string = body?.formData?.text;
      const uuid: string = uuid4();

      listData = {
        id: uuid,
        listName: { formData: { text } },
      };

      await ListModel.create(listData);
      res.status(200).json({
        message: `POST request received with data成功!!!: ${JSON.stringify(
          body
        )}`,
        created: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: `POST failed!!!: ${err}}`,
      });
    }

    // const { body } = req;
    // const text: string = body?.formData?.text;
    // const uuid: string = uuid4();
    // res.status(200).json({
    //   message: `POST request received with data!!!: ${JSON.stringify(body)}`,
    // });
    // listData = {
    //   id: uuid,
    //   listName: { formData: { text } },
    // };
    // dummyData.push(listData);
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

export default ListAPI;
