import { useEffect, useState } from "react"
import axios from "../services/Axios"
import { useWalletStore } from "../store"
import { Transaction } from "./Transaction"




export const ListTransaction = ({transactions,propreList, type="user"})=>{

    let user = type == "user" || type == "cashPoint"  ? useWalletStore(state=>state.user) : useWalletStore(state=>state.admin)
    console.log("user from store",user)
    let typeList = type == "admin" ? "admin" : (user.cash_point == true ? "cashPoint" : "user")



    return <>
  
   {
       transactions.map((e,k)=>{

console.log("log into map",e)
           return <Transaction key={k} type={e.type_transaction} amount={e.amount} date={e.date_transaction} sender={e.sender.nom} receiver={e.receiver.nom} typeList={typeList}  ></Transaction>
           
           
           


       })
   }



    
    </>


    




}



