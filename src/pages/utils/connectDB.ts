import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    process.env.DB_API_KEY
      ? await mongoose.connect(process.env.DB_API_KEY)
      : '';
    console.log('DB接続成功');
  } catch (err) {
    console.error('エラー', err);
    throw new Error();
  }
};

export default connectDB;
