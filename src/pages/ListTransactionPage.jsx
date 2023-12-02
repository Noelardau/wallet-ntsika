import { useEffect, useState } from "react"
import { ListTransaction } from "../components/ListTransaction"
import axios from "../services/Axios"
import { useWalletStore } from "../store"
import { all } from "axios"
import { useParams } from "react-router-dom"



export const ListTransactionPage = (typeUser="user")=>{
        let {user_id} = useParams()
    let [transactions, setTransaction] = useState([])
    let idUser =typeUser == "user" || "cashPoint" ? user_id!= undefined ? user_id : useWalletStore(state=>state.user).user_id : user_id!= undefined ? user_id : useWalletStore(state=>state.admin).user_id
    // console.log(id)

    useEffect(()=>{
        axios.get("/user/transaction?user_id="+idUser).then(data=>{
           
            let allTransaction = data.data.data
            console.log(allTransaction)
            setTransaction(allTransaction)
        })
    },[])

    return <>
     <div className="text-[#4371BA] font-bold text-3xl mb-10">Liste des transactions</div>
 
    
    <ListTransaction type={user_id == undefined ? "user" : "admin"} transactions={transactions}></ListTransaction>
    
    
    </>
}