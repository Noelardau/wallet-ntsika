import { NavLink } from "react-router-dom"



export const UserViewList = ({user_id, contact,email,isActive,onToggleSuspend, onDelete, isCashPoint})=>{


    let toogleSuspend = (id,isActive)=>{
            //axios supend
            onToggleSuspend(id,isActive)
    }

    return <div className="w-full mb-2 h-20 flex justify-between content-center border-b-2 border-blue-500">

        <div className="w-auto p-2">
              <div>
              {email} {isCashPoint ? "(Cash point)" : ""}
              </div>
              {contact}
        </div>

        <div className="w-auto p-2 pr-2 flex justify-between content-center ">
<div>
    <button   className="bg-blue-600 text-center text-white p-2 rounded-xl w-36 hover:bg-red-700 " >
        <NavLink to={"/admin/transaction/"+user_id}>voir transaction</NavLink>
    </button>
</div>          
          
          <div>
          {isActive ?           
<button className="bg-[#4371BA] text-center text-white p-2 rounded-xl w-36 hover:bg-blue-600 " onClick={()=>toogleSuspend(user_id,isActive)}>Suspendre</button>
:
<button className="bg-[#4371BA] text-center text-white p-2 rounded-xl w-36 hover:bg-blue-600 " onClick={()=>toogleSuspend(user_id, isActive)}>
    reactiver
</button>    
        }  
        </div>  
           
<div>
    <button className="bg-red-600 text-center text-white p-2 rounded-xl w-36 hover:bg-red-700 " onClick={()=>onDelete(user_id)}>Supprimer</button>
</div>
        </div>

    </div>
}