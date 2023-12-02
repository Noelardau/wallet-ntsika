import { useState } from "react"
import {useForm} from "react-hook-form"
import axios from "../services/Axios"

import {NavLink} from "react-router-dom"

import { Message } from "../components/Message"



export const SignInUserTwo = ()=>{


    let [step, setStep] = useState(1)
    let [newUser, setNewUser] = useState({
        nom:"", prenom:"", contact:"", email:"", password:"", password1:"", pseudo:"", solde:0, wn_sub:"", marchand:false, cash_point: false, CODE:""
    })

    let [message, setMessage] = useState("")
    let [success,setSuccess] = useState(false)
    let [isOpen,setIsOpen] = useState(false)
    let {register,handleSubmit,formState:{errors}} = useForm()

    let onSub = (data)=>{
        console.log(data)
    }

    let changeStepDown = ()=> setStep(s=>s=s-1)

  
    let changeStepUp = ()=>{


console.log(newUser)
            let {
                nom, prenom, contact, email, password, password1, pseudo, solde,marchand, wn_sub, CODE,cash_point
            } =  newUser
        if(step == 1){
           
            if(nom== "" || prenom == ""){

                // alert("renseigner tout les champs!!!")
                setMessage("Veuillez renseigner tout les champs!!")
                setSuccess(false)
                setIsOpen(true)
                return 0
            }else{
        setStep(s=>s = s + 1)

            }

        }
        if(step == 2){
            
            if(email =="" || contact==""){
                setMessage("Veuillez renseigner tout les champs!!")
                setSuccess(false)
                setIsOpen(true)
               
            }else{
        setStep(s=>s = s + 1)

            }
            
        }
        if(step == 4){

           
            if(wn_sub != ""){

                axios.post("/signup/confirm",{
                    email, 
                    password,
                    nom,
                   contact,
                    wn_sub,
                    CODE,
                    marchand,
                   cash_point
                    
                  }).then(data=>{
                    setMessage(mess.response.data.message)
                    setSuccess(true)
                    setIsOpen(true)
        setStep(s=>s = s + 1)

                  }).catch(e=>{
                    console.log(e)
                    let mess = {...e}
                   
                    setMessage(mess.response.data.message != undefined ? mess.response.data.message+"!!" : "Error server!!")
                    setSuccess(false)
                    setIsOpen(true)
                
                
                })
               


            }else{

                setMessage("veuillez remplir le code")
                    setSuccess(false)
                    setIsOpen(true)
                return 0
            }
            //axios


            // if(pseudo =="" || password=="" || password1 == ""){
            //     alert("rensegner tout les champ!!")
            //     return 0
            // }else{
            //     if(password != password1){
            //         alert("veuillez verifier votre mot de passe!!")
            //         return 0
            //     }else{

            //     }
            // }
        }

        if(step == 3){

           if(pseudo =="" || password=="" || password1 == ""){
                setMessage("Veuillez renseigner tout les champs!!")
                setSuccess(false)
                setIsOpen(true)
               
                return 0
            }else{
                if(password != password1){
                    setMessage("Veuillez verifier votre mot de passe!!")
                    setSuccess(false)
                    setIsOpen(true)
                   
                    return 0
                }else{
                    // axios 
                    axios.post("/signup/sub",{email:newUser.email}).then(data=>{
                        console.log(data.data.data)
                      let  code = data.data.data
                      setNewUser({...newUser,CODE:code})
        setStep(s=>s = s + 1)

                      
                      }).catch(e=>{
                        console.log(e)
                    let mess = {...e}
                   
                    setMessage(mess.response.data.message != undefined ? mess.response.data.message+"!!" : "Error server!!")
                    setSuccess(false)
                    setIsOpen(true)
                      })
                }
            }

        }






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
            let mess = {...e}
                alert(mess.response.data.message)
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

<Message mess={message} onClose={()=>setIsOpen(false)} messOpen={isOpen} success={success}></Message>
<div className="mx-auto">

<div className={` mt-24 mx-auto   w-96 h-36 bg-white rounded-3xl  border p-5 shadow-2xl `} >
  <div className="text-2xl font-bold text-[#4371BA]">S'inscrire </div>
  <div className="bg-[#4371BA] w-32 h-2 rounded-full mt-2"></div>  
 
{step == 4 ? <p>Un code de verification a été envoyé à votre email</p> : <p>Inscrivez-vous pour pouvoir bénéficier de nos services</p>}
</div>



  <form className="mx-auto mt-16 flex items-center flex-col  align-middle  w-96 min-h-44 bg-white rounded-3xl  border p-5 pt-9 shadow-2xl relative">

{
step == 5 ?
<>
          
          <div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-5">
           <img src="./src/assets/approval_96px.png" className="w-10 h-10"  />
       </div>
       <h1 className="text-2xl font-bold mb-5">Félicitations !</h1>
       <p>Vos informatons ont été bien enregistrer</p>
            
       <NavLink className="bg-[#4371BA] text-white p-2 rounded-xl w-auto mt-5 hover:bg-blue-600" to="/">Acceder à votre compte...</NavLink>
          
          </>: ''
}

{
step == 6 ?
<>
Felicitations!! votre compte a été bien crée...
</> : ''
}

{
step == 1 ?
<>
<div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
  <img src="./src/assets/male_user_512px.png" className="w-10 h-10"  />
</div>

<h1 className="text-2xl mb-5">Informations personnelles</h1>
 


  <input type="text" placeholder="Nom" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" value={newUser.nom} name="nom" required onChange={(e)=>setNewUser({...newUser,nom:e.target.value})} />


  <input type="text" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Prénoms" name="prenom" id="prenom" required value={newUser.prenom}  onChange={(e)=>setNewUser({...newUser,prenom:e.target.value})} />
 
  <div className="flex w-full mt-4 justify-between">
 <div></div>
  <button  className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600" onClick={(e)=>{e.preventDefault(); changeStepUp()}}>Suivant <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
  </div>
  
 





</>

: ""
}


{
step==2 ?
<>
<div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
                <img src="./src/assets/email_sign_500px.png" className="w-10 h-10"  />
            </div>
            <h1 className="text-2xl mb-5">Contact</h1>
              

           
            
                <input type="text" placeholder="teléphone" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="tel" value={newUser.contact} onChange={(e)=>setNewUser({...newUser,contact:e.target.value})}  required  />
              
           
             
                <input type="email" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="adresse email" name="mail" id="mail" value={newUser.email} onChange={(e)=>setNewUser({...newUser,email:e.target.value})} required/>
                

               
                
                <div className="flex mt-4 justify-between w-full" onClick={changeStepUp} >
               <div></div>
                <div className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600 hover:cursor-pointer">Suivant <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt=""  />   </div>
                </div>
                

</> : ""

}

{
step == 3 ?
<>
<div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
  <img src="./src/assets/lock_208px.png" className="w-10 h-10"  />
</div>
<h1 className="text-2xl mb-2">Compte </h1>



  <input type="text" placeholder="Nom d'utilisateur" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="userName" value={newUser.pseudo} onChange={e=>setNewUser({...newUser,pseudo:e.target.value})}  />

  <div className="flex w-full justify-between mb-2" >
    
  <label htmlFor="typeCompte" className="text-lg font-bold text-slate-400">Type de compte</label> 
  <select name="typeCompte" id="typeCompte" value={newUser.marchand} onChange={(e)=>{setNewUser({...newUser,marchand:e.target.value == "user" ? false : true}); console.log(e.target.value)}} >
    <option value="user" selected>Utilisateur</option>
    <option value="marchand">Marchand</option>
  </select>

  </div>


  <input type="password" className="w-full mb-5 bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Mot de passe" name="pass" id="pass" value={newUser.password} onChange={e=>setNewUser({...newUser,password:e.target.value})}  />
  
  <input type="password" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Confirmer votre mot de passe" name="pass1" id="pass1" value={newUser.password1} onChange={e=>setNewUser({...newUser,password1:e.target.value})} />

 
  

 
  
  <div className="flex mt-4 justify-between w-full" onClick={changeStepUp}>
 <div></div>
  <div className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">Enregistrer <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt=""  />   </div>
  </div>
  
 


</>  : ""


}

{
step == 4 ?<>
          
<div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
      <img src="./src/assets/lock_208px.png" className="w-10 h-10"  />
  </div>
  <h1 className="text-2xl mb-5">Entrez le code de validation</h1>
    

      <input type="text" placeholder="XXXXXX" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5 text-center" name="code" value={newUser.wn_sub} onChange={e=>setNewUser({...newUser,wn_sub:e.target.value})} />
                         
      <div className="flex mt-4 justify-between" onClick={changeStepUp}>
     <div></div>
      <div className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">Confirmer </div>
      </div>
      
</> : ""


}

{/* {
step == 5 ?

: ""
} */}





</form>




</div>




        

         
    
    
    </>
}