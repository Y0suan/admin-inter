import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ViewDelegados({ 
    _id, 
    delegados: existingDelegados, 
    escuela: assignedEscuelas 
  }){
    const [delegados, setDelegados] = useState(existingDelegados || []);
    const [escuela, setEscuela] = useState(assignedEscuelas || '');
    const [products,setProducts] = useState([]);
    return(
        <div>
            <table className="basic mt-2 ">
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
            <ul>
          {delegados.map((delegado) => (
            <li key={delegado.dni} >
              Nombre: {delegado.nombre}, DNI: {delegado.dni}, Contacto: {delegado.contacto}
            </li>
          ))}
        </ul>
        </div>
    )
}