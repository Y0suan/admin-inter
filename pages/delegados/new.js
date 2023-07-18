import DelegadosForm from "@/components/DelegadosForm";
import EscuelasForm from "@/components/EscuelasForm";
import Layout from "@/components/Layout";


export default function NewDelegados(){
   return (
    <Layout>
      <h1>Agrega Delegados</h1>
      <DelegadosForm></DelegadosForm>
    </Layout>
   );
}