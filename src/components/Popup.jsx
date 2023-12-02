


export const Popup = ({message="message here!!", isOpen="false", success=false, onClose})=>{




    return <div onClick={()=>onClose()} className="absolute z-20 top-0 left-0 right-0 bottom-0 bg-black opacity-80 flex justify-center items-center">

<div className={`w-56 h-44 drop-shadow-2xl rounded-xl  absolute mt-32 p-5 bg-white`}>
    <div>
    <span onClick={()=>onClose()}>X</span>
    </div>

    <div>
    <h1 className={`text-center text-lg font-bold ${success ? "text-green-500" : "text-red-500" }`}>{message}</h1>

    </div>

</div>  
    
    </div>


}

