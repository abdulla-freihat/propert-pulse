'use client'

import { createContext  , useContext , useState} from "react"


const GlobalContext = createContext();


//create Provider


export const GlobalProvider = ({children})=>{

    const [unreadCount, setUnreadCount] = useState(0);




return(
    <GlobalContext.Provider value={{
          unreadCount,
          setUnreadCount
    }}>

         {children}
    </GlobalContext.Provider>
)
     
}


//Create a custom hook to access context

export const useGlobalContext = ()=>{

     return useContext(GlobalContext);
}