import { TransfertForm } from "../components/TransfertForm"
import { useState } from "react"
// import { RetraitForm } from "../components/RetraitForm"
import { ConfirmationModal } from "../components/ConfirmationModal"
// import { ConfirmTransaction } from "../components/ConfirmTransaction"
import { Message } from "../components/Message"
import axios from "../services/Axios"
import { useWalletStore } from "../store"

export const DepotPage = ()=>{

  let [intentInfo, setIntentInfo] = useState()
    let contact = useWalletStore(store=>store.user).contact
    let solde = useWalletStore(store=>store.user).soldeActuel
    let setSolde = useWalletStore(store=>store.setSolde)


    let [confOpen,setConfOpen] = useState(false)
    let [messOpen,setMessOpen] = useState(false)
    let [message, setMessage] = useState("Distributeur introuvable")

    let [success, setSuccess] = useState(false)

    let Intent = (info)=>{

        // console.log(info)
        setIntentInfo(info)

        axios.get("/user/get?contact="+info.tel).then(data=>{
                let nom = data.data.data.nom
                let mess ="Effectuer le depot de "+nom
                setMessage(mess)
                setConfOpen(true)
                

        }).catch(e=>{
            setSuccess(false)
            setMessage("Distributeur introuvable!!")
            setMessOpen(true)
        })

      
    
    }

    let effectuerRetrait = ()=>{

        axios.post("/cp/depot",{
  
            "cpContact":contact,
            "contact_user":intentInfo.tel,
            "fund":intentInfo.somme
             
           }).then(data=>{
            // console.log(.amount)
            let {amount} = data.data.data
            setConfOpen(false)
        setMessage("Depot effectué!")
        setSuccess(true)
        setMessOpen(true)
        setSolde(solde - amount)
        
        }).catch(e=>{

            let error = {...e}
            console.log(error.response.data.message)
            setConfOpen(false)
            setMessage(error.response.data.message)
            setSuccess(false)
            setMessOpen(true)
           })
       
       

    }



    return <>
               <div className=" h-20">  </div>


        <TransfertForm onIntent={Intent} text="Depot d'argent"></TransfertForm>

        {confOpen ? <ConfirmationModal  message={message} isOpen={confOpen} onConfirm={effectuerRetrait} onCancel={()=>setConfOpen(false)}></ConfirmationModal> : ""}

{messOpen ?<Message mess={message} success={success} messOpen={messOpen} onClose={()=>setMessOpen(false)}></Message> : ""}

    
    </>

}