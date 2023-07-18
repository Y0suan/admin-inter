import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import EscuelasForm from "@/components/EscuelasForm";

export default function EditEscuelasPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/escuelas?id='+id).then(response => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Editar Institución</h1>
      {productInfo && (
        <EscuelasForm {...productInfo} />
      )}
    </Layout>
  );
} 