
import { useEffect, useState } from "react"
import axios from "../services/Axios"
import { UserViewList} from "../components/UserViewList"
import { ConfirmationModal } from "../components/ConfirmationModal"


export const Distributeurs =  ()=>{

    let [userList, setUserList] = useState([])
    let [keySearch, setKeySearch] = useState("")


    let [isOpenSuspend,setIsOpenSuspend] = useState(false)
    let [activeOrSuspend, setActiveOrSuspend] = useState(true)
    let [idToSuspend, setIdToSuspend] = useState(0)
    
    let [isOpenDelete,setIsOpenDelete] = useState(false)
    let [idToDelete, setIdToDelete] = useState(0)

    



    
    useEffect(()=>{
        axios.get(`/user/all?nb=5`).then(data=>{
            // verifier e.cashpoint
            setUserList(data.data.data.filter(e=>!e.isAdmin))
            console.log(data.data.data)
        
        }).catch(e=>console.log(e))
    },[keySearch])

    let search = (e)=>{
        e.preventDefault()
        axios.get(`/user/get?email=${keySearch}`).then(data=>{
            setUserList([data.data.data])
        }).catch(e=>{
            let erreur = {...e}
            console.log(erreur.response.data)

        })


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
    } 
    
    const confirmSuspend = (cause)=>{
        console.log(idToSuspend)
        // axios 
        if(activeOrSuspend){
            alert("suspendre , cause: " + cause)
            axios.post("/admin/desable?user_id="+idToSuspend,{cause}).then(data=>console.log(data)).catch(e=>console.log(e))
        }else{
            alert("activer")
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
            Distributeurs
        </div>
<ConfirmationModal onConfirm={confirmSuspend} onCancel={cancelSuspend}  isOpen={isOpenSuspend} active={activeOrSuspend} ></ConfirmationModal>

<ConfirmationModal onConfirm={confirmDelete} onCancel={cancelDelete}  isOpen={isOpenDelete} message={"Voulez-vous supprimer ce compte?"} ></ConfirmationModal>
        <form onSubmit={search} className="mt-5">
            <input type="email" placeholder="utilisateur..." value={keySearch} onChange={(e)=>setKeySearch(e.target.value)} />
            <button className="bg-blue-600 text-white p-2 rounded-md ml-3">search</button>
        </form>
        <div className="mt-5">
{/* <UserViewList email={"nul@gmail.com"}></UserViewList> */}
            {
                // userList.map((user,key)=>(<>
                //     <li key={key}>{user.email} | <button className="bg-blue-600 text-white p-2 rounded-md">Suspendre</button> | <button className="bg-red-600 text-white p-2 rounded-md">Supprimer</button></li>
                    
                //     </>))
                    
                    userList.map((user,key)=>(<>
               <UserViewList email={user.email} 
                    user_id={user.user_id}
                    onToggleSuspend={showModalSuspend}
                    onDelete={showModalDelete}
                    isActive={user.isActive}
               ></UserViewList>
                </>))
            }
        </div>
    </>
}