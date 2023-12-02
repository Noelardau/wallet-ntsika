import loaderIcon from "/src/assets/loader_480px.png"


export const Loader = ()=>{

        return <div className="absolute z-20 top-0 left-0 right-0 bottom-0 bg-black opacity-70 flex justify-center items-center">
            <div className="text-3xl z-30 text-white animate-spin">
                <img src={loaderIcon} className="h-8 w-8" />
            </div>
            
        
        </div>


}

