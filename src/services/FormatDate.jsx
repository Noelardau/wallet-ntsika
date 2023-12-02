export const FormatDate = (date, time=true)=>{
    let d = new Date(date)
    let formDate = <div> 
        {date.split("T")[0].split("-").reverse().join("/")}
         { time ?  <> <br /> {`${d.getHours() > 9 ? d.getHours() : "0"+d.getHours()}:${d.getMinutes() > 9 ? d.getMinutes() : "0"+d.getMinutes()}:${d.getSeconds() > 9 ? d.getSeconds() : "0"+d.getSeconds()}`} </> : ""}
    </div>

    


    return formDate


}