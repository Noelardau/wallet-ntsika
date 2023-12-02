import {useForm} from "react-hook-form"
import doneLogo from "/src/assets/done_360px.png" 
import eyeLogo from "/src/assets/eye_see_password.png"









export const TransfertForm = ({onIntent,text="Transfert d'argent"})=>{
    
    
    
    let effectuerRetrait = (data)=>{
        // console.log("effectuer le ",data)
        onIntent(data)
        
        setTimeout(()=>{
            
            document.querySelectorAll("input").forEach(e=>e.value = "")
        },
        3000
        )
    
        // axios 
    }

    let seePass = (e)=>{
        e.preventDefault()
        let passElement = document.querySelector("#pass")

        passElement.type = passElement.type == "password" ? "text" : "password"
    }
    
    
    let {register,handleSubmit,formState:{errors}} = useForm()

    return <form onSubmit={handleSubmit(effectuerRetrait)} className="w-1/2 max-sm:w-56 max-lg:w-80 mx-auto flex flex-col justify-center bg-white p-5 rounded-3xl shadow-sm relative">
    
                  
    <div className="text-center text-2xl text-[#4371BA] font-bold py-2">{text}</div>
                  
              
                    <input type="number"  placeholder="teléphone" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" name="tel" id="tel" {...register("tel")} required />
                  
               
                               
                    <input type="number" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" placeholder="Montant" name="somme" id="somme" {...register("somme")} required />
                    
                    <div className="relative">
                                         
                    <input type="password" className="w-full  bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none mb-5" placeholder="Votre mot de passe" name="pass" id="pass" {...register("pass")} required />
     <a href="#" className="absolute right-2 top-4 " onClick={seePass}><img src={eyeLogo} alt="" className="w-6 h-6" /></a>
              
                </div>
                   
                    
                    <div className="flex mt-4 justify-between w-full">
                   <div>
                  
                   </div>
                    <button href="#" className="bg-[#4371BA] align- text-white p-2 rounded-xl w-auto hover:bg-blue-600">{text!= "Transfert d'argent" ? "Effectuer le dépôt" : "Transferer"} <img src={doneLogo} className="w-5 h-5 inline" alt="" />   </button>
                    </div>
                    
                   
    
                
    
    
    </form>
     
}