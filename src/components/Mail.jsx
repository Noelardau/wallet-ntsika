

export const Mail = ({user,code})=>{

    return <>
        {/* <div className="mx-auto flex flex-col justify-center content-center items-center w-auto h-28">
        <h1 className="text-[#4371BA]">Code de confirmation pour l'utilisateur nomUser:</h1>
        <div className=" border-[#4371BA]  text-lg h-auto w-28 border flex justify-center mt-5 font-bold">004568</div>
    
        </div>  */}
         <div style={{"display": "flex","flex-direction": "column","align-items": "center"}}>
            <h1 style={{color:"#4371BA"}} >Code de confirmation pour l'utilisateur {user}:</h1>
            <div style={{"border": "solid #4371BA 1px", "padding": "25px","font-size": "28px"}}>{code}</div>    
        </div>
        
        {/* <div>
        <h1 className="text-[#4371BA]">Code de confirmation pour l'utilisateur nomUser:</h1>
        <div className=" border-[#4371BA]  text-lg h-auto w-28 border flex justify-center mt-5 font-bold">004568</div>
    
        </div> */}
    </>


}