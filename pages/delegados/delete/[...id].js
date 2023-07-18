import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteDelegadosPage(){
    const router = useRouter();
    const [delegadosInfo,setDelegadosInfo]=useState();
    const{id}=router.query;

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/delegados?id='+id).then(response => {
            setDelegadosInfo(response.data);
        });
    },[id]);
    
    function goBack(){
        router.push('/delegados');
    }
    async function deleteDelegados(){
        await axios.delete('/api/delegados?id='+id);
        goBack();
    }
    return(
        <Layout>
                <h1 className="text-center">Estás seguro que quieres eliminar los delegados 
                &nbsp;{delegadosInfo?.title}&apos;?
                </h1>
                <div class="flex gap-2 justify-center">
                <button
                onClick={deleteDelegados} 
                class="btn-red" >
                   Si
                </button>
                <button 
                  class="btn-default" 
                  onClick={goBack}>
                   No
                </button>
                </div>

        </Layout>
    );
}