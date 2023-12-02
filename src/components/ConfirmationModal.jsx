
import { useState } from "react"



export const ConfirmationModal = ({message,isOpen,onCancel,onConfirm,active})=>{

    let [cause, setCause] = useState("")

    let onConfirms = ()=>{
        // alert("ok")
        if(active != undefined){
            
            onConfirm(cause)
        }else{
            onConfirm()
        }
    }

    return <>

    {
        isOpen ?
         
<div className="h-auto absolute z-20 top-0 left-0 right-0 bottom-0 bg-black opacity-90 flex justify-center items-center">
    <div className={`w-56 h-auto drop-shadow-2xl z-30 rounded-xl  p-5 bg-white opacity-100`}>
                {active!= undefined ?
            <>
                {
                    active ?
                   <>
                    <h1 className="text-center text-blue-500 text-lg">
                        Voulez-vous suspendre ce compte?
                    </h1>  
                    <form className="border-b-2 border-blue-600">
                        <textarea type="text" placeholder="Cause..." className="outline-none" value={cause} onChange={(e)=>setCause(e.target.value)}>
                            </textarea>
                    
                    </form> 
                   </>
: 
    <h1 className="text-center text-blue-500 text-lg">
         Voulez-vous réactiver ce compte?
   </h1>

}

</>
                    : 
                <h1 className="text-center text-blue-500 text-lg">{message} ?</h1>  
        }
                
                <div className="w-full flex justify-between mt-8">
                    <button className="bg-green-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-blue-700" onClick={()=>onConfirms()}>Oui</button>
                    <button className="bg-red-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-red-700" onClick={()=>onCancel()}>Non</button>
                </div>
        </div>
            
        
        </div>
        :
         ""
    }

        {/* <div className={`w-56 h-44 drop-shadow-2xl rounded-xl  absolute mx-72 mt-32 p-5 bg-white `}>
                <h1 className="text-center text-blue-500 text-lg">{message}</h1>
                <div className="w-full flex justify-between mt-8">
                    <button className="bg-red-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-red-700" onClick={onConfirm}>yes</button>
                    <button className="bg-blue-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-blue-700" onClick={()=>onCancel()}>No</button>
                </div>
        </div>
     */}
    </>
}