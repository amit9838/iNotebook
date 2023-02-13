import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [user, setUser] = useState({ name: "", email: "", password1: "", password2:""});
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.password1===user.password2) {
      const url = "http://localhost:5000/api/auth/register";
      try {
        const response = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: user.name, email: user.email, password: user.password1 })
        });
        const json = await response.json();
        console.log(json);
      localStorage.setItem('authToken', json.authToken);
      if (json.success) {
        console.log("Account  Created")
        props.showAlert("Account Created","success");
        return navigate(`/`)
      }
      else {
        console.log("Invalid input!")
      }
    } catch (error) {
      console.log("Sonething went wrong!")
      props.showAlert("Something went wrong","danger");
      
    }
  }
  else{
    console.log("Password didn't match!")
    props.showAlert("Password didn't match!","danger");
  }

  }


  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }



  return (
    <>
      <div className="row my-2">
        <div className="col-sm-6 mx-auto border rounded py-3">
          <h3 className='mb-2'>Register Here</h3>
          <hr className='mt-1' />
          <form className='mx-3' onSubmit={onSubmit}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="email" name='email' onChange={onChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="password1" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="password1" name='password1' onChange={onChange} />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="password2" className="col-sm-2 col-form-label">Confirm Password</label>
              <div className="col-sm-10">
                <input type="password" className="form-control" id="password2" name='password2' onChange={onChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup