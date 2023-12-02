import { FormatDate } from "../services/FormatDate"
import {NavLink} from "react-router-dom"
import { RelativeDate } from "../services/RelativeDate"


import retraitLogo from "/src/assets/down_208px.png"
import depotLogo from "/src/assets/up_208px.png"
import transfertLogo from "/src/assets/left_208px.png"
import eyeIcon from "/src/assets/eye_see_password.png"


export const TransactionHisto = ({type="Dépôt", amount=2000, date="20/11/2024",typeUser="user"})=>{
    return <div className="flex mb-1 justify-between w-full h-24 rounded-lg bg-white shadow-2xl p-2 border-b-2 border-blue-500 ">

        <div>
            <div className="text-sm"> {RelativeDate(new Date(date))}</div>
            <div>{type}</div>
         {
            typeUser == "user" ?
            <div>
                 {type == "Retrait" ? <>Solde - {amount} Ar</> : "" } 
                 {type == "Dépôt" ? <>Solde + {amount} Ar</> : "" } 
                 {type == "Transfert P2P" ? <>Montant: {amount} Ar</> : "" } 
                </div> : ""
         }
         {

            typeUser == "cashPoint" ?
            <div>
            {type == "Retrait" ? <>Solde + {amount} Ar</> : "" } 
            {type == "Dépôt" ? <>Solde - {amount} Ar</> : "" } 
            {type == "Transfert P2P" ? <>Montant: {amount} Ar</> : "" } 
           </div>
            : ""
         }

         {
            typeUser == "admin" ?
            <div>
            {type == "Retrait" ? <>Solde + {amount} Ar</> : "" } 
            {type == "Dépôt" ? <>Solde - {amount} Ar</> : "" } 
            {type == "Transfert P2P" ? <>Montant: {amount} Ar</> : "" } 
           </div>
            : ""
         }

        </div>
        <div className="flex flex-col justify-between  h-full items-end">
            <div>
               <NavLink to="transaction">
               <img src={eyeIcon} className="w-5 h-5" alt=""/>
               </NavLink>
            </div>
            <div>

            {
            typeUser == "user" ?
            <div>
                 {type == "Retrait" ? <>
                 
                 <img src={retraitLogo} className="w-5 h-5 bg-white" alt="down" />
            
                 </> : "" } 
                 {type == "Dépôt" ? <> <img src={depotLogo} className="w-5 h-5 bg-white" alt="down" /></> : "" } 
                 {type == "Transfert P2P" ? <>
                 <img src={transfertLogo} className="w-5 h-5 bg-white" alt="down" />
                 </> : "" } 
                </div> : ""
         } 
         {
            typeUser == "cashPoint" || typeUser == "admin" ?
            <div>
                 {type == "Retrait" ? <>
                 
                 <img src={depotLogo} className="w-5 h-5 bg-white" alt="down" />
            
                 </> : "" } 
                 {type == "Dépôt" ? <> 
                 <img src={retraitLogo} className="w-5 h-5 bg-white" alt="down" />
                 </> : "" } 
                 {type == "Transfert P2P" ? <>
                 <img src={transfertLogo} className="w-5 h-5 bg-white" alt="down" />

                 </> : "" } 
                </div> : ""
         }


            
           

            {/* {type == "Retrait" ? 
            <img src="../src/assets/down_208px.png" className="w-5 h-5 bg-white" alt="down" />
            : 
            <img src="../src/assets/up_208px.png" className="w-5 h-5 bg-white" alt="down" />
            } */}

            </div>
        </div>



    </div>
}