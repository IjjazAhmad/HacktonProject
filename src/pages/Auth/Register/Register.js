import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, fireStore } from '../../../config/firebase';
import { useAuthContext } from '../../Contaxt/AuthContaxt';

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", terms:"" }

export default function Register() {
  const [state, setState] = useState(initialState)
  const { dispatch } = useAuthContext()
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSignup = (e) => {
    e.preventDefault()
    const { email, password, firstName, lastName , terms,confirmPassword } = state
    if(firstName.length< 3){
      return window.notify("Plz Enter firstName", "error")
    }
    if(lastName.length< 3){
      return window.notify("Plz Enter lastName", "error")
    }
   
    if(!email){
      return window.notify("Plz Enter Email", "error")
    }
    if(password.length<6){
      return window.notify("Password contain 6 character", "error")
    }
    if(password != confirmPassword ){
      return window.notify("Password dose not match", "error")
    }
    if(!terms){
      return window.notify("accept terms & policy", "error")
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        addUserDoc(user)
      })
      .catch((error) => {
        window.notify("something want worng", "error")
        // ..
      });
    setState(initialState)
  }

  const addUserDoc = async (user) => {
    let { firstName, lastName, password , terms} = state
   const userData={
    firstName: firstName,
    lastName: lastName,
    email: user.email,
    Password: password,
    uid: user.uid,
    terms
   }
   userData.dateCreated= serverTimestamp();
   userData.role = "user"
   userData.status = "active"
    try {
      await setDoc(doc(fireStore, "users", user.uid), userData);
      dispatch({ type: "LOGIN", payload: { user: userData } });
     window.notify("Registered successfully", "success");
     <Navigate to="/login"  />
    }
    catch (err) {
      window.notify("Error try again", "error")
    }


  }

  return (
    <div className="formDiv">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6  col-lg-4 ">

            <div className="card pt-4 px-2">
              <h2 className='text-center pb-3'>Register</h2>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" id="firstName" placeholder='FirstName' name='firstName' value={state.firstName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <input type="text" className="form-control" id="lastName" placeholder='LastName' name='lastName' value={state.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <input type="email" className="form-control" id="email" placeholder='Email' name='email' value={state.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder='Password' name='password' value={state.password} onChange={handleChange} />

                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" id="confirmPassword" placeholder='Confirm Password' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />

                  </div>
                  <div className="mb-3  text-center ">
                    <div><input type="checkbox" name='terms' value="I accept the Terms of Use & Privacy Policy" onChange={handleChange} />I accept the Terms of Use & Privacy Policy</div>
                    <button className="btn btn-danger text-white w-50 my-3" onClick={handleSignup} >Register</button>
                    <div>Already have an account? <Link to='/auth/login'>Login </Link>here</div>
                    <div>Copyright &copy; ijjazahmad.com</div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
