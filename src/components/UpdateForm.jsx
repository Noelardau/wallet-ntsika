import { useEffect, useState } from "react"
import Axios from "../services/Axios"

import { useWalletStore } from "../store"
import { Loader } from "./Loader"



export const UpdateForm = ()=>{

    let user = useWalletStore(state=>state.user)
    let setUser = useWalletStore(state=>state.setUser)
    let [submitting,setSubmitting] = useState(false)
    let [solde,setSolde] = useState(0)

    useEffect(()=>{
        Axios.get(`/user/get?user_id=${user.user_id}`).then(data=>{
            
            let {soldeActuel} = data.data.data
            setUserToUpdate({...data.data.data})
            setSolde(solde)
            
        
        })
        setUserToUpdate({user_id:1, nom:"Marc",pseudo:"blabla",email:"noe@gmail.com",contact:"0325022627","password":"kjkj"})

    },[])

    let [userToUpdate, setUserToUpdate] = useState({user_id:"", nom:"",pseudo:"",email:"",contact:"","password":""}) 
    let saveUpdate = (e)=>{
        e.preventDefault()
       
        Axios.post(`/user/update?user_id=${user.user_id}`,userToUpdate).then(data=>{
            let {email, nom, user_id} = data.data.data
            
            setSubmitting(true)            
            setTimeout(()=>{
                setUser({email, nom, user_id})
                setSubmitting(false)
            },500)

        }).catch(e=>{
            console.log(e)
        })
    }

    return <>
    {submitting ? <Loader></Loader> : ''}
       <form className="w-full  bg-white p-5 rounded-3xl">
        <div className="flex justify-between">

            
            <div>
            <img src="./src/assets/lock_208px.png" className="w-10 h-10"  />
            </div>

            <div className="flex content-center">
            <div className="text-3lg font-bold">Solde: {solde} Ar folo </div>
            

            </div>            <div>
                <div className="text-3lg font-bold">Informations personnelles</div>
                <br />
                <input value={userToUpdate.nom} onChange={(e)=>setUserToUpdate(state=> state = {...state,nom:e.target.value})} type="text" name="nom" id="nom" placeholder="nom" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-4" /> <br />
                {/* <input value={userToUpdate.Prenom} onChange={(e)=>setUserToUpdate(state=> state = {...state,Prenom:e.target.value})} type="text" name="prenom" id="prenom" placeholder="prenom" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-4"/> */}
                
                <div className="text-3lg font-bold">Contacts</div>

                <input value={userToUpdate.contact} onChange={(e)=>setUserToUpdate(state=> state = {...state,contact:e.target.value})} type="tel" name="tel" id="tel" placeholder="telephone" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-4"/> <br />
                <input value={userToUpdate.email} onChange={(e)=>setUserToUpdate(state=> state = {...state,email:e.target.value})} type="email" name="mail" id="mail" placeholder="email" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-4"/>
            </div>

            <div>
            <div className="text-3lg font-bold">Compte utilisateur</div>
            
                <input value={userToUpdate.pseudo} onChange={(e)=>setUserToUpdate(state=> state = {...state,pseudo:e.target.value})} type="text" name="username" id="username" placeholder="username" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-4"/> <br />
                <input value={userToUpdate.password} onChange={(e)=>setUserToUpdate(state=> state = {...state,password:e.target.value})} type="password" name="pass" id="pass" placeholder="Mot de passe" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-4"/>
               <br />
        <button onClick={saveUpdate} className="bg-[#4371BA] w-auto text-center text-white p-2 rounded-xl  hover:bg-blue-600 ">Enregistrer modification</button>

            </div>




        </div>
           
       


        </form>
    
    
    </>
}