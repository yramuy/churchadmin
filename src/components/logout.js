import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("userName", "");
    sessionStorage.setItem("userRoleId", "");
    sessionStorage.setItem("userRole", "");
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("mobileno", "");
    sessionStorage.setItem("isLogin", false);
    
    
    useEffect(() => {
        dispatch({ type: "CHECKLOGGEDIN", payload: false });
        navigate('/login', { replace: true });
    }, []);
    
};

export default Logout;