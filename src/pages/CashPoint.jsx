import { useState } from "react"
import {useForm} from "react-hook-form"
import axios from "../services/Axios"




export const CashPoint = ()=>{


    let [step, setStep] = useState(1)
    let [newUser, setNewUser] = useState({
        nom:"", prenom:"", contact:"", email:"", password:"", password1:"", pseudo:"", solde:0, wn_sub:"", marchand:false, cash_point: false, CODE:""
    })

    let {register,handleSubmit,formState:{errors}} = useForm()

    let onSub = (data)=>{
        console.log(data)
    }

    let changeStepDown = ()=> setStep(s=>s=s-1)

  
    let changeStepUp = ()=>{


console.log(step)

            let {
                nom, prenom, contact, email, password, password1, pseudo, solde
            } =  newUser
        if(step == 1){
           
            if(nom== "" || prenom == ""){

                return 0
            } 

        }
        if(step == 2){
            
            if(email =="" || contact==""){
                return 0
            }
            
        }
        if(step == 4){
            if(pseudo =="" || password=="" || password1 == ""){
                return 0
            }
        }

        if(step == 3){
console.log(solde)
            if(solde == 0){
                return 0
            }

        }


        setStep(s=>s = s + 1)




    }

    let testConfirm = (e)=>{
        e.preventDefault()
        console.log(newUser)

        axios.post("/signup/sub",{email:newUser.email}).then(data=>{
            console.log(data.data.data)
           setNewUser({...newUser, CODE: data.data.data})
           console.log(newUser)
            setTimeout(()=>{
            changeStepUp() 
            
          },1000)  


          }).catch(e=>{
            console.log(e)
          })



    }

    let confirmCode = (e)=>{
        e.preventDefault()
            console.log(newUser.CODE)
            console.log(newUser.wn_sub)
            console.log(newUser)
            axios.post("/signup/confirm",newUser).then(data=>{
                console.log(data)
                changeStepUp()
            //     setTimeout(()=>{
            //       setStep(step=>step = step + 1) 
                
            //   },1000)  
              }).catch(e=>{
                console.log(e)
                let mess = {...e}
                alert(mess.response.data.message)
              })
  
    }



    return <>

        <div className="text-[#4371BA] text-3xl">User (Cash point)</div>

    


        

        <form className="w-full flex justify-center bg-white p-5 rounded-3xl shadow-sm">

        {
    step == 5 ?
    <>
        <input type="text" value={newUser.wn_sub}  placeholder="XXXX" onChange={(e)=>{ setNewUser({...newUser, wn_sub:e.target.value})
        }}/> 
        <button onClick={confirmCode} >Valider</button>
    </> : ''
}

{
    step == 6 ?
    <>
       Felicitations!! votre compte a été bien crée...
    </> : ''
}

{
    step == 1 ?
<div className="w-full">
<h1 className="text-2xl mb-5 flex-none">Informations personnelles</h1>
               

               
             <label htmlFor="nom" className="block font-bold text-blue-500">Nom</label>
                 <input  type="text" placeholder="Nom" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="nom" value={newUser.nom} onChange={(e)=>setNewUser(s=>s={...s,nom:e.target.value})} />
               
                 <label htmlFor="nom" className="block font-bold text-blue-500">Prénom(s)</label>          
                 <input type="text" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Prénoms" name="prenom" id="prenom" value={newUser.prenom} onChange={(e)=>setNewUser(s=>s={...s,prenom:e.target.value})}  required  />
                 
           
                
                 
                 <div className="flex mt-4 justify-between w-full">
                <div>
                
                </div>
                 <button  className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={(e)=>{e.preventDefault(); changeStepUp()}}>Suivant <img src="../src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
                 </div>
                 
                
 
             
 
</div> : ""
}


{
    step==2 ?
<div className="w-full">

<h1 className="text-2xl mb-5">Contact</h1>
              

              
<label htmlFor="nom" className="block font-bold text-blue-500">Téléphone</label>            
                <input type="tel" placeholder="teléphone" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="tel" value={newUser.contact} onChange={(e)=>setNewUser(s=>s={...s,contact:e.target.value})}   />
              
           
                <label htmlFor="nom" className="block font-bold text-blue-500">Email</label>             
                <input type="email" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="adresse email" name="mail" id="mail" value={newUser.email} onChange={(e)=>setNewUser(s=>s={...s,email:e.target.value})} required/>
                

               
                
                <div className="flex mt-4 justify-between w-full">
               <div>
               <button  className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={(e)=>{e.preventDefault(); changeStepDown()}}>Précedent <img src="../src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
               </div>
                <button href="#" className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={(e)=>{e.preventDefault(); changeStepUp()}}>Suivant <img src="../src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
                </div>
                
               

            


</div> : ""

}

{
    step == 3 ?
<div className="w-full">

<h1 className="text-2xl mb-5">Solde</h1>
              

              
            
{/* <label htmlFor="nom" className="block font-bold text-blue-500">Nom</label> */}
                <input type="text" placeholder="Nom d'utilisateur" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="solde" value={newUser.solde} onChange={(e)=>setNewUser(s=>s={...s,solde:e.target.value})}   />
              
           
               
                
                <div className="flex mt-4 justify-between w-full">
               <div>
               <button  className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={(e)=>{e.preventDefault(); changeStepDown()}}>Précedent <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
               </div>
                <button className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={(e)=>{e.preventDefault(); changeStepUp()}}>Suivant dfd <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
                </div>
                
               

            






</div> : ""


}

{
    step == 4 ?
<div className="w-full">

<h1 className="text-2xl mb-5">Compte utilisateur</h1>
              

              
            
             <label htmlFor="nom" className="block font-bold text-blue-500">Pseudo</label>
                <input type="text" placeholder="Nom d'utilisateur" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="userName" value={newUser.pseudo} onChange={(e)=>setNewUser(s=>s={...s,pseudo:e.target.value})}   />
              
           
             
             <label htmlFor="nom" className="block font-bold text-blue-500">Mot de passe</label>
                <input type="password" className="w-full mb-5 bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Mot de passe" name="pass" id="pass" value={newUser.password} onChange={(e)=>setNewUser(s=>s={...s,password:e.target.value})}  />
                
             <label htmlFor="nom" className="block font-bold text-blue-500">Confirmer votre mot de passe</label>
                <input type="password" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Confirmer votre mot de passe" name="pass1" id="pass1" value={newUser.password1} onChange={(e)=>setNewUser(s=>s={...s,password1:e.target.value})}  />
                

               
                
                <div className="flex mt-4 justify-between w-full">
               <div>
               <button  className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={(e)=>{e.preventDefault(); changeStepDown()}}>Précedent <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
               </div>
                <button className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={testConfirm}>Enregistrer <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
                </div>
                
               

            






</div> : ""


}

{/* {
    step == 5 ?

    : ""
} */}





        </form>
    
    
    
    </>
}