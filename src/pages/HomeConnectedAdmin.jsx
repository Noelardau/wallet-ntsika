
import { useWalletStore } from "../store"
import { NavLink } from "react-router-dom"
import { TransactionHisto } from "../components/TransactionHisto"
import { useEffect, useState } from "react"
import axios from "../services/Axios"

import dollar from "/src/assets/us_dollar_circled_96px.png"
import transactionLogo from "/src/assets/transaction_512px.png"
import maleUser from "/src/assets/male_user_144px.png"


export const HomeConnectedAdmin = ()=>{



    let user = useWalletStore(state=>state.admin)
    let [transactions, setTransaction] = useState([])
    let [solde, setSolde] = useState()

    useEffect(()=>{
        axios.get("/user/transaction?user_id="+user.user_id).then(data=>{
            
            let allTransaction = data.data.data
            console.log(allTransaction)
            setTransaction([allTransaction[0], allTransaction[1]])

            axios.get(`/user/get?user_id=${user.user_id}`).then(data=>{
            
                let {soldeActuel} = data.data.data
                // console.log(soldeActuel)
                setSolde(soldeActuel)
        })})
    },[])


    return <>
    <div className="flex w-full max-lg:w-auto sm:w-{400} sm:p-2 h-96 justify-around mt-5">
        <div className="h-full  w-1/2 p-5">
            <div className="w-full h-1/2 max-lg:w-48 flex shadow-2xl bg-white mb-5 rounded-3xl max-lg:justify-center 
            ">
                <div className=" w-1/3 flex items-center justify-center max-lg:hidden max-sm:hidden">
                    <img src={dollar} alt="" />
                </div>
                <div className=" auto max-lg:w-auto p-5 max-lg:p-6">
                        <div className="text-3xl max-lg:text-lg font-bold text-blue-500">{user.nom}</div>
                        <div className="text-lg max-lg:text-sm  text-blue-500">{user.email}</div>

                        <div className="bg-blue-500 max-lg:text-sm  w-full h-2 rounded-full my-2"></div>

                        <div className="text-3xl max-xl:text-sm   ">Solde: {solde} Ar</div>
                </div>
            </div>
            
            <div className="flex justify-between h-1/2">
                <NavLink to="transaction" className="w-1/2 max-lg:w-auto sm:full max-sm:w-auto bg-white rounded-3xl mr-5 flex flex-col items-center justify-around shadow-2xl p-2">
                    <div className="logo text-3xl ">
                    <img src={transactionLogo} className="w-16 h-16"  alt="" />

                    </div>
                    <div className="text-xl font-bold max-lg:text-lg">Transaction</div>

                </NavLink>
                <NavLink to="compte" className="w-1/2 max-lg:w-56 bg-white rounded-3xl mr-5 flex flex-col items-center justify-around shadow-2xl p-2">
                    <div className="logo text-3xl p-5">
                    {/* <img src="../src/assets/card_wallet_96px.png"  alt="" /> */}
                    <img src={maleUser} className="h-16 w-16"  alt="" />
                        
                    </div>
                    <div className="text-xl font-bold max-lg:text-lg">Mon compte</div>

                </NavLink>
            </div>
        </div>

<div className="h-full w-1/3 max-lg:w-auto p-5 ">

<div className="h-full bg-white shadow-2xl rounded-3xl max-md:hidden  ">
           <div className="p-5">
            <div className="text-3xl text-blue-500 font-bold max-xl:w-44 ">Historique</div>
               <div className="bg-blue-500 w-1/3 h-2 rounded-full mt-2"></div>

               </div>

               <div className="p-2">
                {
                    transactions.map(e=>{
                        return   <>
                        {
                            e!= undefined ?

                            <TransactionHisto typeUser="admin" type={e.type_transaction} amount={e.amount} date={e.date_transaction} ></TransactionHisto> : ""
                        
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