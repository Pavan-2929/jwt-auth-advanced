import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function GoogleAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res = await fetch('http://localhost:8000/api/auth/google', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })

            const data = await res.json();
            console.log(data);
            console.log("User created");
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log("Google Autharization failed");
        }
    }
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 u hover:opacity-90"
    >
      Continue with google
    </button>
  );
}

export default GoogleAuth
