import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Delegados } from "@/models/Delegados";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Delegados.findOne({ _id: req.query.id }));
    } else {
      res.json(await Delegados.find());
    }
  }

  if (method === 'POST') {
   
      const { delegados, escuela } = req.body;
      const savedDelegado = await Delegados.create({
        delegados, escuela,
      });
      res.json(savedDelegado);
  }

  if (method === 'PUT') {
    const { delegados, escuela, _id } = req.body;
    await Delegados.updateOne({ _id },{ delegados, escuela });
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Delegados.deleteOne({ _id:req.query?.id });
      res.json(true);
    }
  }
}
