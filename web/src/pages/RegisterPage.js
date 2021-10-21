import React, {useState} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { login } from "../actions/authActions";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = firebase.auth();

const RegisterPage = ({ dispatch }) => {

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

    const registerUser = (event) => {
        event.preventDefault()
        return auth.createUserWithEmailAndPassword(userData.email, userData.password);
    }

    const [user] = useAuthState(auth);
    if (user) {
        dispatch(login(user.email, user.uid));
    }


    return (
        <div className="login-container">
            <h2>Registro de usuraios</h2>
            <form className="form-login" onSubmit={registerUser}>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Ingrese un correo electronico"
                    onChange={handleInputChange}
                    value={userData.email}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="Ingrese una contraseña"
                />
                <button type="submit" className="btn-login btn-email">Registrarse</button>
            </form>
        </div>
    )
}

export default RegisterPage