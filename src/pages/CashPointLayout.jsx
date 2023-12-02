import { NavLink, Outlet } from "react-router-dom"

export const CashPointLayout = ()=>{




    return <>
    
    <div className="bg-white text-blue-500 rounded-lg absolute w-60 h-96 opacity-90 left-0 p-5 pt-5">
        <nav>

   
    <NavLink className={`text-sm block pt-5`} to="">Créer un nouveau compte distributeur</NavLink>
    <NavLink className={`text-sm block pt-5`} to="credit">Créditer un compte</NavLink>


        </nav>


    </div>


    <div className=" w-full h-auto ml-24 ">

<Outlet></Outlet>
    </div>
    
    
    
    
    
    
    </>






}