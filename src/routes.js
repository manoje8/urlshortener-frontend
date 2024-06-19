import App from "./App";
import { Routes, Route } from "react-router-dom";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import ForgotPassword from "./components/user/ForgotPassword";
import SignInRegister from "./components/user/SignInRegister";
import CreateAccount from "./components/user/CreateAccount";
import ResetPassword from "./components/user/ResetPassword";
import CreateShortURL from "./components/shortURL/CreateShortURL";
import Dashboard from "./components/shortURL/Dashboard";
import ShortUrls from "./components/shortURL/ShortUrls";


const AppRoutes = () => (
    <App>
        <Routes>
            <Route path="/" element= {<Home />} />
            <Route path="/auth/login" element= {<SignInRegister />} />
            <Route path="/auth/create" element= {<CreateAccount />}/>
            <Route path="/auth/forgot-password" element= {<ForgotPassword />}/>
            <Route path="/auth/reset-password" element= {<ResetPassword />}/>
            <Route path="/short-url/create" element= {<CreateShortURL/>}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/urls" element={<ShortUrls />}/>
            <Route path="*" element={<Error404 />}/>
        </Routes>
    </App>
)

export default AppRoutes