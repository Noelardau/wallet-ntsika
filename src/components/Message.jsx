import successLogo from "/src/assets/info_208pxsuccess.png"
import infoLogo from "/src/assets/info_208px.png"

export const Message = ({mess,success,messOpen=true,onClose})=>{
    return <>
    {
        messOpen ?
        <div className="absolute top-0 left-0 right-0  bottom-0 bg-black opacity-75 z-10" onClick={onClose}></div> : ""}
            <div className={` rounded-lg absolute  top-64 left-1/3 z-20 w-80 h-32 shadow-2xl bg-white ${messOpen ? "" : "opacity-0"}`}>
                <div className=" text-3xl text-red-600 text-right pr-2 hover:cursor-pointer " onClick={onClose}>x</div>
                <div className={`text-center text-lg font-bold my-3 justify-around flex items-center  ${success ? "text-green-500" : "text-red-700"}`}>
                       { success ?  <img src={successLogo} className="w-10 h-10" alt="" /> :
                       <img src={infoLogo} className="w-10 h-10" alt="" />
                       }
                       
                       <p>{mess}</p>
                       </div>

            </div>
    </>
}