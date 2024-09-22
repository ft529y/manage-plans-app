import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ListSchema = new Schema({
  id: String,
  listName: { formData: { text: String } },
});

export const ListModel =
  mongoose.models.List || mongoose.model('List', ListSchema);
