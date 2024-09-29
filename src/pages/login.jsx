import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import  { auth, googleProvider } from '../components/firebase';
import { signInWithPopup } from "firebase/auth";


function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
          // Sign in with Google
          const result = await signInWithPopup(auth, googleProvider);
          
          const user = result.user;
          const uid=user.uid;
          localStorage.setItem('user', JSON.stringify(user));
          console.log("Google sign-in success:", user);
          
          navigate("/");
        } catch (error) {
          console.error("Google sign-in error:", error);
        }
      };

    
    
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 logreg-page">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-500" style={{fontSize: "2rem"}}>AgroShield</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                        <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white text-black"  onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="text-sm">
                            <Link href="#" className="font-semibold text-gray-900">Forgot password?</Link>
                        </div>
                        </div>
                        <div className="mt-2">
                        <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset bg-white ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black" onChange={(e)=>{
                            setPassword(e.target.value);
                        }} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outlin">Sign in</button>
                    </div>
                    </form>

                    <div className="w-full mx-auto pt-4">
                  <GoogleLoginButton type="button" onClick={handleGoogleSignIn} size="40px"  />
                  </div>
                </div>
            </div>
        </>
    );
}

export default Login;