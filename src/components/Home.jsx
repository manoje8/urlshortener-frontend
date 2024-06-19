import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import "./Home.css"


const Home = () => {
    const {token, userName} = useContext(AuthContext)

    return(
    <div className="home">
        <h1>Welcome to Shortify, {userName}</h1>
        <hr />
        <span>Create shorter URLs with shortify</span>
        <hr />
        <a className="btn btn-success px-5" href="/short-url/create">{token ? "Let's go" : "Let Start"}</a>
        <p>Shortify for transforming long, ugly links into nice, memorable and trackable short URLs. Use it to shorten links for any social media platforms, blogs, SMS, emails, ads, or pretty much anywhere else you want to share them. Twitter, Facebook, YouTube, Instagram, WhatsApp, emails, SMS, videos</p>
    </div>
)}

export default Home