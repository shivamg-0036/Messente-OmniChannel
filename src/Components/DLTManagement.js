import '../Pages/CSS/Custom CSS/DLTMgt.css'
import SelectBox from './Form-Elements/SelectBox';
import SMSDLTManagement from './SMSDLTManagement';
import Table from './Table';
import { useState, useEffect } from 'react';
import WABADLTManagement from './WABADLTManagement';

export default function DLTManagement({ sidebarOpen }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSenderExpanded, setIsSenderExpanded] = useState(false);
    const [isEntityExpanded, setIsEntityExpanded] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isSenderCollapsed, setisSenderCollapsed] = useState(true);
    const [isEntityCollapsed, setisEntityCollapsed] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [servicetype, setServiceType] = useState("SMS");

    // Track screen resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate dynamic left and width
    const headerLeft = windowWidth < 768 ? '1.9%' : sidebarOpen ? '19.8rem' : '6rem';
    const headerWidth = windowWidth < 768 ? '96.2%' : sidebarOpen ? 'calc(100% - 20.8rem)' : 'calc(100% - 7rem)';
    const marginTop = windowWidth < 1200 ? "0.7rem" : "";



    const toggleExpand = () => { setIsExpanded(prev => !prev) };
    const toggleCollapse = () => setIsCollapsed(prev => !prev);

    const toggleSenderExpand = () => { setIsSenderExpanded(prev => !prev) };
    const toggleSenderCollapse = () => setisSenderCollapsed(prev => !prev);

    const toggleEntityExpand = () => { setIsEntityExpanded(prev => !prev) };
    const toggleEntityCollapse = () => setisEntityCollapsed(prev => !prev);

    const renderDLTManagementComponent = () => {
        switch (servicetype) {
            case "SMS":
                return (
                    <SMSDLTManagement   sidebarOpen={sidebarOpen} />
                )

            case "WABA":{
                return (
                    <WABADLTManagement  sidebarOpen={sidebarOpen} />
                )
            }
        }
    };

return (
    // <div className='dlt-container'>
    <div className={`dlt-container ${isExpanded || isSenderExpanded || isEntityExpanded ? 'fullscreen' : ''}`}>
        <div
            className="campaign-header"
            style={{
                left: headerLeft,
                width: headerWidth,
                marginTop: marginTop,
                zIndex: "2"
            }}
        >
            <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                <h5 className="card-title mb-0" style={{
                    fontWeight: "600", fontSize: windowWidth < 1045
                        ? "0.85rem"
                        : windowWidth < 605
                            ? "1.1rem"
                            : ""
                }}>DLT MANAGEMENT</h5>
            </div>
            <div className='image-divs'>
                <div className='img-text-div'>
                    <span> <span className="cho-class">Choose</span> Service :-</span>
                </div>

                <div className='img-div-1' style={{ cursor: "pointer" }} onClick={() => setServiceType("SMS")}>
                    <img src={`${process.env.PUBLIC_URL}/images/sms.png`} style={{ width: '1.75rem' }} />
                </div>

                <div className='img-div-2' style={{ cursor: "pointer" }} onClick={() => setServiceType("RCS")}>
                    <img src={`${process.env.PUBLIC_URL}/images/rcslogo1.png`} style={{ width: '2.2rem', cursor: "pointer" }} />
                </div>

                <div className='img-div-3' style={{ cursor: "pointer" }} onClick={() => setServiceType("WABA")}>
                    <img src={`${process.env.PUBLIC_URL}/images/waba-removebg-preview.png`} style={{ width: '2.5rem' }} />
                </div>

                <div className='img-div-4' style={{ cursor: "pointer" }} onClick={() => setServiceType("Voice")}>
                    <i class="fa-solid fa-microphone-lines" style={{ color: "#FFD43B", cursor: "pointer", fontSize: "1.4rem" }} ></i>
                </div>

                <div className='img-div-5' style={{ cursor: "pointer" }} onClick={() => setServiceType("Email")}>
                    <i class="fa-solid fa-envelope" style={{ color: "#ef4ff5", cursor: "pointer", fontSize: "1.4rem" }} ></i>
                </div>
            </div>
        </div>

        {renderDLTManagementComponent()}



    </div>
);
}
