
import { useWalletStore } from "../store"
import { NavLink } from "react-router-dom"
import { TransactionHisto } from "../components/TransactionHisto"
import { useEffect, useState } from "react"
import axios from "../services/Axios"

export const HomeConnected = ()=>{



    let user = useWalletStore(state=>state.user)
    let setSolde = useWalletStore(s=>s.setSolde)
    let [transactions, setTransaction] = useState([])

    useEffect(()=>{
        axios.get("/user/transaction?user_id="+user.user_id).then(data=>{
            
            let allTransaction = data.data.data
            console.log(allTransaction)
            setTransaction([allTransaction[0], allTransaction[1]])

            axios.get(`/user/get?user_id=${user.user_id}`).then(data=>{
            
                let {soldeActuel} = data.data.data
                setSolde(soldeActuel)
        })})
    },[])


    return <>
        <div className="flex w-full h-96 justify-around mt-5">
            <div className="h-full bg-slate-200 w-1/2 p-5">
                <div className="w-full h-1/2 flex shadow-2xl bg-white mb-5 rounded-3xl">
                    <div className=" w-1/3 flex items-center justify-center">
                        <img src="../src/assets/us_dollar_circled_96px.png" alt="" />
                    </div>
                    <div className=" w-2/3 p-5">
                            <div className="text-3xl font-bold text-blue-500">{user.nom}</div>
                            <div className="text-lg  text-blue-500">{user.email}</div>

                            <div className="bg-blue-500 w-full h-2 rounded-full my-2"></div>

                            <div className="text-3xl">Solde: {user.soldeActuel} Ar</div>
                    </div>
                </div>
                
                <div className="flex justify-between h-1/2">
                    <NavLink to="/transaction" className="w-1/2 bg-white rounded-3xl mr-5 flex flex-col items-center justify-around shadow-2x p-2l">
                        <div className="logo text-3xl">
                        <img src="../src/assets/transaction_512px.png" className="w-16 h-16"  alt="" />
  
                        </div>
                        <div className="text-xl font-bold">Transaction</div>

                    </NavLink>
                    <NavLink to="compte" className="w-1/2 bg-white rounded-3xl mr-5 flex flex-col items-center justify-around shadow-2xl p-2">
                        <div className="logo text-3xl p-5">
                        {/* <img src="../src/assets/card_wallet_96px.png"  alt="" /> */}
                        <img src="../src/assets/male_user_144px.png" className="h-16 w-16"  alt="" />
                            
                        </div>
                        <div className="text-xl font-bold">Mon compte</div>

                    </NavLink>
                </div>
            </div>

<div className="h-full w-1/3 p-5">
    
    <div className="h-full bg-white shadow-2xl rounded-3xl  ">
               <div className="p-5">
                <div className="text-3xl text-blue-500 font-bold">Historique</div>
                <div className="bg-blue-500 w-1/3 h-2 rounded-full mt-2"></div>

               </div>

               <div className="p-2">
                { 
                    transactions.map(e=>{
                        return <>
                        {
                            e!= undefined ?

                            <TransactionHisto typeUser={user.cash_point ? "cashPoint" : "user"} type={e.type_transaction} amount={e.amount} date={e.date_transaction} ></TransactionHisto> : ""
                        
                        }
                        </>
                    })

                }
               
               </div>

            </div>
</div>
        </div>
    
    
    
    
    </>




}