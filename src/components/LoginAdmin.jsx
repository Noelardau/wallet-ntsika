import {useForm} from "react-hook-form"
import { NavLink, redirect } from "react-router-dom"


import loginIcon from "/src/assets/lock_208px.png"
import eyeIcon from "/src/assets/eye_see_password.png"






export function LoginAdmin({className,onSubmit}){

    let {register,handleSubmit,formState:{errors}} = useForm()

    let sub = (data)=>{
        onSubmit(data)
        // redirect("/signIn")
    }

    let seePass = (e)=>{
        e.preventDefault()
        let passElement = document.querySelector("#pass")

        passElement.type = passElement.type == "password" ? "text" : "password"
    }

    return <>
    <div className={className}>

           <div className={` mt-28 ${className}   w-96 h-36 bg-white rounded-3xl  border p-5 shadow-2xl `} >
             <div className="text-2xl font-bold text-[#4371BA]">Se connecter</div>
             <div className="bg-[#4371BA] w-32 h-2 rounded-full mt-2"></div>  
            <p>Connectez-vous à votre compte pour utiliser notre service</p>

           </div>
           
           
           <div className={`${className} mt-16 flex items-center flex-col  align-middle  w-96 min-h-44 bg-white rounded-3xl  border p-5 pt-9 shadow-2xl relative`}>

            <div className="w-20 h-20 bg-white rounded-full absolute -top-12 p-4">
                <img src={loginIcon} className="w-10 h-10"  />
            </div>
              <form onSubmit={handleSubmit(sub)}>
              <div className="mb-5">
                <input type="email" placeholder="Adresse email" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" name="email"  {...register("email",{required:true})} />
               {errors.email ? <span className="text-red-600">veillez renseigner votre adresse mail</span> : ""}
              </div>
                <div className="relative">
                <input type="password" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Mot de passe" name="pass" id="pass" {...register("password",{required:true})}  /> <a href="#" className="absolute right-2 top-3 " onClick={seePass}><img src={eyeIcon} alt="" className="w-6 h-6" /></a>
                {errors.pass ? <span className="text-red-600">Veuillez entrer votre mot de passe</span> : ""}

                </div>
                
                <div className="flex mt-4 justify-between">
                
                <button className="bg-[#4371BA] text-white p-2 rounded-xl w-32 hover:bg-blue-600" type="submit">Connexion</button>
                </div>
                
                <div className="flex mt-4 justify-between ">
                <div   className=" text-center">
                    <a href="#">Mot de passe oublié?</a>
                </div>  
                <div   className="text-center text-blue-600 ">
                    <a href="#">Récuperer mon compte</a>
                </div>
              
                </div>

            </form>

           

           </div>
         
    </div>
       
    
    </>

}