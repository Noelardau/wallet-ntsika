import { useParams } from "react-router-dom"


export const TransactionUser = ()=>{
    let {idUser} = useParams()

    // maka utilisateur

    console.log(idUser)

    return <>
<h1 className="text-[#4371BA] text-3xl">Liste des transactions</h1>



<div>

    <div className="flex justify-between content-center w-full">
        <div>Somme</div>
        <div>Envoyer par</div>
        <div>pour</div>
        <div>Type</div>
    </div>



</div>




    </>
}