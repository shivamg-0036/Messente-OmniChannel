import { useState, useEffect, useRef } from 'react';
import '../Pages/CSS/Custom CSS/Sidebar.css';
import { Link } from 'react-router-dom';

export default function Sidebar({ isSidebarOpen }) {
    const [subdivnumber, setsubdivnumber] = useState(null);

    const liRefs = {
        0: useRef(null),
        1: useRef(null),
    };

    const handleIcon = (index) => {
        setsubdivnumber((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideAny = Object.values(liRefs).some(
                (ref) => ref.current && ref.current.contains(event.target)
            );

            if (!clickedInsideAny) {
                setsubdivnumber(null); // Clicked outside all li-divs
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 769);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        (!isMobile || isSidebarOpen) && (
        <div className="main-menu-content" style={{ width: "100%" }}>
            <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" style={{ width: "100%" }}>
                <li className="li-div" >
                    <div style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }}>
                        <div className="side-icon-div">
                            <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/home (2).png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                        </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item">
                                <a><span className="menu-title">DASHBOARD</span></a>
                            </div>
                        )}
                    </div>

                </li>

                <li className="li-div" ref={liRefs[0]} >
                    <div style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }} onClick={() => handleIcon("0")} >
                        <div className="side-icon-div">
                            <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/user.png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                        </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item sub-div" style={{ position: "relative" }}>
                                <a
                                    style={{ padding: 0 }}><span className="menu-title">USERS</span></a>

                            </div>
                        )}
                        <div className="side-sub-div">
                            <i className=''></i>
                        </div>
                    </div>

                    {subdivnumber === "0" && isSidebarOpen && <div style={{ display: "block", height: "auto", width: "100%", paddingLeft: "3rem", paddingBottom: "0.5rem", paddingTop: "0.3rem", fontSize: "0.95rem" }}>
                        <Link to="/usercreation" className='sub-div-item' >User Creation</Link>
                        <Link to="/" className='sub-div-item' style={{ paddingBottom: "0" }} >Enterprise Creation</Link>
                    </div>}
                </li>

                <li className="li-div">
                    <div style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }}>
                        <div className="side-icon-div">
                            <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/document.png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                        </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item">
                                <a><span className="menu-title ">REPORTS</span></a>
                            </div>
                        )}
                    </div>
                </li>

                <li className="li-div" ref={liRefs[1]}>
                    <div style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }} onClick={() => handleIcon("1")}>
                        <div className="side-icon-div">
                            <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/arrow.png`} style={{ width: "2.1rem" }} />
                        </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item sub-div" style={{ marginLeft: "0.8rem" }}>
                                <a><span className="menu-title" >ROUTING</span></a>
                            </div>
                        )}
                        <div className="side-sub-div" ></div>
                    </div>

                    {subdivnumber === "1" && isSidebarOpen && <div style={{ display: "block", height: "auto", width: "100%", paddingLeft: "3rem", paddingBottom: "0rem", paddingTop: "0.3rem", fontSize: "0.95rem" }}>
                        <div className='sub-div-item'  >Group Management</div>
                        <div className='sub-div-item' >User Management</div>
                        <div className='sub-div-item' >Telco Code Mapping</div>
                    </div>}


                </li>

                <li className="li-div">
                    <div style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }}>
                        <div className="side-icon-div">
                            <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/minimize.png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                        </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item">
                                <a><span className="menu-title">SMPP MANAGEMENT</span></a>
                            </div>
                        )}

                    </div>
                </li>

                <li className="li-div" >
                    <div style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }}>
                        <div className="side-icon-div">
                            <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/add-friend.png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                        </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item">
                                <a><span className="menu-title">OPERATOR REPORT</span></a>
                            </div>
                        )}
                    </div>
                </li>

                <div className="li-div"   >
                    <Link to="/campaignmgt" style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }}>
                        <div className="side-icon-div">
                            <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/technical-support.png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                        </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item">
                                <a><span className="menu-title">CAMPAIGN MANAGEMENT</span></a>
                            </div>
                        )}
                    </Link>
                </div>

                <li className="li-div">
                    <div style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }}>                    <div className="side-icon-div">
                        <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/user.png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                    </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item">
                                <a><span className="menu-title">TELCO ON BOARDING</span></a>
                            </div>
                        )}
                    </div>
                </li>

                 <div className="li-div"   >
                    <Link to="/templatemgt" style={{ display: "flex", alignItems: "center", flex: "0 0 100%", maxWidth: "100%" }}>
                         <div className="side-icon-div">
                        {/* <i class="fa-solid fa-user-tag" style={{ marginLeft: "0.35rem", fontSize:"1.2rem" }}></i> */}
                        <img src={`${process.env.PUBLIC_URL}/images/Icon-Images/user (1).png`} style={{ width: "1.5rem", marginLeft: "0.35rem" }} />
                    </div>
                        {isSidebarOpen && (
                            <div className="side-text-div nav-item">
                                <a><span className="menu-title">TEMPLATE MANAGAMENT</span></a>
                            </div>
                        )}
                    </Link>
                </div>

            </ul>
        </div>
        )

    );
}