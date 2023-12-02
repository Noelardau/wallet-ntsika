import { Login } from "../components/Login"
import { connexion } from "../services/Connexion"
import { UpdateForm } from "../components/updateForm"

import { useWalletStore } from "../store"
import { useEffect, useState } from "react"
import { Message } from "../components/Message"
import { Loader } from "../components/Loader"
import { Popup } from "../components/Popup"
import Axios from "../services/Axios"
import { HomeConnected } from "../pages/HomeConnected"

import { useNavigate } from "react-router-dom"





export const Home = ()=>{

    // let navige = useNavigate()
    // navige("/admin")

    useEffect(()=>{
        // par axios 
        setUserToUpdate({user_id:1, Nom:"Marc",Prenom:"Smith",pseudo:"blabla",email_user:"noe@gmail.com",contact_user:"0325022627","password":"kjkj"})

    },[])
    let [messageData,setMessageData]= useState({message:"Veuillez remplir tout les champs!!",success:false, open:false})
    let testMess = ()=>{
        setMessageData(state=>state = {...state,open:true})
    }

    let closeMess = ()=> setMessageData(state=> state = {...state, open:false})

    let [messOpen,setMessOpen] = useState(false)
    let [message, setMessage] = useState("Distributeur introuvable")
    let [success, setSuccess] = useState(false)





    let [userToUpdate, setUserToUpdate] = useState({}) 
    let [submitting, setSubmitting] = useState(false) 
    let saveUpdate = (e)=>{
        e.preventDefault()
        console.log(userToUpdate)
    }

    let setUser = useWalletStore(state=>state.setUser)
    let user = useWalletStore(state=>state.user)


    let [popupOpen, setPopupOpen] = useState(true)
    
    let connect = (data)=>{

// console.log(data)
        Axios.post("/auth",data).then(d=>{
            console.log(d.data.data)
            let {nom, email , user_id, isActive, isAdmin, cash_point, soldeActuel, contact,marchand, password} = d.data.data
            console.log(marchand)
            
            if(isAdmin){
                setMessage("Compte introuvable!!")
                setMessOpen(true)

            }else{

                // if(cashPoint)

                if(isActive){
                    
                            setSubmitting(true)
                            setTimeout(()=>{
                                setSubmitting(false)
                
                                console.log(isActive)
                                setUser({nom, email, user_id, cash_point, soldeActuel, contact, password,marchand})
                                // connexion({nom, email, user_id, cash_point, soldeActuel, contact},setUser)
                            }, 500)
            }else{
                // alert()
                setMessage("Compte suspendu, contacter un administrateur!!")
                setMessOpen(true)
            }
                }
        }).catch(err=>{
            console.log({...err}.response.data.message)
            let message = {...err}.response.data.message

            // alert(message)
            setMessage(message+"!!")
            setMessOpen(message)
            setMessOpen(true)
            // alert("Identifiant incorrect!!")
        })

        // setUser()
    }

    return <>
    {/* <div onClick={testMess}>test message</div> */}
    {submitting ? <Loader></Loader> : ""} 
    
       {messOpen ?<Message mess={message} success={false} messOpen={messOpen} onClose={()=>setMessOpen(false)}></Message> : ""}
    
    {/* <Popup isOpen={popupOpen} onClose={()=>setPopupOpen(false)}></Popup> */}
    
     {
        user.user_id ? <HomeConnected></HomeConnected> :  
        <Login className={"mx-auto"} onSubmit={connect}></Login>
       }
    
    
    </>







}