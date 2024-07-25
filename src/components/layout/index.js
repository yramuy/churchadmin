import React, { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import Snackbar from "../pages/Snackbar";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const isLogin = sessionStorage.getItem('isLogin');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const dispatch = useDispatch();


    let response = useSelector((state) => {
        return state.moduleData;
    });

    useEffect(() => {
        triggerSnackbar();
    }, [response['message']]);

    const triggerSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
            dispatch({ type: "MESSAGE", payload: ""});
            // sessionStorage.setItem("message", "");
        }, 3000); // Adjust the duration as needed
    };

    console.log("Redux message", response['message']);
    
    return (
        <>
            <body class="hold-transition sidebar-mini layout-fixed">
                <div class="wrapper">
                    <Header />
                    <Sidebar />
                    <div class="content-wrapper">
                        {children}
                    </div>
                    {response['message'] && <Snackbar show={showSnackbar} message={response['message']} duration={3000} />}
                    <Footer />
                </div>
            </body>

        </>
    );
};

export default Layout;