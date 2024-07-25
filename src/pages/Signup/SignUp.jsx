import React from 'react'
import { Form, Button, Error } from '../../Components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword, setName, setIsValidate } from '../../store/formSlice';
import { ID } from 'appwrite';
import { authServices } from '../../backend-services';
import {startAuthentication, getBlogPosts, errHandler} from '../../utils';
import { setBlogs, clearBlogs } from '../../store/blogsSlice';
import { login, logout, setFetching } from '../../store/authSlice';


export default function SignUp() {
  const [formErr, setFormErr] = React.useState("");
  const formRef = React.useRef(null)
  const {isValidated,email,name,password} = useSelector((state)=>state.formData)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = ()=>{
    const event = new Event("submit", { bubbles: true })
    formRef.current ? formRef.current.dispatchEvent(event) : null
  }

  React.useEffect(()=>{
        const initiateSignup = async()=>{
            console.log("calling auth")
            setLoading(true)
            dispatch(setIsValidate(false))
            const userID = ID.unique() 
            const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${userID}&scale=100&flip=true&baseColor=f9c9b6&seed=raghav&backgroundColor=194FE6`

            const signUpRes = await authServices.createAccount({
              id:userID,
              email:email,
              password:password,
              name:name,
              prefs:{avatarUrl:avatarUrl}
            })

            console.log(signUpRes.code)
            
            const didErrOccured = errHandler({
              res:signUpRes,
              dispatch:dispatch,
              navigate:navigate,
              setEmail:setEmail,
              setPass:setPassword,
              setFormErr:setFormErr,
              setName:setName
             })
  
             if(didErrOccured){
              console.log("An error occured") 
             }

            else if(signUpRes.$id){
              const blogPostsRes = await getBlogPosts({ //(caching)calling the getBlogPosts util to fetch the posts before redirecting user to dashboard 
               dispatch:dispatch,
               setBlogs:setBlogs,
               clearBlogs:clearBlogs
               })
               const authRes = await startAuthentication({//calling the strtauthentication util to verify the session and retreive the user details
                 dispatch:dispatch,
                 login:login,
                 logout:logout,
                 setFetching:setFetching
               })

               if(authRes.message){
                 setFormErr(authRes.message)
               }
          }


            setLoading(false)
          }

     if(isValidated){
      initiateSignup()
     }     
    
  },[isValidated])




  return (

    <Form type="signup"
      formRef={formRef}
      heading={`Let's get started  🚀`}
      subHeading='Enter your preffered credenetials to create your account'
      loading={loading}
      buttonComponent={
        <div className='w-100p text-center flex flex-col items-center'>
          <Button primary className='w-70p overflow-hidden transition-all' onClick={handleSubmit}>
            Signup
          </Button >
          <Error errMsg={formErr} className="transition-all justify-center mt-4p" />
          <NavLink to="/login" className='mt-4p w-100p cursor-pointer text-0.8vw text-gray-600 dark:text-white ' >
            Already have an account ?
            <span className="underline-offset-2 underline text-primary ml-2p">
              Login
            </span>
          </NavLink>
        </div>
  } />
  )
}
