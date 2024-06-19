import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import "./Navbar.css"

const Navbar = () => {

    const {token, setToken, userName, setUserName} = useContext(AuthContext)

    // Logout the user
    const logout = () => {
        setUserName(null)
        setToken(null);
        localStorage.removeItem("name");
        localStorage.removeItem("token");
    }

    return (
    <div>
        <nav className="navbar navbar-expand-lg" id="navbar">
            <div className="container">
                {token ?  <a href="/short-url/create">Short URL</a>: ""}

                <a className="navbar-brand" id="title" href="/">Shortify</a>

                <div>
                    <a type="button" data-toggle="dropdown" href="#profile" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </a>
                    
                    <div className="dropdown-menu dropdown-menu-right" id="profile">
                        <p>{userName}</p>
                        {token ? 
                        <div className="options">
                            <a href="/dashboard">Dashboard</a>
                            <a href="/urls">URL's</a>
                            <a href="/auth/login" onClick={logout}>Logout</a> 
                        </div>
                        : 
                        <a href="/auth/login">Login</a>
                        }
                    </div>
                </div>
            </div>
        </nav>
    </div>
)}

export default Navbar