import { useState } from "react"
import Container from "../Container"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import Spinner from "../Spinner"


const CreateAccount = () => {
    const navigate = useNavigate()
    // For spinner
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        firstName:"",
        lastName: "",
        email: "",
        password: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try 
        {
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/auth/register`,
                data: {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password
                }
            })

            const {message} = response.data;

            if(message)
            {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                })
            }
            setLoading(false)
            navigate("/auth/login")
        } catch (error) 
        {
            const {data, status}  = error.response
            if(status === 400 || status === 204)
            {
                toast.error(data.message, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true
                })
            }
        }
    }

    return (
    <Container>
        <section>
            <h1 className="title">Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First name</label>
                        <input name="firstName" className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last name</label>
                        <input name="lastName" className="form-control" onChange={handleChange} required/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" onChange={handleChange} required/>
                </div>
                {!loading ? 
                <button type="submit" className="btn btn-primary btn-block" >Create an account</button> 
                :
                <Spinner buttonName={"Create an account"}/>
                }
                <a className="btn btn-link" href="/auth/login">Back to Login</a>
            </form>
        </section>
        <section>
           <img className="left-panel" src="https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=600" alt="404" />
        </section>
    </Container>
)}

export default CreateAccount