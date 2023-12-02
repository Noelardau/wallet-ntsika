


export const Modal = ({isOpen,onCancel,onDeconnect})=>{


    return <>


        <div className={`w-56 h-44 drop-shadow-2xl z-50 rounded-xl  absolute mt-32 p-5 bg-white ${!isOpen ? '-left-80 opacity-0': 'mx-auto'}`}>
                <h1 className="text-center font-bold text-blue-500 text-lg">Se déconnecter ?</h1>
                <div className="w-full flex justify-between mt-8">
                    <button className="bg-red-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-red-700" onClick={onDeconnect}>oui</button>
                    <button className="bg-blue-600 w-20 shadow-sm text-white p-1 rounded-lg hover:bg-blue-700" onClick={()=>onCancel()}>Non</button>
                </div>
        </div>
    
    </>
}