import { mongooseConnect } from "@/lib/mongoose";
import { Escuela } from "@/models/Escuelas";
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req,res);


    if (method === 'GET'){
        if (req.query?.id){
            res.json(await Escuela.findOne({_id:req.query.id}));
        }else{
            res.json(await Escuela.find());
        }
    }

    if (method === 'POST'){
        const {title,description,hubicacion,escudo} = req.body;
        const escuelaDoc = await Escuela.create({
            title,description,hubicacion,escudo,
        })
        res.json(escuelaDoc);
    }
    if (method === 'PUT'){
        const {title,description,hubicacion,escudo,_id} = req.body;
        await Escuela.updateOne({_id},{title,description,hubicacion,escudo});
        res.json(true);
    }

    if (method === 'DELETE'){
        if (req.query?.id){
            await Escuela.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}