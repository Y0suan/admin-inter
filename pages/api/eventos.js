import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Evento } from "@/models/Eventos";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);


  if (method === 'GET') {
    if (req.query?.id) {
      try {
        const evento = await Evento.findOne({ _id: req.query.id });
        res.json(evento);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener el evento' });
      }
    } else {
      try {
        const eventos = await Evento.find();
        res.json(eventos);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los eventos' });
      }
    }
  }

 if (method === 'POST') {
  const { title, category, hubicacion, hora, description, fecha, equipoA, equipoB, ganador, properties } = req.body;

  Evento.create({
    title,
    category,
    hubicacion,
    hora,
    description,
    fecha,
    equipoA,
    equipoB,
    ganador,
    properties
  })
  .then(eventDoc => {
    res.json(eventDoc);
  })
  .catch(error => {
    res.status(500).json({ error: 'Error al crear el evento' });
  });
  }

  if (method === 'PUT') {
    const { title, category, hubicacion, hora, description, fecha, equipoA, equipoB, ganador, properties, _id } = req.body;
  
    try {
      await Evento.updateOne({ _id }, { title, category, hubicacion, hora, description, fecha, equipoA, equipoB, ganador, properties });
      res.json(true);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el evento' });
    }
  }
  
  if (method === 'DELETE') {
    if (req.query?.id) {
      try {
        await Evento.deleteOne({ _id: req.query.id });
        res.json(true);
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el evento' });
      }
    }
  }  
}
