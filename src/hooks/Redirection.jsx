import { useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { useWalletStore } from "../store"


export default function Redirection({to="/"}){

  let user = useWalletStore(s=>s.user)

  return <>
    {user.user_id ? "" : <Navigate to={to}></Navigate>}
  </>


}