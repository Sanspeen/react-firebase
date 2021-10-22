import React,{useState} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { login } from "../actions/authActions";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

firebase.initializeApp({
    apiKey: "AIzaSyBxlb6vmmmu8ysYdKzploj77tp00hwgviA",
    authDomain: "question-and-answer-f6a1b.firebaseapp.com",
    projectId: "question-and-answer-f6a1b",
    storageBucket: "question-and-answer-f6a1b.appspot.com",
    messagingSenderId: "525335137725",
    appId: "1:525335137725:web:fbe884cd9f65f96fb516d4"
});

const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};



const auth = firebase.auth();

const Login = ({ dispatch }) => {

    const [userData, setuserData] = useState({
        email:'',
        password:''
    })

    const handleInputChange = (event) => {
        setuserData({
            ...userData,
            [event.target.name] : event.target.value
        })
    }

    const loginUser = (event) => {
        event.preventDefault()
        return auth.signInWithEmailAndPassword(userData.email, userData.password)
            .then(()=>{
                Swal.fire('Bienvenido....')
            })
            .catch(()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña invalida'
                })
            })
    }


    const [user] = useAuthState(auth);
    if (user) {
        dispatch(login(user.email, user.uid));
    }

    return (
        <div className="login-container">
            <h2>LOG IN</h2>
            <form className="form-login" onSubmit={loginUser}>
                <input
                    type="text"
                    className = "Email-input"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={userData.email}
                />
                <input
                    type="password"
                    className = "Password-input"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={userData.password}
                />
                <div className = "login-buttons">
                    <button type="submit" className="btn-login btn-email">Let's go!</button>
                    <button
                        type="button"
                        className="btn-login btn-google"
                        onClick={signInWithGoogle}
                    >Log in with google<i className="fab fa-google"></i></button>
                </div>
                
            </form>
            <p>Do you need a new account?   <Link to="/Register">SING IN</Link></p>
        </div>
    )
}

export default Login
 