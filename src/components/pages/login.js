import { useState } from "react";
import { PostApiService } from "../api";
import { useNavigate } from "react-router-dom";
import Snackbar from "./Snackbar";
import { useDispatch } from "react-redux";
const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const triggerSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
        }, 3000); // Adjust the duration as needed
    };

    const handleLogin = async (e) => {
        console.log("welcome")
        e.preventDefault();
        setLoading(true);

        try {
            const url = '/mobileapi/api/login';
            const body = JSON.stringify({
                username: userName,
                password: password
            });

            console.log("body", body)


            await PostApiService(url, body).then((response) => {
                // console.log('Response ',data)
                setMessage(response.message);
                triggerSnackbar();
                if (response.status == "200") {
                    dispatch({ type: "CHECKLOGGEDIN", payload: true });
                    const userData = response.data;
                    sessionStorage.setItem("userId", userData.id);
                    sessionStorage.setItem("userName", userData.name);
                    sessionStorage.setItem("userRoleId", userData.role_id);
                    sessionStorage.setItem("userRole", userData.role_name);
                    // sessionStorage.setItem("userImg", userData.image);
                    sessionStorage.setItem("email", userData.email);
                    // sessionStorage.setItem("mobileno", userData.mobileno);
                    sessionStorage.setItem("isLogin", true);
                    sessionStorage.setItem("message", response.message);

                    // console.log("userData : ", userData)
                    setLoading(false);
                    navigate('/dashboard', { replace: true });

                } else {
                    // setShowMsg(true);
                    navigate('/', { replace: true });
                }
            });
        } catch (error) {
            console.log("error", error)
        }

    }

    return (
        <>
            <div class="container">
            {loading && <div class="loader"></div>}
                <div class="login-container">
                    <div class="avatar1">
                        <img src="dist/img/57857.jpg" id="logo" alt="" />
                    </div>
                    {/* <h2>Admin Login</h2> */}
                    <br />
                    <form method="post">
                        <div class="form-group">
                            {/* <label for="username">Username</label> */}
                            <input type="text" class="form-control"
                                id="username"
                                name="username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Email or Mobile Number" required />
                        </div>
                        <div class="form-group">
                            {/* <label for="password">Password</label> */}
                            <input type="password" class="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" required />
                        </div>
                        <button type="submit" name="btn_login" class="btn btn-primary btn-block" onClick={handleLogin}>Login</button>


                    </form>
                </div>
            </div>

            <Snackbar show={showSnackbar} message={message} duration={3000} />
        </>
    );
};

export default Login;