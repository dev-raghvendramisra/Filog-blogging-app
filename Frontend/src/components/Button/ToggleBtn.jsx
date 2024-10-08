import React from 'react'
import useTheme from '../../context/themeContext'

function ToggleBtn({className='',handleClick,children,...props}) {

  const {isDark , setIsDark} = useTheme()

  if(!handleClick){
    handleClick=()=>{
      setIsDark(!isDark)
    }
  }

  React.useEffect(()=>{
       
       if(isDark){
          document.querySelector("html").classList.add("dark")
          localStorage.setItem("isDark",true)
       }
       else if(!isDark){
        document.querySelector("html").classList.remove("dark")
        localStorage.setItem("isDark",false)
       }
  },[isDark])
  return (
   <div  onClick={handleClick} className={`cursor-pointer toggleBtnShadow p-0.2vw pr-1vw dark:pl-1vw dark:pr-0.2vw flex rounded-full  justify-start transition-all items-center relative bg-gray-200 dark:bg-primary_darkMode dark:justify-end ${className}`}{...props}>
       <div style={{height:"1.2vw",width:"1.2vw"}} className='flex justify-center items-center rounded-full transition-all bg-white drop-shadow-lg'>
           {children}
       </div>
   </div>
  )
}

export default ToggleBtn