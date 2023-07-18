import mongoose, { model, Schema, models } from "mongoose";

const EventoSchema = new Schema(
  {
    title: { type: String},
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    properties: { type: Object },
    hubicacion: { type: String },
    hora: { type: String },
    fecha: { type: String},
    description: { type: String },
    equipoA: { type: String },
    equipoB: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Evento = models.Evento || model('Evento', EventoSchema);
          