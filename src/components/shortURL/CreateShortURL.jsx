import { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import withAuth from '../../context/withAuth'
import './CreateShortURL.css'


const CreateShortURL = () => {
    const {token} = useContext(AuthContext)
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('');
    const [count, setCount] = useState(0);

    const handleChange = ({target: {value}}) => {
        setUrl(value)
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try 
        {
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/short-url/create`,
                data: {
                    url: url
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const {shortId} = response.data
            setShortUrl(shortId)

        } 
        catch (error) 
        {
            const {data, status}  = error.response
            if(status === 400)
            {
                toast.error(data.message, {
                    position: "bottom-center",
                    hideProgressBar: true
                })
            }
        }
    }

    // URL's count
    const countUrl = `${process.env.REACT_APP_API_URL}/short-url/hit-count`
    const fetchCount = useCallback(async () => {
        const response = await axios(countUrl)
        setCount(response.data.totalCount)
    },[countUrl])

    useEffect(() => {
        fetchCount()
        const intervalId = setInterval(fetchCount, 1000)
        return () => clearInterval(intervalId)
        
    },[fetchCount])

    return (
        <div className='container'>
            <div className='header'>
                <ul>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/urls">Shorted URLs</a></li>
                </ul>
            </div>
            <div className='url-container'>
                <h1 className='url-title'>URL Shortener</h1>
                <form className='url-form text-center' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type="url" name="url" className="form-control" placeholder="https://example.com" onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-dark">create url</button>
                </form> 

                <br />
                <a className='short-url-link' href={shortUrl} target='_blank' rel='noreferrer'>{shortUrl}</a>
            </div>
            <div className='count'>
                <p>Short URLs created</p>
                <h2>{count}</h2>
            </div>
        </div>
    )
}

export default withAuth(CreateShortURL)