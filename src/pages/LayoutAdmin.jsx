import { useState } from "react";
import { Modal } from '../components/Modal'
import { Outlet, NavLink } from "react-router-dom";
import redirection from "../hooks/Redirection"; 
import { useWalletStore } from "../store";
import { connexion } from "../services/Connexion";
import RedirectionAdmin from "../hooks/RedirectionAdmin";
import decoLogo from "/src/assets/logout_208px.png"



export const LayoutAdmin = ()=>{

    // redirection()

    let [isOpen, setIsOpen] = useState(false)
    let setAdmin = useWalletStore(s=>s.setAdmin)
    let admin = useWalletStore(state=>state.admin)

    let deconnect = ()=>{
      setAdmin({})
      setIsOpen(false)

      
      
      }

    return <div>
    <div className="flex justify-around w-full h-20 fixed top-0 p-5 z-50 bg-white">
      

    <div className="text-3xl text-[#4371BA] shadow-3xl font-bold max-md:text-lg">Wallet'ntsika (Admin) </div>
    <RedirectionAdmin></RedirectionAdmin>

    <nav className='text-sm text-[#4371BA] w-80 flex justify-around items-center '>
     {
     admin.user_id != undefined ?
      <>
      <NavLink className="layoutTop w-28  rounded-lg p-2 h-10 text-center" to="/admin/">Home</NavLink>
       <NavLink className="layoutTop w-28  rounded-lg p-2 h-10 text-center" to="/admin/user">Utilisateurs</NavLink>
       <NavLink className="layoutTop w-28   rounded-lg p-2 h-10 text-center" to="/admin/cashpoint">Distributeurs</NavLink>
       <a href='#' className="ml-2" onClick={()=>{setIsOpen(true)}}>
       
             <img src={decoLogo} className="w-6 h-6 mt-1 ml-3" alt="" />
             </a> </>
            :
      <NavLink className="rounded-lg p-2 h-10 text-center" to="/">Se connecter en tant qu'utilisateur?</NavLink>
      }
    </nav>
 
<Modal isOpen={isOpen} onCancel={()=>setIsOpen(false)} onDeconnect={deconnect}></Modal>

    </div>
  <section className='mx-44 mt-24'>
  
    
  <Outlet></Outlet>
  </section>
  <small align="center" className='fixed text-base w-full text-slate-800  bottom-3 left-auto'>&copy;2023</small>

  
  </div>
}