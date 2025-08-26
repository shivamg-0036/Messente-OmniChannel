import '../Pages/CSS/Custom CSS/Navbar.css'
import { useEffect, useState } from 'react';

export default function Navbar({ toggleSidebar }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 769);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
       <nav class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-light navbar-border navbar-shadow navbar-brand-center" style={{ height: "100%" }} >
            <div class="navbar-wrapper" >
                <div class="" style={{ width: "100%", height: "100%" }}>
                    <ul class="nav navbar-nav flex-row ul-div" >
                        <li class="nav-item mobile-menu "><a
                            class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"
                            onClick={e => {
                                e.preventDefault();
                                toggleSidebar(); // <-- call the toggle
                            }}
                        ><i
                            class="fa-solid fa-bars" style={{ fontSize: "1.4rem", marginLeft: "0.8rem" }}></i></a></li>

                        <li class="nav-item" >
                            <a class="navbar-brand">
                                <img class="brand-logo img-class" alt="" src='images/Messente.png' />
                            </a>
                        </li>

                       

                        <li className="nav-item" style={{ zIndex: "10000", height: "4.3rem" ,  width: isMobile ? '1rem' : 'auto' }} >
                            <ul class=" navbar-nav float-right" style={{ height: "100%" }}>
                                <li className="dropdown nav-item" style={{ height: '100%', position:"relative" }}>
                                    <a
                                        className="dropdown-toggle nav-link dropdown-user-link"
                                        href="#"
                                        data-toggle="dropdown"
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        {isMobile ? (
                                            <i
                                                className="fa fa-ellipsis-v"
                                                style={{ fontSize: '1.4rem', position:"absolute", top:"33%", right:"0"}}
                                            ></i>
                                        ) : (
                                            <>
                                                <span className="avatar-online">
                                                    <img
                                                        src="images/avatar-s-1.png"
                                                        alt="avatar"
                                                        style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }}
                                                    />
                                                </span>
                                                <span
                                                    className="user-name"
                                                    style={{ lineHeight: '0', marginLeft: '0.4rem', marginTop: '0.28rem' }}
                                                >
                                                    User Name
                                                </span>
                                            </>
                                        )}
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right" style={{position: isMobile ? 'absolute' : undefined,}} >
                                        <a className="dropdown-item" href="#">
                                            <i className="ft-user"></i> Edit Profile
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">
                                            <i className="ft-power"></i> Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>

                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}