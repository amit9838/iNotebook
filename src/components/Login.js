import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";

function Login(props) {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const onSubmit = async(e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login"
        try{
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email:user.email,password:user.password})
            });
            const json = await response.json();
            console.log(json);
            localStorage.setItem('authToken',json.authToken);
            if(json.success){
                console.log("Login successful")
                props.showAlert("Login successful","success");
                return navigate(`/`)
            }
            else{
                console.log("Invalid Credentails!")
                props.showAlert("Invalid Credentails","danger");
            }
        }catch(error) {
            console.log("Sonething went wrong!")
            props.showAlert("Something went wrong","danger");
        }

    }


    const onChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    }


    return (
        <>
            <div className="row my-2">
                <div className="col-sm-6 mx-auto border rounded py-3">
                    <h3 className='mb-2'>Welcome Back</h3>
                    <hr className='mt-1' />
                    <h4 className='mb-4 mx-2 '>Login Here</h4>
                    <form className='mx-3' onSubmit={onSubmit}>
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" name='email'  onChange={onChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login