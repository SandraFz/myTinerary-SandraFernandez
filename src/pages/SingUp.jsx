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

const api = 'http://localhost:8000/api/auth/up'

const SingUp = () => {

const form = useRef({}) 

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

useEffect(()=>{
    /* console.log(userData) */
},[userData])



const handleSubmit = async () => {
    /* e.preventDefault() */
    const formData = new FormData(form.current)
    setUserData({
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        photo: formData.get('photo'),
        country: formData.get('country')
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

    if(userData.name
        && userData.lastName
        && userData.email
        &&userData.password){
            const res = axios.post(api, userData)
            .then(resposne => console.log(resposne))
            console.log(res)
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
                        <h1 className="m-2 w-100">
                            Sing Up
                        </h1>
                        <span className="m-2 w-100">
                        Already have an account? <Anchor to='/singin'>Log In</Anchor> now!
                        
                        </span>
                        <input type="text" name="name" /* value={} */ placeholder="Name" className="form-control rounded-2 m-2 p-1"/>
                        <input type="text" name="lastName" /* value={} */ placeholder="lastName" className="form-control rounded-2 m-2 p-1"/>
                        <input type="text" name="email" /* value={} */ placeholder="Email" className="form-control rounded-2 m-2 p-1"/>
                        <input type="text" name="password" /* value={} */ placeholder="Password" className="form-control rounded-2 m-2 p-1"/>
                        <input type="text" name="photo" /* value={} */ placeholder="URL photo" className="form-control rounded-2 m-2 p-1"/>
                        <select name="country" className=" rounded-2 m-2 p-1 w-100">
                            <option value="Argentina">Argentina</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Belgium">Belgium</option>
                            <option value="China">China</option>
                            <option value="Singapure">Singapure</option>
                            <option value="Republic of Korea">Republic of Korea</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Morocco">Morocco</option>
                        </select>
                        <Anchor onClick={handleSubmit} /* to='/singin' */ className="button my-2 p-2 singinButton w-100">Sing In</Anchor>
                        <p>———————— or ————————</p>
                        {/* <GoogleOAuthProvider clientId="563279997730-7ncra9if59b87itmggarheiop3ajpgm4.apps.googleusercontent.com"> */}
                            {/* <LoginButton onClick={() => login()} logo={google} platform={'google'}/> */}
                            <GoogleLogin 
                                className="button"
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