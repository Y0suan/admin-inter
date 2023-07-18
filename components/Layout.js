import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import Logo from "./Logo";

//icons
import { AiOutlineGoogle } from 'react-icons/ai';




export default function Layout({children}) {
  const [showNav,setShowNav] = useState(false);
  const { data:session } = useSession();
  if (!session){
  return (
    <div className='bg-green-600 w-screen h-screen flex items-center justify-center '>
      <div className=" bg-white p-5 rounded-lg text-center w-max flex flex-col items-start">
        <h1 className=" text-black text-3xl font-bold " >Inicia Sección</h1>
        <button onClick={()=>signIn('google')} className="bg-green-600 text-white p-2 px-3 rounded-lg flex items-center"><AiOutlineGoogle className="m-1"/>Iniciar sesión con Google</button>
      </div>
    </div>
  );
}

return (
<div className="bg-bgGray min-h-screen">
<div className="block md:hidden flex items-center p-4">
  <button onClick={() => setShowNav(true) } >
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
   </svg>
  </button>
  <div className="flex grow justify-center mr-6">
   <Logo/>
  </div>
</div>
<div className=" flex ">
    <Nav show={showNav} ></Nav>
    <div className=" flex-grow p-4" >
        {children}
    </div>
  </div>
</div>
);
}
