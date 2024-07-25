import React from "react";
import { BrowserRouter, Route, Routes, useNavigate, Redirect } from "react-router-dom";
import './App.css';
import Layout from "./components/layout";
import Dashboard from "./components/layout/dashboard";
import Users from "./components/pages/users";
import Login from "./components/pages/login";
import Logout from "./components/logout";
import Modules from "./components/pages/module/modules";
import AddModule from "./components/pages/module/addModule";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Protected from "./components/sessioncontext/ProtectedRoute";
import PageNotFound from "./components/pages/PageNotFound";
import Saints from "./components/pages/saint/Saints";
import AddSaint from "./components/pages/saint/addSaint";

const App = () => {

  let response = useSelector((state) => {
    return state.moduleData;
  });

  const isLogin = response['checkLoggedIn'];
  let login = sessionStorage.getItem('isLogin');



  console.log("checkLoggedIn", isLogin)
  console.log("login", login)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
          <Route path="/users" element={<Protected Component={Users} />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/modules" element={<Protected Component={Modules} />} />
          <Route path="/addModule" element={<Protected Component={AddModule} />} />
          <Route path="/addModule/:moduleId" element={<Protected Component={AddModule} />} />
          <Route path="/saints" element={<Protected Component={Saints} />} />
          <Route path="/addSaint" element={<Protected Component={AddSaint} />} />

          {/* Catch-all route for 404 Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
