import { create } from "zustand";
import {devtools, persist} from "zustand/middleware"

/*
on retiens le pseudo et l'email et l'id 

*/

let wallet_store = (set)=>({

    user:{cashPoint:true},
    setUser:(userCo)=>{
    
        set(state=>({user:userCo}))
    
    },
    setSolde:(newSolde)=>{
        set(state=>({user:{...state.user,soldeActuel:newSolde}}))
    },
    admin:{},
    setAdmin:(userCo)=>{
    
        set(state=>({admin:userCo}))
    
    }
})
export const useWalletStore = create(
    devtools(
        persist(wallet_store,{
            name:"wallet_store"
        })
    )
) 