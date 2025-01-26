import { NextApiRequest, NextApiResponse } from 'next';

import { ListData } from '@/common/types';
import { listDataMock } from '@/mock/listDataMock';

import closeDB from '../utils/closeDB';
import connectDB from '../utils/connectDB';
import { ListModel } from '../utils/shemaModels';

const { v4: uuid4 } = require('uuid');
// From now on, it will be retrieved from the DB.
const mockData = listDataMock;

const ListAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  // await connectDB();
  // await closeDB();
  let listData: ListData = {
    id: '',
    listName: { formData: { text: '' } },
  };

  const { method } = req;

  // ↓がmongoDBへのデータ取得コード(現在は非稼働)
  // 今後、mongoDBへの登録アクティブ状態にする
  // if (method === 'GET') {
  //   const allListData = await ListModel.find();
  //   res.status(200).json(allListData);
  // }

  if (method === 'GET') {
    return res.status(200).json(mockData);
  }

  // ↓がmongoDBへのデータ登録コード(現在は非稼働)
  // 今後、mongoDBへの登録アクティブ状態にする
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
    // mockData.push(listData);
  }

  // DELETEメソッドを完成させる。
  if (method === 'DELETE') {
  }
};

export default ListAPI;
