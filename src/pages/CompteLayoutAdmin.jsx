import { useEffect, useState } from "react"
import loginIcon from "/src/assets/male_user_480px.png"
import eyeIcon from "/src/assets/eye_see_password.png"
import axios from "../services/Axios"

import { UpdateForm } from "../components/updateForm"
import { Loader } from "../components/Loader"
import { useWalletStore } from "../store"

export const CompteLayoutAdmin = ()=>{
    let [updating, setUpdating] = useState(false)
    let user = useWalletStore(store=>store.admin)
    let setUser = useWalletStore(store=>store.setAdmin)
    let [userInfo, setUserInfo] = useState({
        nom:user.nom,
        email:user.email,
        password: user.password,
        contact: user.contact
    })

    let [submitting, setSubmitting] = useState(false)

    let saveUpdate = ()=>{
        if(userInfo.contact !="" && userInfo.nom != "" && userInfo.email != "" && userInfo.password != ""){
            axios.post(`/user/update?user_id=${user.user_id}`,userInfo).then(data=>{
                let {email, nom, user_id,contact, password} = data.data.data
                console.log(data.data.data)
                setSubmitting(true)            
                setTimeout(()=>{
                    setUser({email, nom, user_id, contact, password})
                    setSubmitting(false)
                    setUpdating(false)
                },500)
    
            }).catch(e=>{
                console.log(e)
            })
        }else{


        }
        // console.log(userInfo)
    }
// console.log(user)
    useEffect(()=>{
        axios.get("/user/get?user_id="+user.user_id).then(data=>{
            console.log(data)
        })
    },[])

    return <>

    {
        submitting ?
        <Loader></Loader> : ""
    }
            <div className="flex items-center justify-between flex-col mx-auto h-auto w-1/2 bg-white rounded-2xl shadow-sm max-lg:w-56"> 
            
                <div className="w-20 h-20 bg-white rounded-full p-4">
                    <img src={loginIcon}   />
                   
                </div> 
                <div>
        {
            !updating ? 
            <>
             <div><span className="text-blue-500">Nom</span> : {user.nom}</div>
                    <div><span className="text-blue-500">Email</span> : {user.email}</div>
                    <div><span className="text-blue-500">Contact</span> : {user.contact}</div>
                    {/* <div><span className="text-blue-500">Password</span> : {user.password}</div> */}
</>
            : 
            
            <>
            
            <div className="mb-5">
            <span className="text-blue-500">Nom</span>
                <input type="text" value={userInfo.nom} plac onChange={(e)=>{
                    setUserInfo({...userInfo,nom:e.target.value})
                }} eholder="nom" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" name="nom"   />
               
              </div>
            <div className="mb-5">
            <span className="text-blue-500">Email</span>
                <input type="text" value={userInfo.email} pl onChange={(e)=>{
                    setUserInfo({...userInfo,email:e.target.value})
                }} aceholder="Adresse email" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" name="email"   />
               
              </div>
              <div className="mb-5">
            <span className="text-blue-500">Contact</span>
                <input type="number" value={userInfo.contact}  onChange={(e)=>{
                    setUserInfo({...userInfo,contact:e.target.value})
                }} placeholder="tel" className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" name="contact"   />
               
              </div>
                <div className="relative">
                <span className="text-blue-500">Mot de passe</span>
                <input type="password" value={userInfo.password} onChange={(e)=>{
                    setUserInfo({...userInfo,password:e.target.value})
                }}  className="w-full bg-slate-200 p-3 border-b-2 border-b-blue-700 outline-none" placeholder="Mot de passe" name="pass" id="pass" /> <a href="#" className="absolute right-2 top-3 "><img src={eyeIcon} alt="" className="w-6 h-6" /></a>
               
                </div>

            
            </>
        }
                   
                </div>
                {/* <UpdateForm></UpdateForm> */}
{/*                 
                <button className="bg-[#4371BA]  text-white p-2 rounded-xl w-32 hover:bg-blue-600" type="submit">Modifier</button> */}
                <div className="w-full  flex justify-end p-5">

                {
                    updating ? <>
                      <button className="bg-red-700  text-white p-2 rounded-xl w-32 hover:bg-red-800" onClick={()=>setUpdating(false)}>Annuler</button>  <button className="bg-[#4371BA]  text-white p-2 rounded-xl w-32 hover:bg-blue-600" onClick={saveUpdate}>Enregistrer</button>
                    </> : 
                    <>
                <a href="#" className="text-blue-500 text-left " onClick={()=>setUpdating(true)}>Modifier les informations</a>
                    </>
                }
               

                </div>

            </div>
    
    
    
    </>

}