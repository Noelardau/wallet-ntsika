import { data } from "autoprefixer"
import { useState, useMemo, useEffect } from "react"
import {useForm} from "react-hook-form"
import { NavLink, redirect, useNavigate } from "react-router-dom"
import axios from "../services/Axios"







export function UserSignIn({className,onSubmit}){

  
    let {register,handleSubmit,formState:{errors}} = useForm()
    let [userInfo, setUserInfo ]= useState({}) 
    let [step, setStep] = useState(1)
    // let [code, setCode] = useState("dkjf")

    var code = ""
    
  

    console.log(userInfo)
    console.log(errors)

    let changePage = ()=>{ 
 
      console.log("bleme'pro!!!")
    
    }
    
    let next = (data)=>{
        console.log(step)
        if(step == 3){
          alert("confirm step 3")
          console.log("envoi de mail!!! à " + userInfo.mail)
          axios.post("/signup/sub",{email:userInfo.email}).then(data=>{
            console.log(data.data.data)
            code = data.data.data
            setTimeout(()=>{
              setStep(step=>step = step + 1) 
            
          },1000)  
          }).catch(e=>{
            console.log(e)
          })

        }
        
        if(step == 4){
            //confirm Mail
            // alert("confirm mail",code)
// console.log("confirm mail ito",{
//   email:userInfo.email,
//   "password":userInfo.password,
//   "nom": userInfo.nom,
//   "contact":userInfo.contact,
//   "wn_sub":userInfo.wn_sub,
//   "marchand":userInfo.typeCompte == "marchand",
//   "cash_point":false
  
// })

let finalData = {
  email:userInfo.email,
  "password":userInfo.password,
  "nom": userInfo.nom,
  "contact":userInfo.contact,
  "wn_sub":userInfo.wn_sub,
  "CODE": code,
  "marchand":userInfo.typeCompte == "marchand",
  "cash_point":false
  
};
console.log("final",finalData)
alert("wn'sub", finalData.wn_sub)
alert("code", finalData.CODE)

            axios.post("/signup/confirm",{
              email:userInfo.email,
              "password":userInfo.password,
              "nom": userInfo.nom,
              "contact":userInfo.contact,
              "wn_sub":userInfo.wn_sub,
              // "CODE": code,
              "marchand":userInfo.typeCompte == "marchand",
              "cash_point":false
              
            }).then(data=>{
              console.log(data)
              setTimeout(()=>{
                setStep(step=>step = step + 1) 
              
            },1000)  
            }).catch(e=>{
              console.log(e)
              let mess = {...e}
              alert(mess.response.data.message)
            })

        }
        if(step!=4 && step!=3){
          
          setTimeout(()=>{
              setStep(step=>step = step + 1) 
            
          },1000)     
        }

            
    
    }
    
    let sub = (data)=>{
        console.log(errors)
        if(step == 3){

          if(data.password != data.pass1){
            alert("erreu")
            return 0
        }

        }

        let newInfo = {
            
          ...data, cash_point: false,
        }


        
        console.log("nouvelle info",newInfo)
        if(step == 4){
          // alert(data.wn_sub)
        console.log("nouvelle info 4",newInfo)
        
        }
        setUserInfo(newInfo)
        document.querySelectorAll("input").forEach(e=>e.value="")

        next(newInfo)


    }

    let subTest = (data)=>{
      console.log("subTest ito")
    }

    let seePass = (e)=>{
        e.preventDefault()
        let passElement = document.querySelector("#pass")

        passElement.type = passElement.type == "password" ? "text" : "password"
    }


    
    let rendu = useMemo(()=>{
        if(step == 1){
            return <>
              <div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4" onClick={changePage}>
                <img src="./src/assets/male_user_512px.png" className="w-10 h-10"  />
            </div>
            
            <h1 className="text-2xl mb-5">Informations personnelles</h1>
               

              <form onSubmit={handleSubmit(sub)}>
            
                <input type="text" placeholder="Nom" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="nom" required  {...register("nom",{required:true})} />
              
             {errors.nom ? <span className="text-red-400">Veuillez mettre votre nom</span> : ""}

                <input type="text" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Prénoms" name="prenom" id="prenom" required {...register("prenom",{required:true})} />
                
             {errors.prenom ? <span className="text-red-400">Veuillez mettre votre prénom</span> : ""}
                

               
                
                <div className="flex mt-4 justify-between">
               <div></div>
                <button  className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">Suivant <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
                </div>
                
               

            </form>

            
            
            </>
            
        
        
        }






        if(step==2){
            return <>
              <div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
                <img src="./src/assets/email_sign_500px.png" className="w-10 h-10"  />
            </div>
            <h1 className="text-2xl mb-5">Contact</h1>
              

              <form onSubmit={handleSubmit(sub)}>
            
                <input type="text" placeholder="teléphone" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="tel" {...register("contact")} required  />
              
           
             
                <input type="email" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="adresse email" name="mail" id="mail" {...register("email")} required/>
                

               
                
                <div className="flex mt-4 justify-between">
               <div></div>
                <button href="#" className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">Suivant <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
                </div>
                
               

            </form>

            
            </>
        }


        if(step==3){
            return <>
              <div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
                <img src="./src/assets/lock_208px.png" className="w-10 h-10"  />
            </div>
            <h1 className="text-2xl mb-2">Compte </h1>
              

              <form onSubmit={handleSubmit(sub)}>
            
                <input type="text" placeholder="Nom d'utilisateur" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="userName"  {...register("user")} />

                <div className="flex w-full justify-between mb-2" >
                  
                <label htmlFor="typeCompte" className="text-lg font-bold text-slate-400">Type de compte</label> 
                <select name="typeCompte" id="typeCompte" {...register("typeCompte")}>
                  <option value="user">Utilisateur</option>
                  <option value="marchand" selected>Marchand</option>
                </select>
              
                </div>
           
             
                <input type="password" className="w-full mb-5 bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Mot de passe" name="pass" id="pass" {...register("password")} />
                
                <input type="password" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Confirmer votre mot de passe" name="pass1" id="pass1" {...register("pass1")}/>

               
                

               
                
                <div className="flex mt-4 justify-between">
               <div></div>
                <button className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">Enregistrer <img src="./src/assets/chevron_right_96px.png" className="w-5 h-5 inline" alt="" />   </button>
                </div>
                
               

            </form>

            
            </>
        }

        if(step == 4){
          return <>
          
          <div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
                <img src="./src/assets/lock_208px.png" className="w-10 h-10"  />
            </div>
            <h1 className="text-2xl mb-5">Entrez le code de validation</h1>
              

              <form onSubmit={handleSubmit(sub)}>
            
                <input type="text" placeholder="XXXXXX" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5 text-center" name="code" {...register("wn_sub",{required:true})} />
                                   
                <div className="flex mt-4 justify-between">
               <div></div>
                <button className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">Confirmer </button>
                </div>
                </form>
          </> 



        } 
        
         if(step == 5){
          return <>
          
          <div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-5">
           <img src="./src/assets/approval_96px.png" className="w-10 h-10"  />
       </div>
       <h1 className="text-2xl font-bold mb-5">Félicitations !</h1>
       <p>Vos informatons ont été bien enregistrer</p>
            
       <NavLink className="bg-[#4371BA] text-white p-2 rounded-xl w-auto mt-5 hover:bg-blue-600" to="/">Acceder à votre compte...</NavLink>
          
          </> 



        }
    
    },[step])

    return <>
    <div className={className}>

           <div className={` mt-24 ${className}   w-96 h-36 bg-white rounded-3xl  border p-5 shadow-2xl `} >
             <div className="text-2xl font-bold text-[#4371BA]">S'inscrire </div>
             <div className="bg-[#4371BA] w-32 h-2 rounded-full mt-2"></div>  
            
{step == 4 ? <p>Un code de verification a été envoyé à votre email</p> : <p>Inscrivez-vous pour pouvoir bénéficier de nos services</p>}
           </div>
           
           
           <div className={`${className} mt-16 flex items-center flex-col  align-middle  w-96 min-h-44 bg-white rounded-3xl  border p-5 pt-9 shadow-2xl relative`}>

          

           {rendu}

           </div>
         
    </div>
       
    
    </>

}