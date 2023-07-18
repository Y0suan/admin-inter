// Importa Mongoose
import mongoose, {model, Schema, models} from "mongoose";


const DelegadosSchema = new Schema({
  delegados:[{type:String}],
  escuela: {
    type: String,
    required: true
  }
},{
  timestamps: true,
});
export const Delegados = models.Delegados || model('Delegados',DelegadosSchema);
