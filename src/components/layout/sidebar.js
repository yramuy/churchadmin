import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {

    const [isActive, setIsActive] = useState(false);
    const [isConfig, setIsConfig] = useState(false);
    const loginUser = sessionStorage.getItem('userName');
    const userRole = sessionStorage.getItem('userRole');
    const location = useLocation();

    const handleClick = () => {
        setIsActive(!isActive);
    }
    const handleConfig = () => {
        setIsConfig(isConfig);

    }

    console.log("loginUser,", loginUser)

    return (
        <>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <a href="index3.html" class="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />
                    <span class="brand-text font-weight-light">AdminLTE 3</span>
                </a>

                {/* <!-- Sidebar --> */}
                <div class="sidebar">
                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div class="info">
                            <a href="#" class="d-block">{loginUser}</a>
                        </div>
                    </div>

                    {/* <!-- SidebarSearch Form --> */}
                    <div class="form-inline">
                        <div class="input-group" data-widget="sidebar-search">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div class="input-group-append">
                                <button class="btn btn-sidebar">
                                    <i class="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Sidebar Menu --> */}
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li class="nav-item">
                                <a href="/dashboard" class={location.pathname == '/dashboard' ? "nav-link active" : "nav-link"}>
                                    <i class="nav-icon fas fa-home"></i>
                                    <p>
                                        Home
                                    </p>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/users" class={location.pathname == '/users' ? "nav-link active" : "nav-link"}>
                                    <i class="nav-icon fas fa-users"></i>
                                    <p>
                                        Users
                                    </p>
                                </a>
                            </li>

                            {/* <li class={isActive ? 'nav-item menu-open' : 'nav-item'} onClick={handleClick}>
                                <a href="#" class={isActive ? 'nav-link active' : 'nav-link'}>
                                    <i class="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        Dashboard
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <a href="./index.html" class="nav-link active">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Dashboard v1</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="./index2.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Dashboard v2</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="./index3.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Dashboard v3</p>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            <li class={isConfig == true || (location.pathname == '/modules') || (location.pathname == '/addModule') || (location.pathname == '/saints') || (location.pathname == '/addSaint') ? 'nav-item menu-open' : 'nav-item'} onClick={handleConfig}>
                                <a href="#" class={isConfig == true || (location.pathname == '/modules') || (location.pathname == '/addModule') || (location.pathname == '/saints') || (location.pathname == '/addSaint') ? 'nav-link active' : 'nav-link'}>
                                    <i class="nav-icon fas fa-cog"></i>
                                    <p>
                                        Configurations
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <a href="/modules" class={isConfig == true || (location.pathname == '/modules') || (location.pathname == '/addModule') ? 'nav-link active' : 'nav-link'}>
                                            <i class="nav-icon fas fa-folder"></i>
                                            <p>Modules</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/saints" class={isConfig == true || (location.pathname == '/saints') || (location.pathname == '/addSaint') ? 'nav-link active' : 'nav-link'}>
                                            <i class="nav-icon fas fa-users"></i>
                                            <p>Saints</p>
                                        </a>
                                    </li>

                                </ul>
                            </li>

                        </ul>
                    </nav>
                    {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        </>
    );
};

export default Sidebar;