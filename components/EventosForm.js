import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";


export default function EventoForm({
  _id,
  title: existingTitle,
  category: assignedCategory, 
  hubicacion: existingHubicacion,
  hora: existingHora,  
  description: existingDescription,  
  fecha: existingFecha,  
  ecuela: assignedEscuelas,
  equipoA:existingEquipoA,
  equipoB:existingEquipoB,


}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [escuelas, setEscuelas] = useState(assignedEscuelas || '');
  const [hubicacion,setHubicacion] = useState(existingHubicacion || '');
  const [hora,setHora] = useState(existingHora || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [fecha, setFecha] = useState(existingFecha || '');

  const [categories,setCategories] = useState([]);
  const [escuela,setEscuela] = useState([]);

  const [equipoA, setEquipoA] = useState(existingEquipoA || '');
  const [equipoB, setEquipoB] = useState(existingEquipoB || '');

  

    const [productProperties,setProductProperties] = useState({});
    
    
    const [goToProducts,setGoToProducts] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        axios.get('/api/categories').then(result =>{
            setCategories(result.data);
        })
    }, []);

    useEffect(()=>{
        axios.get('/api/escuelas').then(result =>{
            setEscuelas(result.data);
        })
    }, []);

    async function saveEvent(ev){
        ev.preventDefault();
        const data = {
          title, category, hubicacion, hora, description,fecha,
          equipoA,equipoB,properties:productProperties
        };
        console.log(data);
        if(_id){
            //update
            await axios.put('/api/eventos',{...data,_id});
        }else{
            //create
            await axios.post('/api/eventos', data);
        }
        setGoToProducts(true);
    }
    if (goToProducts){
        router.push('/eventos');
    }



    function setProductProp(propName,value){
        setProductProperties(prev => {
            const newProductProps = {...prev};
            newProductProps[propName] = value;
            return newProductProps;
        });
    }

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
      let catInfo = categories.find(({ _id }) => _id === category);
      if (catInfo) {
        propertiesToFill.push(...catInfo.properties);
        while (catInfo?.parent?.id) {
          const parentCat = categories.find(({ _id }) => _id === catInfo?.parent._id);
          if (parentCat) {
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
          } else {
            break;
          }
        }
      }
    }
    
    console.log(productProperties);
    
    return(
            <form onSubmit={saveEvent}>
            
            <label>Nombre del Evento</label>
            <input 
              type='text' 
              placeholder="nombre del Evento"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
            />

            <label>Fecha y Hora</label>
            <div className="flex gap-1 " >
            <input 
            type="time" 
            placeholder="Hora" 
            value={hora}
            onChange={ev => setHora(ev.target.value)}
            />

            {/* <label>Fecha</label> */}
            <input 
            type="date" 
            placeholder="Fecha" 
            value={fecha}
            onChange={ev => setFecha(ev.target.value)}
            />
            </div>

            <label>Hubicacion</label>
            <input 
            type="text" 
            placeholder="Hubicacion" 
            value={hubicacion}
            onChange={ev => setHubicacion(ev.target.value)}
            />

            <label>Deporte</label>
            <select 
                value={category} 
                onChange={ev => setCategory(ev.target.value)}
            >
                <option value=''>Elige una categoría</option> {/* Agrega esta opción con un valor vacío */}
                {categories.length > 0 && categories.map(c => (
                    <option value={c._id} key={c._id}>{c.name}</option>
                ))}
            </select>
            {propertiesToFill && propertiesToFill.length > 0 && propertiesToFill.map(p => (
            <div key={p._id} className="flex gap-1">
            <div>{p.name}</div>
            <select
              value={productProperties[p.name]}
              onChange={ev => setProductProp(p.name, ev.target.value)}
            >
              {p.values && p.values.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        ))}

            <label>Equipo A</label>
            <select 
                value={equipoA} 
                onChange={ev => setEquipoA(ev.target.value)}
            >
                <option value='sin escuela'>Equipo A</option>
                {escuelas.length > 0 && escuelas.map(c => (
                <option value={c.title} key={c.title}>{c.title}</option>
                ))}
            </select>
            

            <label>Equipo B</label>
            <select 
                value={equipoB} 
                onChange={ev => setEquipoB(ev.target.value)}
            >
                <option value='sin escuela'>Equipo B</option> 
                {escuelas.length > 0 && escuelas.map(c => (
                    <option value={c.title} key={c.title}>{c.title}</option>
                ))}
            </select>
      
            <label>Descripcion</label>
            <textarea 
              placeholder="descripcion"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />

            <button 
              type="submit" 
              className="btn-primary">Guardar</button>
              </form>
    )
}