import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { login,reset} from '../../features/slices/authSlice'

const Login = () => {
    const[formData,setFormData] = useState({
        email:'',
        password:'',
    })

    const{email,password}=formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isError,isSuccess,message} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        dispatch(reset())
    },[isError,isSuccess,message,user,navigate,dispatch])

    const onChange = (e) =>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        const userData = {
          email,password
        }
        dispatch(login(userData));
        if(user){
            toast.success('Login Success')
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 m-auto">
                <div className="signup-container card card-body">
                    <h2 className="signup-header text-center my-4"><i className="fa fa-user-plus"></i> Login</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-2">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={onChange}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={onChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p className="lead mt-4">Dont Have An Account <Link className="to_login" to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;