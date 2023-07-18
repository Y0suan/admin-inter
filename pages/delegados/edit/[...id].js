import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import DelegadosForm from "@/components/DelegadosForm";
import ViewDelegados from "@/components/ViewDelegados";

export default function EditDelegadosPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/delegados?id='+id).then(response => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Editar Delegados</h1>
      {productInfo && (
        <ViewDelegados {...productInfo} />
      )}
    </Layout>
  );
} 