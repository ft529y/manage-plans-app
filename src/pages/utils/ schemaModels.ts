import mongoose from 'mongoose';

// 以下にDBのスキーマ情報を記載していく。
const Schema = mongoose.Schema;

const UserSchema = new Schema({});
const CalenderSchema = new Schema({});
const ListSchema = new Schema({
  id: String,
  listName: { formData: { text: String } },
});
const MemoSchema = new Schema({});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
const CalenderModel =
  mongoose.models.Calender || mongoose.model('Calender', CalenderSchema);
const ListModel = mongoose.models.List || mongoose.model('List', ListSchema);
const MemoModel = mongoose.models.Memo || mongoose.model('Memo', MemoSchema);

export { UserModel, CalenderModel, ListModel, MemoModel };
