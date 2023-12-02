import { FormatDate } from "../services/FormatDate"
import retraitLogo from "/src/assets/down_208px.png"
import depotLogo from "/src/assets/up_208px.png"
import transfertLogo from "/src/assets/left_208px.png"
// import Logo from "/src/assets/down_208px.png"

export const Transaction = ({type="Retrait",typeList="user", amount="2000", date="21/12/2021", receiver="12", sender='45'})=>{



console.log(typeList)

return <div className="relative z-0 w-full h-auto flex h-28 bg-white drop-shadow-xl my-4 rounded-lg">
           <div className="w-1/6  flex justify-center items-center">
            {
                typeList == "cashPoint" ?
                <>
                 {type == "Retrait" ? <img src={depotLogo} className="w-14 h-14" alt="" /> : ''}
                 {type == "Dépôt" ? <img src={retraitLogo} className="w-14 h-14" alt="" /> : ''}
                 {type == "Transfert P2P" ? <img src={transfertLogo} className="w-14 h-14" alt="" /> : ''} 
              
                {/* {type == "Transfer" ? <img src="../src/assets/left_208px.png" className="w-14 h-14" alt="" /> : ''} */}
                </>
                :

                <>
                 {type == "Retrait" ? <img src={retraitLogo} className="w-14 h-14" alt="" /> : ''}
               {type == "Dépôt" ? <img src={depotLogo} className="w-14 h-14" alt="" /> : ''} 
              
               {type == "Transfert P2P" ? <img src={transfertLogo} className="w-14 h-14" alt="" /> : ''} 
                
                </>
            }
             
           </div>      

           <div className="w-3/6  p-3">
                    <div className="text-xl font-bold">{type}</div>
                    <div>
                    {
                    typeList == "user" ? 
                    <>
                      {
                            type == "Retrait"?
                            <>
                                cashPoint : {receiver}
                            </> : ""
                        } 

                        {
                            type == "Transfert P2P" ?
                            <>
                            de : {sender} / pour : {receiver}
                        </> : ""
                        
                        }
                        
                        {
                            type == "Dépôt"?
                            <>
                                cashPoint : {sender}
                            </> : ""
                        }
                    </> :
                    ""
                  }
                  
                  {
                    typeList == "cashPoint" ? 
                    <>
                      {
                            type == "Retrait"?
                            <>
                                De la part de : {sender}
                            </> : ""
                        } 
                        
                        {
                            type == "Dépôt"?
                            <>
                                De la part de : {receiver}
                            </> : ""
                        }

{
                            type == "Transfert P2P" ?
                            <>
                            de : {sender} / pour : {receiver}
                        </> : ""
                        
                        }
                    </> :
                    ""
                  }
                  
                   {
                    typeList == "admin" ? 
                    <>
                      {
                            type == "Retrait"?
                            <>
                               de {sender} / au près de : {receiver}
                            </> : ""
                        } 
                        
                        {
                            type == "Dépôt"?
                            <>
                                cash point : {sender} / de : {receiver}
                            </> : ""
                        }

{
                            type == "Transfert P2P" ?
                            <>
                            de : {sender} / pour : {receiver}
                        </> : ""
                        
                        }
                    </> :
                    ""
                  }
                    </div>
                    <div>Montant: {amount} Ar</div>
           </div>
           <div className="w-2/6  relative">
            <div className="absolute bottom-1 right-2">{FormatDate(date,true)}</div>
           </div>
           
               </div>


}