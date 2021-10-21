/* import React from "react";
import { firebase } from "../App";
import { login } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { startLoading, finishLoading } from "../actions/ui";
import swal from "sweetalert2";
import { googleAuthProvider } from "../App";
import "firebase/firestore";
import "firebase/auth";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));

        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        swal.fire("Error", e.message, "error");
      });
  };
};

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

const LoginPage = () => {
  const dispatch = useDispatch();
  
  const [formValues, handleInputChange] = useForm({
    email: null,
    password: null,
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <section>
        <div>
          <form autoComplete="off" onSubmit={handleLogin}>
            <p>Fill in the form below to login to your account.</p>
            <div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />

              <button type="submit" className="login">
                Login
              </button>
            </div>
            <hr />
            <p>Or</p>
            <button
              className="google"
              onClick={handleGoogleLogin}
              type="button"
            >
              Sign up with Google
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
 */