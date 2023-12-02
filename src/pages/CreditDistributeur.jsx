import {useForm} from "react-hook-form"
import { TransfertForm } from "../components/TransfertForm"
import { useWalletStore } from "../store"
import axios from "../services/Axios"
import { ConfirmationModal } from "../components/ConfirmationModal"
// import { ConfirmTransaction } from "../components/ConfirmTransaction"
import { Message } from "../components/Message"
import { useState } from "react"












export const CreditDistributeur = ()=>{
    
    let [intentInfo, setIntentInfo] = useState()


    let [confOpen,setConfOpen] = useState(false)
    let [messOpen,setMessOpen] = useState(false)
    let [message, setMessage] = useState("compte introuvable")
    let passWord = useWalletStore(store=>store.admin).password
console.log(passWord)
    let setSolde = useWalletStore(store=>store.setSolde)

    let [success, setSuccess] = useState(false)

    let Intent = (data)=>{
        setIntentInfo(data)
            if(passWord == data.pass){

                axios.get("/user/get?contact="+data.tel).then(data=>{
                let nom = data.data.data.nom
                let mess ="Voulez-vous crediter le compte de "+ nom
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
        setMessage("Tranfert effectué!")
        setSuccess(true)
        setMessOpen(true)

        axios.post("/cp/depot",{
  
            "cpContact":contact,
            "contact_user":intentInfo.tel,
            "fund":intentInfo.somme
             
           }).then(data=>{
            // console.log(.amount)
            let {amount} = data.data.data
            setConfOpen(false)
        setMessage("Transfert effectué!")
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
    
    <TransfertForm text="Créditer compte" onIntent={Intent}></TransfertForm>
    {confOpen ? <ConfirmationModal  message={message} isOpen={confOpen} onConfirm={effectuerRetrait} onCancel={()=>setConfOpen(false)}></ConfirmationModal> : ""}

{messOpen ?<Message mess={message} success={success} messOpen={messOpen} onClose={()=>setMessOpen(false)}></Message> : ""}
    
    
    </>

    // let {register,handleSubmit,formState:{errors}} = useForm()

    // return <form onSubmit={handleSubmit(effectuerCredit)} className="w-full flex flex-col justify-center bg-white p-5 rounded-3xl shadow-sm">
    
                  
    
                  
    // <label htmlFor="nom" className="block font-bold text-blue-500">Numéro téléphone (Cash point) </label>            
    //                 <input type="number"  placeholder="teléphone" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="tel" id="tel" {...register("tel")} required />
                  
               
    //                 <label htmlFor="somme" className="block font-bold text-blue-500">Somme (Ar)</label>             
    //                 <input type="number" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="somme" name="somme" id="somme" {...register("somme")} />
                    
    
                   
                    
    //                 <div className="flex mt-4 justify-between w-full">
    //                <div>
                  
    //                </div>
    //                 <button href="#" className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">Ok <img src="../src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
    //                 </div>
                    
                   
    
                
    
    
    // </form>
     
}