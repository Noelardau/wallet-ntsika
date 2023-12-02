import { NavLink, Outlet } from "react-router-dom"

import { useWalletStore } from "../store"

export const TransactionLayout = ()=>{

    let isCashPoint = useWalletStore(store=>store.user).cash_point
    let isMarchand = useWalletStore(store=>store.user).marchand
    let soldeActuel = useWalletStore(store=>store.user).soldeActuel
    // console.log(isCashPoint)


    return <>
    
    <div className="bg-white shadow-2xl  fixed top-20 w-32 h-full opacity-90 left-0 p-5 pt-5 flex flex-col justify-between content-center">
        <nav>
        

    <NavLink className={`text-sm block p-5 layoutRight`} to=" ">
    <img src="../src/assets/list_96px.png" className="w-10 h-10"  alt="" />

    </NavLink>
    {/* ra cash point ny user  <NavLink className={`text-sm block pt-5`} to="crediter">Depot d'argent</NavLink> */}
    {
        isCashPoint ?
        <NavLink className={`text-sm block p-5 layoutRight`} to="depot">
            
            <img src="../src/assets/card_payment_96px.png" className="w-10 h-10"  alt="" />
        </NavLink> :
        <NavLink className={`text-sm block p-5 layoutRight`} to="crediter">
                <img src="../src/assets/card_payment_96px.png" className="w-10 h-10"  alt="" />

        </NavLink>
    }
    {
        !isCashPoint ? <NavLink className={`text-sm block p-5 layoutRight text-center `} to="retrait">
                <img src="../src/assets/request_money_96px.png" className="w-10 h-10"  alt="" />
        </NavLink>: ""
    } 
    
    {
        isMarchand ? <NavLink className={`text-sm block p-5 layoutRight text-center `} to="api">
                <img src="../src/assets/api_512px.png" className="w-10 h-10"  alt="" />

        </NavLink>: ""
    }
    
    {/* <NavLink className={`text-sm block pt-5`} to="credit">Créditer un compte</NavLink> */}


        </nav>

        <div>
            solde: {soldeActuel} Ar
        </div>


    </div>


    <div className=" w-full h-auto ml-24 ">

<Outlet></Outlet>
    </div>
    
    
    
    
    
    
    </>






}