import { NavLink, Outlet } from "react-router-dom"

import { useWalletStore } from "../store"
import listLogo from "/src/assets/list_96px.png"
import card from "/src/assets/card_payment_96px.png"

export const TransactionLayoutAdmin = ()=>{

   
    let isAdmin = useWalletStore(store=>store.admin).isAdmin
    // console.log(isCashPoint)


    return <>
    
    <div className="bg-white shadow-2xl  fixed top-20 w-32 h-full opacity-90 left-0 p-5 pt-5 flex flex-col justify-between content-center">
        <nav>
        

    <NavLink className={`text-sm block p-5 layoutRight`} to=" ">
    <img src={listLogo} className="w-10 h-10"  alt="" />

    </NavLink>
    {/* ra cash point ny user  <NavLink className={`text-sm block pt-5`} to="crediter">Depot d'argent</NavLink> */}
    
        <NavLink className={`text-sm block p-5 layoutRight`} to="crediter">
                <img src={card} className="w-10 h-10"  alt="" />

        </NavLink>
    
   
    
    {/* <NavLink className={`text-sm block pt-5`} to="credit">Créditer un compte</NavLink> */}


        </nav>



    </div>


    <div className=" w-full h-auto ml-24 ">

<Outlet></Outlet>
    </div>
    
    
    
    
    
    
    </>






}