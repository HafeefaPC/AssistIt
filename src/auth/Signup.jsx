import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

const SignUp = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        onSignUp(user.uid); 
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="sign-in-container">
      <form
        onSubmit={signUp}
        className="w-full max-w-md mx-auto flex flex-col justify-center gap-8 py-[5%]"
      >
        <h1 className="text-center text-[#00df9a] text-2xl">Create Account</h1>
        <input
          type="email"
          className="p-2 rounded-md"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="p-2 rounded-md"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button
          type="submit"
          className="bg-[#00df9a] rounded-md p-2 text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
