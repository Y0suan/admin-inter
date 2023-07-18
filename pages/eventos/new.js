import EscuelasForm from "@/components/EscuelasForm";
import EventoForm from "@/components/EventosForm";
import Layout from "@/components/Layout";


export default function NewEventos(){
   return (
    <Layout>
      <h1>Agrega un Evento</h1>
      <EventoForm></EventoForm>
    </Layout>
   );
}