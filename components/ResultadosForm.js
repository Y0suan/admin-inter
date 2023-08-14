import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";


export const ResultadosForm = ({
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

  ganador:existingGanador,
  }) => {

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


  const [ganador, setGanador] = useState(existingGanador || '');

  

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
          equipoA,equipoB,ganador,properties:productProperties
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



  return (
<form onSubmit={saveEvent}>
            
            <h2>{equipoA} vs {equipoB}</h2>

            <label>Ganador</label>
            <select 
                value={ganador} 
                onChange={ev => setGanador(ev.target.value)}
            >
                <option key={'option1'} value={equipoA}>{equipoA}</option>
                <option key={'option2'} value={equipoB}>{equipoB}</option>
            </select>


            <label>Aclaraciones del Evento</label>
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
