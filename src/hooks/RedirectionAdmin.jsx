import { useEffect } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { useWalletStore } from "../store"


export default function RedirectionAdmin({to="/admin/"}){

  let admin = useWalletStore(s=>s.admin)

  return <>
    {admin.user_id ? "" : <Navigate to={to}></Navigate>}
  </>


}