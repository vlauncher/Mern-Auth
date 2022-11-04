import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout,reset} from '../features/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state)=> state.auth)
  const onLogout = () =>{
    dispatch(logout());
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container-fluid">
      <Link className="navbar-brand" to="#">Expres-Auth</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav m-auto">
          <Link className="nav-link" to="/">Home</Link>
          {user ? (
            <li>
              <button className="btn btn-light" onClick={onLogout}>Logout</button>
            </li> 
          ) : (
            <>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
             </>
          )}
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar