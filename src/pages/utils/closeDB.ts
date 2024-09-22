import mongoose from 'mongoose';

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('mongoDBとの接続を解除しました。');
  } catch (error) {
    console.error('エラー', error);
  }
};

export default closeDB;
