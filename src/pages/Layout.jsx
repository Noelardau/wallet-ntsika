import { useState } from "react";
import { Modal } from '../components/Modal'
import { Outlet, NavLink } from "react-router-dom";
import Redirection from "../hooks/Redirection"; 
import { useWalletStore } from "../store";
import { connexion } from "../services/Connexion";
import logIcon from "/src/assets/logout_208px.png"  
import compteIcon from "/src/assets/male_user_144px.png"



export const Layout = ()=>{


console.log(logIcon)
    let [isOpen, setIsOpen] = useState(false)
    let setUser = useWalletStore(s=>s.setUser)
    let user = useWalletStore(state=>state.user)

    let deconnect = ()=>{
      setUser({})
      setIsOpen(false)

      
      
      }

    return <div>
      <Redirection></Redirection>
    <div className="flex justify-around w-full h-20 fixed top-0 p-5 bg-white z-50">

    <div className="text-3xl text-[#4371BA] shadow-3xl font-bold">Wallet'ntsika</div>

    <nav className='text-sm text-[#4371BA] w-80 flex justify-around items-center '>
      <NavLink to="/" className="layoutTop w-28  rounded-lg p-2 h-10 text-center">Acceuil</NavLink>
      <NavLink to="/about" className="layoutTop w-28  rounded-lg p-2 h-10 text-center">
        A propos
        {/* <img src="./src/assets/info_500px.png" className="w-4 h-4 inline ml-1" alt="" /> */}
        
        </NavLink>
      {
        user.user_id ? 
        <> 
        {/* <NavLink to="/transaction" className="layoutTop w-28  rounded-lg p-2 h-10 text-center"> */}
            {/* Transaction */}
            {/* <img src="./src/assets/transaction_480px.png" className="w-4 h-4 inline ml-1" alt="" /> */}
            
            {/* </NavLink> */}
        
        {/* <NavLink to="/compte" className="layoutTop w-28  rounded-lg p-2 h-10 text-center"> */}
            {/* Compte  */}
            {/* <img src="./src/assets/male_user_512px.png" className="w-4 h-4 inline ml-1" alt="" /> */}
        {/* </NavLink>  */}
        {/* <NavLink to="compte" className=" w-28  rounded-lg  h-10 text-center">
        
        <img src={compteIcon} className="w-10 h-10 inline ml-1" alt="" />
        
        </NavLink> */}
        <a href='#' onClick={()=>{setIsOpen(true)}} >
            <img src={logIcon} className="w-4 h-4 mt-1" alt="" />
            </a> </> : <> 
     
        </>
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