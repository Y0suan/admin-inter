import mongoose, { models,model,Schema} from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required:true },
  reglamento: { type: String},
  parent: { type: mongoose.Types.ObjectId, ref:'Category'},
  properties: [{type:Object}]
});

const Category = models?.Category || model('Category', CategorySchema);

export default Category;

