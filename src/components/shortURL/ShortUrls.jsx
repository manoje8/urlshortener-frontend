import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"
import {format} from 'date-fns'
import withAuth from "../../context/withAuth"

const ShortUrls = () => {

    const {token} = useContext(AuthContext)
    const [allUrlData, setAllUrlData] = useState([])

    const dashboardURI = `${process.env.REACT_APP_API_URL}/short-url/urls`
    const fetchData = useCallback(async () => {
        try {
            const response = await axios(dashboardURI,
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )
            setAllUrlData(response.data)
        } 
        catch (error) 
        {
            const {data, status}  = error.response
            if(status === 400 || status.error === 500)
            {
                toast.error(data.message, {
                    position: "bottom-center",
                    hideProgressBar: true
                })
            }
        }
        
    },[dashboardURI, token])

    useEffect(() => {
        fetchData()
    },[fetchData])

    const urlTable = () => (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">URL</th>
                    <th scope="col">Short URL</th>
                    <th scope="col">Hit Count</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUrlData.map((urlData, id) => (
                        <tr key={id}>
                            <th scope="row">{id+1}</th>
                            <td>{urlData.url}</td>
                            <td>{process.env.REACT_APP_API_URL + '/short-url/' +urlData.shortId}</td>
                            <td>{urlData.hitCount}</td>
                            <td>{format(new Date(urlData.createdAt),"dd/MM/yyyy")}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )

    return (
        <div className="container p-4">
            {allUrlData <= 0 ? "No Data found" : urlTable()}
        </div>
    )
}

export default withAuth(ShortUrls)