import React, { useEffect, useRef, useState } from "react";
import Hero from "../layouts/Hero";
import './pages.css'
import { Link as Anchor } from "react-router-dom";
import facebook from '../../public/assets/images/facebook (1).png'
import google from '../../public/assets/images/google (1).png'
import paisaje3 from '../assets/paisaje3.jpg'
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import LoginButton from "../Components/loginButton/LoginButton";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MySwal } from "../../utils/SWAL";
import { useDispatch } from "react-redux";
import userActions from "../store/actions/userActions.js";


const api = 'http://localhost:8000/api/auth/up'

const SingUp = () => {

const form = useRef({}) 
const dispatch = useDispatch()

/* const name = useRef('')
const lastName = useRef('')
const email = useRef('')
const password = useRef('')
const photo = useRef('')
const country = useRef('') */

const [userData, setUserData] = useState({
    name:"",
    lastName:"",
    email:"",
    password:"",
    photo:"",
    country:""
})

const tostaditaStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

useEffect(()=>{
    /* console.log(userData) */
},[userData])



const handleSubmit = async () => {
    /* e.preventDefault() */
    const formData = new FormData(form.current)
    const name= formData.get('name')
    const lastName= formData.get('lastName')
    const email= formData.get('email')
    const password= formData.get('password')
    const photo= formData.get('photo')
    const country= formData.get('country')

    if (name && lastName && email && password && photo) {
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast('Introduce a valid email', tostaditaStyle);
        } 
    } else {
        toast('Required information is missing', tostaditaStyle);
    } 

    setUserData({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        photo: photo,
        country: country
    })
    /* setUserData(formData.get('name'))
    setUserData(formData.get('lastName'))
    setUserData(formData.get('email'))
    setUserData(formData.get('password'))
    setUserData(formData.get('photo'))
    setUserData(formData.get('country')) */
    /* console.log("handleSubmit funciona")
    const res = await axios.post(api, userData)
    console.log(res) */
    
}

const handleSubmitGoogle = async (infoUser) => {
    /* e.preventDefault() */
    setUserData({
        name: infoUser.given_name,
        lastName: infoUser.family_name,
        email: infoUser.email,
        password: import.meta.env.VITE_PASSWORD_U,
        photo:  infoUser.picture,
        country: " "
    })
}

useEffect(() => {

    try {
        if(userData.name
            && userData.lastName
            && userData.email
            && userData.password){
                const res = axios.post(api, userData)
                .then(response => {
                    console.log(response.data)
                    /* if (response.status === 201) {
                        return <Navigate to='/singin' />;
                    } else {
                        toast('Registration failed', tostaditaStyle);
                    } */

                    if(response.status === 201){
                        /* dispatch(SingUpAndLoginUser(response.data)) */
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('online', true)
                        localStorage.setItem('user', JSON.stringify(response.data))
                        console.log(localStorage)  
                        
                        window.location.reload()
                    } else {
                        toast('This email already exists', tostaditaStyle);
                        
                    }
                        
                   
                })
            }
            
    } catch (error) {
        console.log(error)
    }
    
}, [userData])


/* const login = useGoogleLogin({
    onSuccess: tokenResponse => {
        console.log(tokenResponse)
        let infoUser = jwtDecode(credentialResponse.credential)
        console.log(infoUser)
    }
}) */

    return (
        <Hero image={paisaje3}>
            <div className="wrapper p-3">
                <form ref={form}>
                
                    <div className="d-flex flex-column align-items-center w-100">
                        <h1 className="m-2 w-100 ">
                            Sing Up
                        </h1>
                        <span className="m-2 w-100 singin">
                        Already have an account? <Anchor className="singin" to='/singin'>Log In</Anchor> now!
                        
                        </span>
                        <label htmlFor="name" className="singin w-100 mt-2">
                            Name*:
                            <input type="text" name="name" /* value={} */ placeholder="Name" className="form-control rounded-2 p-1"/>
                        </label>
                        <label htmlFor="lastName" className="singin w-100 mt-2">
                            LastName*:
                            <input type="text" name="lastName" /* value={} */ placeholder="lastName" className="form-control rounded-2 p-1"/>
                        </label>
                        <label htmlFor="email" className="singin w-100 mt-2">
                            Email*:
                            <input type="text" name="email" /* value={} */ placeholder="Email" className="form-control rounded-2 p-1"/>
                        </label>
                        <label htmlFor="password" className="singin w-100 mt-2">
                            Password*:
                            <input type="text" name="password" /* value={} */ placeholder="Password" className="form-control rounded-2 p-1"/>
                        </label>
                        <label htmlFor="photo" className="singin w-100 mt-2">
                            URL photo*:
                            <input type="url" name="photo" /* value={} */ placeholder="URL photo" className="form-control rounded-2 p-1"/>
                        </label>
                        <label htmlFor="country" className="singin w-100 mt-2">
                            Country:
                            <select name="country" className=" rounded-2 p-1 w-100">
                                <option value="Select" placeholder="--Select--"></option>
                                <option value="Argentina">Argentina</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Belgium">Belgium</option>
                                <option value="China">China</option>
                                <option value="Singapure">Singapure</option>
                                <option value="Republic of Korea">Republic of Korea</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Morocco">Morocco</option>
                            </select>
                        </label>
                        <p className="singin w-100 mt-2">* indicates a required field.</p>
                        <Anchor onClick={handleSubmit} /* to='/singin' */ className="button my-2 p-2 singinButton w-100">Sing In</Anchor>
                        <p>———————— or ————————</p>
                            {/* <LoginButton>
                                 
                            </LoginButton> */}
                                      
                            <GoogleLogin 
                                    className="button w-100"
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                        let infoUser = jwtDecode(credentialResponse.credential)
                                        console.log(infoUser)
                                        handleSubmitGoogle(infoUser)
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}>
                                    <img className="google" src={google} alt="Login with Google" />
                                </GoogleLogin> 
                        {/* </GoogleOAuthProvider> */}
                            <LoginButton logo={facebook} platform={'Login with facebook'}/>
                    </div>
                </form>
            </div>
        </Hero>
    )
}

export default SingUp