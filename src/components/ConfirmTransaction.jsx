
// import { useState } from "react"



export const ConfirmTransaction = ({message,isOpen=true,onCancel,onConfirm})=>{

  

    let Confirm = ()=>{
        alert("ok")
    //    onConfirm()
    }

    return <>

    {
        isOpen ?
         <div className="absolute w-full bg-red-700 opacity-90 top-0 bottom-0 left-0 right-0 flex justify-center items-center">

            <div className="w-56 bg-red-50 h-44 z-50">
                <div className="text-xl">{message}?</div>

               
               <button className="bg-red-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-red-700" onClick={()=>alert("ok!!!")}>oui</button>

            </div>
            
         </div>
// {/* <div className="h-auto absolute z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-90 flex justify-center items-center">
//     <div className={`w-56 h-44 drop-shadow-2xl z-30 rounded-xl  p-5 bg-white opacity-100`}>
                
//                 <h1 className="text-center text-blue-500 text-lg">{message} new</h1>  
                
//                 <div className="w-full flex justify-between mt-8">
//                     <button onClick={Confirm}>test</button>
//                     <button className="bg-red-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-red-700" onClick={Confirm}>oui</button>
//                     <button className="bg-blue-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-blue-700" onClick={()=>onCancel()}>No</button>
//                 </div>
//         </div>
//              */}
        
//         </div> 

: ''}
        

      
    </>
}