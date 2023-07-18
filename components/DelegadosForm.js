import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function DelegadosForm({ 
  _id, 
  delegados: existingDelegados, 
  escuela: assignedEscuelas 
}) {
  const [delegados, setDelegados] = useState(existingDelegados || []);
  const [delegado, setDelegado] = useState({});
  console.log(delegados)

  const [escuela, setEscuela] = useState(assignedEscuelas || '');
  const [escuelas, setEscuelas] = useState([]);

  const [goToDelegados, setGoToDelegados] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/escuelas').then(response => {
      setEscuelas(response.data);
    });
  }, []);

  async function saveDelegados(ev){
    ev.preventDefault();
    const data = {
      delegados: delegados.map(delegado => JSON.stringify(delegado)),
      escuela
    };
    console.log(data);
    if(_id){
      //update
      await axios.put('/api/delegados',{...data,_id});
    }else{
      //create
      await axios.post('/api/delegados', data);
    }
    setGoToDelegados(true);
  };

  if (goToDelegados) {
    router.push('/delegados');
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newDelegado = {
      nombre: formData.get('nombre'),
      dni: formData.get('dni'),
      contacto: formData.get('contacto'),
    };

    setDelegados([...delegados, newDelegado]);
    setDelegado(newDelegado);

    event.target.reset();
  };

  return (
    <div>
      <h1>Formulario de Delegados</h1>
      <form onSubmit={handleFormSubmit}>
        <h2>Delegado {delegados.length + 1}</h2>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="dni">DNI:</label>
        <input type="text" id="dni" name="dni" required />

        <label htmlFor="contacto">Contacto:</label>
        <input type="text" id="contacto" name="contacto" required />

        <button className="btn-primary" type="submit">Guardar</button>
      </form>

      <form>
        <h2>Delegados Guardados:</h2>
        <ul>
          {delegados.map((delegado, index) => (
            <li key={index}>
              Nombre: {delegado.nombre}, DNI: {delegado.dni}, Contacto: {delegado.contacto}
            </li>
          ))}
        </ul>
        <label>Escuela</label>
        <select
          value={escuela}
          onChange={ev => setEscuela(ev.target.value)}
        >
          <option value='sin escuela definida'>Elige una Escuela</option>
          {escuelas.length > 0 && escuelas.map(escuela => (
            <option value={escuela.title} key={escuela.title}>{escuela.title}</option>
          ))}
        </select>

        <button className="btn-primary" onClick={saveDelegados}>Guardar Delegados</button>
      </form>
    </div>
  );
}
