
import { useEffect, useMemo, useState } from "react"
import axios from "../services/Axios"
import { UserViewList} from "../components/UserViewList"
import { ConfirmationModal } from "../components/ConfirmationModal"


export const Users = ()=>{

    let [userList, setUserList] = useState([])
    let [keySearch, setKeySearch] = useState("")


    let [isOpenSuspend,setIsOpenSuspend] = useState(false)
    let [activeOrSuspend, setActiveOrSuspend] = useState(true)
    let [idToSuspend, setIdToSuspend] = useState(0)
    
    let [isOpenDelete,setIsOpenDelete] = useState(false)
    let [idToDelete, setIdToDelete] = useState(0)

    let [ret, setRet] = useState(false)

    



    
    useEffect(()=>{
        axios.get(`/user/all?nb=5`).then(data=>{
            setUserList(data.data.data.filter(e=>!e.isAdmin))
            console.log("user list",data.data.data)
        
        }).catch(e=>console.log(e))
    },[keySearch])

    let search = (e)=>{
        e.preventDefault()
        axios.get(`/user/get?email=${keySearch}`).then(data=>{
            setUserList([data.data.data])
            setRet(true)
        }).catch(e=>{
            let erreur = {...e}
            console.log(erreur.response.data)

        })


    }

    let reload = ()=>{
        setKeySearch("")
        axios.get(`/user/all?nb=5`).then(data=>{
            setUserList(data.data.data.filter(e=>!e.isAdmin))
            console.log("user list",data.data.data)
        
        }).catch(e=>console.log(e))
    }


    const showModalSuspend = (id,isActive)=>{
        setIdToSuspend(id)
        setIsOpenSuspend(true)
        setActiveOrSuspend(isActive)
        console.log(id)
    }

    const showModalDelete = (id)=>{
        setIdToDelete(id)
        setIsOpenDelete(true)
    }

    const confirmDelete = ()=>{        
        console.log(idToDelete)
        axios.get("/user/delete?user_id="+idToDelete).then(data=>{
            console.log(data)
            
              setUserList(state =>state = state.filter(e=>e.user_id!= idToDelete))
              setIsOpenDelete(false)

        })
        // axios 
// console.log(activeOrSuspend)



    }  
    
    const confirmSuspend = (cause)=>{
        console.log(idToSuspend)
        // axios 
        if(activeOrSuspend){
            
            axios.post("/admin/desable?user_id="+idToSuspend,{cause}).then(data=>console.log(data)).catch(e=>console.log(e))
        }else{
            
            console.log(`${idToSuspend} à réactiver`)
            axios.get("/admin/enable?user_id="+idToSuspend).then(data=>console.log(data)).catch(e=>console.log(e))

        }
        setUserList(state =>state = state.map(e=> e.user_id == idToSuspend ? {...e, isActive:!e.isActive} : e))
        setIsOpenSuspend(false)


    } 
    
    
    const cancelDelete = ()=>{
        setIdToDelete(0)
        setIsOpenDelete(false)


    }
    
    const cancelSuspend = ()=>{
        setIdToSuspend(0)
        setIsOpenSuspend(false)


    }

    return <>
        <div className="text-[#4371BA] text-3xl">
        Gérer les utilisateurs
        </div>
<ConfirmationModal onConfirm={confirmSuspend} onCancel={cancelSuspend}  isOpen={isOpenSuspend} active={activeOrSuspend} ></ConfirmationModal>

<ConfirmationModal onConfirm={confirmDelete} onCancel={cancelDelete}  isOpen={isOpenDelete} message={"Voulez-vous supprimer ce compte?"} ></ConfirmationModal>
        <form onSubmit={search} className="mt-5">
            <input className=" bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" type="email" placeholder="email..." value={keySearch} onChange={(e)=>setKeySearch(e.target.value)} />
            <button className="bg-blue-600 text-white p-2 rounded-md ml-3">search</button>
        </form>
        {ret ? <div className="hover:cursor-pointer" onClick={reload}>Afficher toute la liste</div> : ""}
        <div className="mt-5">
{/* <UserViewList email={"nul@gmail.com"}></UserViewList> */}
            {
                // userList.map((user,key)=>(<>
                //     <li key={key}>{user.email} | <button className="bg-blue-600 text-white p-2 rounded-md">Suspendre</button> | <button className="bg-red-600 text-white p-2 rounded-md">Supprimer</button></li>
                    
                //     </>))
                    
                    userList.map((user,key)=>(<>
               <UserViewList email={user.email} 
               contact={user.contact}
                    user_id={user.user_id}
                    onToggleSuspend={showModalSuspend}
                    onDelete={showModalDelete}
                    isActive={user.isActive}
                    isCashPoint={user.cash_point}
               ></UserViewList>
                </>))
            }
        </div>
    </>
}