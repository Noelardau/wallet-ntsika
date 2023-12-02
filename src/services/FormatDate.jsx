export const FormatDate = (date, time=true)=>{

    let formDate = <div> 
        {date.split("T")[0].split("-").reverse().join("/")}
         { time ?  <> <br /> {date.split("T")[1].split(".")[0]} </> : ""}
    </div>

    


    return formDate


}