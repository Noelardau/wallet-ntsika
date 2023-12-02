import { useState } from "react"
import { RetraitForm } from "../components/RetraitForm"
import { ConfirmationModal } from "../components/ConfirmationModal"
// import { ConfirmTransaction } from "../components/ConfirmTransaction"
import { Message } from "../components/Message"
import axios from "../services/Axios"
import { useWalletStore } from "../store"


export const Retrait = ()=>{

    let [intentInfo, setIntentInfo] = useState()
    let contact = useWalletStore(store=>store.user).contact
    console.log(contact)
    let solde = useWalletStore(store=>store.user).soldeActuel
    let setSolde = useWalletStore(store=>store.setSolde)
    let passWord = useWalletStore(store=>store.user).password


    let [confOpen,setConfOpen] = useState(false)
    let [messOpen,setMessOpen] = useState(false)
    let [message, setMessage] = useState("Distributeur introuvable")

    let [success, setSuccess] = useState(false)

    let Intent = (info)=>{

        // console.log(info)
        
        let frais = (info.somme * 1.3)/100
        setIntentInfo({...info, frais})
        if(info.pass == passWord){

            axios.get("/user/get?contact="+info.tel).then(data=>{
                let nom = data.data.data.nom
                let mess =`Effectuer le retrait de ${info.somme} Ar (frais: ${frais} Ar) auprès de ${nom}`
                setMessage(mess)
                setConfOpen(true)
                

        }).catch(e=>{
            setSuccess(false)
            setMessage("Distributeur introuvable!!")
            setMessOpen(true)
        })
        
    }else{
        setSuccess(false)
        setMessage("Mot de pass incorrect!!")
        setMessOpen(true)
    }
        
        
    }

    let effectuerRetrait = ()=>{

        axios.post("/cp/retrait",{
  
            "cpContact":intentInfo.tel,
            "contact_user":contact,
            "fund":intentInfo.somme
             
           }).then(data=>{
            // console.log(.amount)
            let {amount} = data.data.data

            setConfOpen(false)
         

            setMessage("retrait effectué!")
            setSuccess(true)
            setMessOpen(true)
            // setSolde(solde - (amount+intentInfo.frais))
          

        
        }).catch(e=>{
            let error = {...e}
            console.log(error)
            console.log(error.response.data.message)
            setConfOpen(false)
            if(error.response.data.message!=undefined){

                setMessage(error.response.data.message)
            }else{
                setMessage(error.message)
                console.log(error.message);

            }
            setSuccess(false)
            setMessOpen(true)
           })
       
     

    }

    return <div>
       <div className=" h-20">  </div>

       <RetraitForm onIntent={Intent}></RetraitForm>
      {confOpen ? <ConfirmationModal  message={message} isOpen={confOpen} onConfirm={effectuerRetrait} onCancel={()=>setConfOpen(false)}></ConfirmationModal> : ""}
       {messOpen ?<Message mess={message} success={success} messOpen={messOpen} onClose={()=>setMessOpen(false)}></Message> : ""}
    
    </div>
}