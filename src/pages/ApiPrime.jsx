import { useParams } from "react-router-dom"
import {useForm} from "react-hook-form"

import loginIcon from "/src/assets/lock_208px.png"
import eyeIcon from "/src/assets/eye_see_password.png"
import logoG from "/src/assets/logoG.jpg"

import { useNavigate } from "react-router-dom"



export const ApiPrime = ()=>{
    let {amount, key} = useParams()
    let redirect = useNavigate()

    console.log(amount,key)


    let {register,handleSubmit,formState:{errors}} = useForm()
    let seePass = (e)=>{
        e.preventDefault()
        let passElement = document.querySelector("#pass")

        passElement.type = passElement.type == "password" ? "text" : "password"
    }

    let sub = (data)=>{
        redirect("/")
    }

    return <>
        <div>
            
            
        </div>
        <div className={`mx-auto mt-16 flex items-center flex-col  align-middle  w-96 min-h-44 bg-white rounded-3xl  border p-5 pt-9 shadow-2xl relative`}>
        <div className="text-lg flex items-center mb-5  text-[#4371BA] shadow-3xl font-bold max-md:text-lg">
      <img src={logoG} className="h-20 w-20" alt="" />
   
    </div>
        <form onSubmit={handleSubmit(sub)}>

            
        <div className="mb-5">
                <input type="number" placeholder="Telephone" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" name="tel"  {...register("tel",{required:true})} />
               {errors.email ? <span className="text-red-600">veillez renseigner votre numéro télephone</span> : ""}
              </div>
                <div className="relative">
                <input type="password" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Mot de passe" name="pass" id="pass" {...register("password",{required:true})}  /> <a href="#" className="absolute right-2 top-3 " onClick={seePass}><img src={eyeIcon} alt="" className="w-6 h-6" /></a>
                {errors.pass ? <span className="text-red-600">Veuillez entrer votre mot de passe</span> : ""}

                </div>
                
                <div className="flex mt-4 justify-between">
             <div></div>
              
                <button className="bg-[#4371BA]  text-white p-2 rounded-xl w-32 hover:bg-blue-600" type="submit">Connexion</button>
               
                </div>
                
               
              
                

            </form>

        </div>   

        
    </>




}