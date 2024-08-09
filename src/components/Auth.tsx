import { useState } from "react";
import { auth, googleProvider } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="Email..."
          autoComplete="none"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </form>

      <button onClick={signIn} type="button">
        Sign in
      </button>

      <button type="button" onClick={signInWithGoogle}>
        Sign in With Google
      </button>

      <button type="button" onClick={logOut}>
        Log out
      </button>
    </div>
  );
};

export default Auth;
