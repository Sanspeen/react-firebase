import React from 'react'
import { useDispatch } from "react-redux";
import { googleAuthProvider } from '../App'
import { firebase } from '../App'
import { login } from '../actions/authActions'
import "firebase/firestore";
import "firebase/auth";
import swal from 'sweetalert2'
import { useForm } from '../hooks/useForm'
import { setError, removeError } from '../actions/ui'
import validator from "validator";


export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
 
        dispatch(login(user.email, user.uid));
      })
      .catch((e) => {
        console.log(e);
        swal.fire("Error", e.message, "error");
      });
  };
};

const RegisterPage = () =>  {
    
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };



    //Dispatch

    const [formValues, handleInputChange] = useForm({
      name: null,
      email: null,
      password: null,
      password2: null,
    });

    const { name, email, password, password2 } = formValues;

    const dispatch = useDispatch();
 
  const handleRegister = (e) => {
    e.preventDefault();
 
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };
 
  // Validar formulario
 
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );
      return false;
    }
 
    dispatch(removeError());
    return true;
  };


    return (
        <section>
        <div>
          <form onSubmit={handleRegister}>
            <h1>
            </h1>
            <p>Fill in the form below to create an account.</p>
            <div>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="auth__input"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
              />
 
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="auth__input"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
              />
 
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="auth__input"
                value={password}
                onChange={handleInputChange}
              />
 
              <input
                type="password"
                placeholder="Confirm password"
                name="password2"
                className="auth__input"
                value={password2}
                onChange={handleInputChange}
              />
 
              <button className="login" type="submit">
                Register
              </button>
 
              <hr />
              <p>Or</p>
              <button
                className="google"
                onClick={handleGoogleLogin}
                type="button"
              >
                Sign up with Google
              </button>
            </div>
            <hr></hr>
            <p>
            </p>
          </form>
        </div>
      </section>
    )
}
export default RegisterPage;
