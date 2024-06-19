import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState(null)
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Save the data into local storage
    const fetchToken = useCallback(async () => {
        const storedName = localStorage.getItem("name")
        setUserName(storedName)
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        setLoading(false); 
    },[])

    useEffect(() => {
        fetchToken()
    },[fetchToken])

    const context = {
        token,
        setToken,
        loading,
        userName,
        setUserName
    }

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthProvider