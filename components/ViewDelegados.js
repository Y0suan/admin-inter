import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const processDelegados = (delegados) => {
  // Mapeamos el array de delegados para modificar cada objeto
  const processedDelegados = delegados.map((delegado) => {
    // Convertimos el objeto a un string JSON y eliminamos las llaves
    const delegadoString = JSON.stringify(delegado).replace(/[{}]/g, '');
    // Reemplazamos todas las comas por una coma seguida de un espacio en blanco
    const delegadoStringFormatted = delegadoString.replace(/,/g, ' ');
    // Convertimos el string formateado de vuelta a un objeto JSON
    return JSON.parse(delegadoStringFormatted);
  });

  return processedDelegados;
};


export default function ViewDelegados({ 
    _id, 
    delegados: existingDelegados, 
    escuela: assignedEscuelas 
  }){
    const [delegados, setDelegados] = useState(existingDelegados || []);
    const [escuela, setEscuela] = useState(assignedEscuelas || '');
    const [products,setProducts] = useState([]);
    
    // Procesamos los delegados antes de renderizarlos
    const processedDelegados = processDelegados(delegados);
    console.log(processedDelegados);

    return(
        <div > 
            <table className=" max-h-screen basic mt-2"  >
                <thead>
                    <tr>
                      <td>Nombre de la institucion</td>
                      <td></td>
                    </tr>
                </thead>
                <tbody>
                        <tr key={_id} >
                            <td>{escuela}</td>
                        </tr>
                                <h2>Delegados Guardados:</h2>
                </tbody>
            </table>
            <ul >
          {processedDelegados.map((delegado) => (
            <li key={delegado.dni}>
              {delegado}
            </li>
          ))}
        </ul>
        </div>
    )
}
