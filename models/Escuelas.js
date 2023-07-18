import mongoose, {model, Schema, models} from "mongoose";

const EscuelaSchena = new Schema({
    title: {type: String, required: true},
    description: String,
    escudo:[{type:String}],
    hubicacion: String,
},{
    timestamps: true,
});

export const Escuela = models.Escuela || model('Escuela',EscuelaSchena);
