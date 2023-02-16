import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({showAlert}) => {
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {


    }, [location])


    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-dark bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>

                        </ul>
                        <div className="auth_btn">
                            {!localStorage.getItem('authToken')?
                                <>
                                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                                    <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
                                </>
                                :
                                <Link className="btn btn-primary mx-1" to="/login" role="button" onClick={() => {
                                    localStorage.setItem('authToken', '');
                                    showAlert('Logged out Successfully','success');
                                    return navigate(`/login`)
                                }}>Logout</Link>
                            }
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar