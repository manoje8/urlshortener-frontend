import { useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import withAuth from "../../context/withAuth"
import { AuthContext } from "../../context/AuthContext"
import DailyGraph from "../chart/DailyGraph"
import MonthlyGraph from "../chart/MonthlyGraph"

const Dashboard = () => {
    const {token} = useContext(AuthContext)
    const [urlData, setUrlData] = useState([])

    const dashboardURI = `${process.env.REACT_APP_API_URL}/short-url/dashboard`
    const fetchData = useCallback(async () => {
        try 
        {
            const response = await axios(dashboardURI,
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            )
            setUrlData(response.data)
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

    return (
        <div style={{width: "100%",display: 'flex', gap: '2rem', justifyContent: 'center',alignItems: 'center', flexWrap: 'wrap'}}>
            <MonthlyGraph urlData={urlData}/>
            <DailyGraph urlData={urlData}/> 
        </div>
    )
}

export default withAuth(Dashboard)