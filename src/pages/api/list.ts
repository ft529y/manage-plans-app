import { NextApiRequest, NextApiResponse } from 'next';

import { ListData } from '@/common/types';
import { listDataMock } from '@/mock/listDataMock';
import { getListData, setListData } from '@/service/datacontainer';

import { ListModel } from '../utils/ schemaModels';
import closeDB from '../utils/closeDB';
import connectDB from '../utils/connectDB';

const { v4: uuid4 } = require('uuid');
// From now on, it will be retrieved from the DB.
setListData(listDataMock);
let mockData = getListData();

const ListAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  // await connectDB();
  // await closeDB();
  let listData: ListData = {
    id: '',
    listName: { formData: { text: '' } },
    checked: false,
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

  // ユーザーが送信ボタンを押下した際の処理
  // ↓がmongoDBへのデータ登録コード(現在は非稼働) 今後、mongoDBへの登録アクティブ状態にする
  if (method === 'POST') {
    // ユーザーが保存ボタンを押下した際の処理
    if (req.query.save) {
      res.status(200).json({
        message: `データの更新に成功しました。`,
      });
      return;
    }

    if (req.query.send) {
      try {
        const { body } = req;
        const text: string = body?.formData?.text;
        const uuid: string = uuid4();

        listData = {
          id: uuid,
          listName: { formData: { text } },
          checked: false,
        };

        mockData.push(listData);

        res.status(200).json({
          message: `データの生成に成功しました。`,
          body: mockData,
        });

        // ↓mongo DBへ登録するコード
        // await ListModel.create(listData);
        // res.status(200).json({
        //   message: `POST request received with data成功!!!: ${JSON.stringify(
        //     body
        //   )}`,
        //   created: true,
        // });
      } catch (err) {
        return res.status(400).json({
          message: `POST failed!!!: ${err}}`,
        });
      }
    }
  }

  // DELETEメソッドを完成させる。
  if (method === 'DELETE') {
  }
};

export default ListAPI;
