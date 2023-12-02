import { useEffect } from "react"
import eyeIcon from "/src/assets/eye_see_password.png"
import axios from "../services/Axios"


export const ApiPage = ()=>{

    useEffect(()=>{

    },[])
    
    const seePass = ()=>console.log()

    return <>
        <div className="relative">
                <input type="password" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Mot de passe" name="pass" id="pass"  /> <a href="#" className="absolute right-2 top-3 " onClick={seePass}><img src={eyeIcon} alt="" className="w-6 h-6" /></a>
               

                </div>
    
    
    
    </>
}