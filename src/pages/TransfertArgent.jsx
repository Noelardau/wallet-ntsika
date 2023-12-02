import { TransfertForm } from "../components/TransfertForm"
import { useState } from "react"
// import { RetraitForm } from "../components/RetraitForm"
import { ConfirmationModal } from "../components/ConfirmationModal"
// import { ConfirmTransaction } from "../components/ConfirmTransaction"
import { Message } from "../components/Message"
import axios from "../services/Axios"
import { useWalletStore } from "../store"


export const TransfertArgent = (type="user")=>{

    let [intentInfo, setIntentInfo] = useState()


    let [confOpen,setConfOpen] = useState(false)
    let [messOpen,setMessOpen] = useState(false)
    let [message, setMessage] = useState("compte introuvable")
    let passWord = type == "user" ? useWalletStore(store=>store.user).password : useWalletStore(store=>store.admin).password 
    let contact = type == "user" ? useWalletStore(store=>store.user).contact : useWalletStore(store=>store.admin).contact
// console.log(contact)

    let [success, setSuccess] = useState(false)

    let Intent = (data)=>{
            let somme = data.somme

            let frais = (somme * 1.3)/100

            setIntentInfo(data)
            if(passWord == data.pass){

                axios.get("/user/get?contact="+data.tel).then(data=>{
                let nom = data.data.data.nom
                let mess =`Effectuer le tranfert de ${somme} Ar (frais : ${frais} Ar) pour  ${nom}`
                setMessage(mess)
                setConfOpen(true)
                

        }).catch(e=>{
            setSuccess(false)
            setMessage("Compte introuvable !!")
            setMessOpen(true)
        })

        }else{
            setSuccess(false)
            setMessage("Mot de passe incorrecte !!")
            setMessOpen(true)
        }
      
    
    }

    let effectuerRetrait = ()=>{
        console.log(intentInfo)
        
        setConfOpen(false)
        axios.post("/user/p2p",{
  
            "contact_receiver":intentInfo.tel,
            "contact_sender":contact,
            "fund":intentInfo.somme
             
           }).then(data=>{
            console.log(data)
            setMessage("Tranfert effectué!")
        setSuccess(true)
        setMessOpen(true)

           }).catch(e=>{
            console.log(e)
            setMessage("Tranfert echoué!")
        setSuccess(false)
        setMessOpen(true)

           })
       
        // setMessage("Tranfert effectué!")
        // setSuccess(true)
        // setMessOpen(true)

    }






    return <>
       <div className=" h-20">
       </div>
        <TransfertForm onIntent={Intent}></TransfertForm>

        {confOpen ? <ConfirmationModal  message={message} isOpen={confOpen} onConfirm={effectuerRetrait} onCancel={()=>setConfOpen(false)}></ConfirmationModal> : ""}

{messOpen ?<Message mess={message} success={success} messOpen={messOpen} onClose={()=>setMessOpen(false)}></Message> : ""}

    
    </>
}