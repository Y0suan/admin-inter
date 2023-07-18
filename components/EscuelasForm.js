import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";


export default function EscuelasForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  hubicacion: existingHubicacion,
  escudo: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  

    const [productProperties,setProductProperties] = useState({});

    const [hubicacion,setHubicacion] = useState(existingHubicacion || '');
    
    const [escudo,setEscudo] = useState(existingImages || []);
    const [goToProducts,setGoToProducts] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const router = useRouter();

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {
            title,description,hubicacion,escudo
        };
        if(_id){
            //update
            await axios.put('/api/escuelas',{...data,_id});
        }else{
            //create
            await axios.post('/api/escuelas', data);
        }
        setGoToProducts(true);
    }
    if (goToProducts){
        router.push('/escuelas');
    }

    async function uploadImages(ev) {
      const files = ev.target?.files;
      if (files?.length > 0) {
        setIsUploading(true);
        const formData = new FormData();
    
        for (const file of files) {
          formData.append('file', file);
        }
    
        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
    
          const links = response.data.links;
          setEscudo((oldImages) => [...oldImages, ...links]);
        } catch (error) {
          console.error('Error uploading images:', error);
        }
    
        setIsUploading(false);
      }
    }
    

    function updateIMagesOrder (escudo){
        setEscudo(escudo);
    }
    function setProductProp(propName,value){
        setProductProperties(prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        });
    }
    return(
            <form onSubmit={saveProduct}>
            
            <label>Nombre de la Institución</label>
            <input 
              type='text' 
              placeholder="nombre de la Institución"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
            />

            <label>
                Escudo de la Institución
            </label>
            <div className= "mb-2 flex flex-wrap gap-1">
                <ReactSortable
                list={escudo}
                className="flex flex-wrap gap-1"
                setList={updateIMagesOrder}
                >
                {!!escudo?.length && escudo.map(link => (
                  <div key={link} className="h-24 bg-white shadow-sm rounded-sm border border-gray-200">
                    <img src={link} alt="Descripción de la imagen" className="rounded-sm" />
                  </div>
                ))}

                </ReactSortable>
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner/>
                    </div>
                )}
                <label className= " w-24 h-24 cursor-pointer text-blue text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-sm bg-white shadow-md border border-gray-200 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <div>
                Subir
                </div>
                <input type="file" onChange={uploadImages} className="hidden"/>
                </label>
            </div>
            <label>Descripcion</label>
            <textarea 
              placeholder="descripcion"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />

            <label>Hubicacion</label>
            <input 
            type="text" 
            placeholder="Hubicacion" 
            value={hubicacion}
            onChange={ev => setHubicacion(ev.target.value)}
            />

            <button 
              type="submit" 
              className="btn-primary">Guardar</button>
              </form>
    )
}