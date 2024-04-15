'use client'

import { ThemeProvider } from "next-themes"


const Providers = ({children}) => {
  return (
   <ThemeProvider  defaultTheme="system" attribute="class">

     <div className=" dark:text-white dark:bg-gray-800 min-h-screen select-none transition-colors duration-300">
        {children}
     </div>
   </ThemeProvider>
  )
}

export default Providers