import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { register,reset} from '../../features/slices/authSlice'

const Register = () => {
    const[formData,setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        re_password:''
    })

    const{first_name,email,last_name,password,re_password}=formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isError,isSuccess,message} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
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
        if(password !== re_password){
            toast.error('Passwords do not match');
        }
        const userData = {
            first_name,last_name,email,password
        }
        dispatch(register(userData));
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 m-auto">
                <div className="signup-container card card-body">
                    <h2 className="signup-header text-center my-4"><i className="fa fa-user-plus"></i> SignUp</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-2">
                            <label className="form-label">First Name</label>
                            <input type="text" name="first_name" className="form-control" value={first_name} onChange={onChange} />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Last Name</label>
                            <input type="text" name="last_name" className="form-control" value={last_name} onChange={onChange}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={onChange}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={onChange}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" name="re_password" className="form-control" value={re_password} onChange={onChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <p className="lead mt-4">Have An Account <a className="to_login" href="/login">Login</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register