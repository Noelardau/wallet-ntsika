
import { LoginAdmin } from "../components/LoginAdmin"
import { Login } from "../components/Login"
import Axios from "../services/Axios"
import { useWalletStore } from "../store"
import { useState, useSyncExternalStore } from "react"
import { Loader } from "../components/Loader"
import { HomeConnected } from "./HomeConnected"
import { HomeConnectedAdmin } from "./HomeConnectedAdmin"
import { Message } from "../components/Message"



export function HomeAdmin(){

    
    let setAdmin = useWalletStore(state=>state.setAdmin)
    let admin = useWalletStore(state=>state.admin)
    
    let [submitting, setSubmitting] = useState(false) 
    let [messOpen, setMessOpen] = useState(false)
    let [message, setMessage] = useState("")
    let [success, setSuccess] = useState()

    let connect = (data)=>{
    
        // console.log(data)
                Axios.post("/auth",data).then(d=>{
                    console.log(d.data.data)
                    // return 0
                   
                    let {nom, email , user_id, isActive, isAdmin, soldeActuel, password, contact} = d.data.data
        
                    if(isAdmin){
                        
                                    setSubmitting(true)
                                    setTimeout(()=>{
                                        setSubmitting(false)
                                        
                                        setAdmin({nom,email,user_id,soldeActuel, password, contact})
                                        // console.log(isActive)
                                        // connexion({nom, email, user_id},setUser)
                                    }, 500)
                    }else{
                        setMessage("compte administrateur introuvable!!!")
                        setSuccess(false)
                        setMessOpen(true)
                    }
                }).catch(err=>{
                  let m = {...err}
                  console.log(m.response.data.message)
                  setMessage(m.response.data.message)
                  setSuccess(false)
                  setMessOpen(true)
                    // console.log({...err}.response.data.message)
                    // let message = {...err}.response.data.message
        
                    // alert(message)
                    // alert("Identifiant incorrect!!")
                })
        
                // setUser()
            }


    return <>
    
        {/* <h1>Home admin ici!!!</h1> */}
        {messOpen ?<Message mess={message} success={false} messOpen={messOpen} onClose={()=>setMessOpen(false)}></Message> : ""}
       {
       admin.user_id == undefined ?
       
       <Login className={"mx-auto"} onSubmit={connect} user={false}></Login>

       :
       <HomeConnectedAdmin></HomeConnectedAdmin>
    }
     {submitting ? <Loader></Loader> : ""} 
    </>



}