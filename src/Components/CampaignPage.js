import { useState, useEffect } from "react";
import '../Pages/CSS/Custom CSS/createcampaign.css';
import Mobile from "./Form-Elements/Mobile";
import EmailCampaign from "./EmailCampaign";
import RCSCampaign from "./RCSCampaign";
import SMSCampaign from "./SMSCampaign";
import WABACampaign from "./WABACampaign";
import VoiceCampaign from "./VoiceCampaign";
export default function CampaignPage({ sidebarOpen }) {
    const [servicetype, setServiceType] = useState("SMS");
    const [tabname, settabname] = useState("Quick");
    const [senderid, setsenderid] = useState("");
    const [quickmsgtext, setquickmsgtext] = useState("");
    const [dynmaicmsgtext, setdynamicmsgtext] = useState("");
    const [dynamicsenderid, setdynamicsenderid] = useState("");
    const [uploadmsgtext, setuploadmsgtext] = useState("");
    const [uploadsenderid, setuploadsenderid] = useState("");
    const [groupmsgtext, setgroupmsgtext] = useState("");
    const [groupsenderid, setgroupsenderid] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const isActive = (type) => servicetype === type ? "active-service" : "";


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

    const heightdiv = tabname === "Quick" ? "50rem" : tabname === "Dynamic" ? "65rem" : tabname === "Upload" ? "64rem" : tabname === "Group" ?
        "58rem" : "";

    const renderCampaignComponent = () => {
        switch (servicetype) {
            case "SMS":
                return (
                    <SMSCampaign
                        senderid={senderid}
                        setsenderid={setsenderid}
                        dynamicsenderid={dynamicsenderid}
                        setdynamicsenderid={setdynamicsenderid}
                        uploadsenderid={uploadsenderid}
                        setuploadsenderid={setuploadsenderid}
                        groupsenderid={groupsenderid}
                        setgroupsenderid={setgroupsenderid}
                        dynmaicmsgtext={dynmaicmsgtext}
                        setdynamicmsgtext={setdynamicmsgtext}
                        tabname={tabname}
                        settabname={settabname}
                        quickmsgtext={quickmsgtext}
                        setquickmsgtext={setquickmsgtext}
                        uploadmsgtext={uploadmsgtext}
                        setuploadmsgtext={setuploadmsgtext}
                        groupmsgtext={groupmsgtext}
                        setgroupmsgtext={setgroupmsgtext}
                        sidebarOpen={sidebarOpen}
                    />
                );

            case "RCS":
                return <RCSCampaign />;

            case "WABA":
                return <WABACampaign />;

            case "Voice":
                return <VoiceCampaign />;

            case "Email":
                return <EmailCampaign />
        }
    };



    return (
        <div className="campaign-container">
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
                    }}>CAMPAIGN MANAGEMENT</h5>
                </div>
                <div className='image-divs'>
                    <div className='img-text-div'>
                        <span> <span className="cho-class">Choose</span> Service :-</span>
                    </div>

                    <div className='img-div-1' style={{ cursor: "pointer" }} onClick={() => setServiceType("SMS")}>
                        <img src='images/sms.png' style={{ width: '1.75rem' }} />
                    </div>

                    <div className='img-div-2' style={{ cursor: "pointer" }} onClick={() => setServiceType("RCS")}>
                        <img src='images/rcslogo1.png' style={{ width: '2.2rem', cursor: "pointer" }} />
                    </div>

                    <div className='img-div-3' style={{ cursor: "pointer" }} onClick={() => setServiceType("WABA")}>
                        <img src='images/waba-removebg-preview.png' style={{ width: '2.5rem' }} />
                    </div>

                    <div className='img-div-4' style={{ cursor: "pointer" }} onClick={() => setServiceType("Voice")}>
                        <i class="fa-solid fa-microphone-lines" style={{ color: "#FFD43B", cursor: "pointer", fontSize: "1.4rem" }} ></i>
                    </div>

                    <div className='img-div-5' style={{ cursor: "pointer" }} onClick={() => setServiceType("Email")}>
                        <i class="fa-solid fa-envelope" style={{ color: "#ef4ff5", cursor: "pointer", fontSize: "1.4rem" }} ></i>
                    </div>
                </div>
            </div>

            <div className="campaign-header-2" style={{
                left: headerLeft,
                width: headerWidth,
                marginTop: marginTop,
                zIndex: "2"
            }}>
                <div className='image-divs'>
                    <div className='img-text-div'>
                        <span><span className="cho-2-class">Choose</span>  Service :-</span>
                    </div>

                    <div className='img-div-1' style={{ cursor: "pointer" }} onClick={() => setServiceType("SMS")}>
                        <img src='images/sms.png' style={{ width: '1.75rem' }} />
                    </div>

                    <div className='img-div-2' style={{ cursor: "pointer" }} onClick={() => setServiceType("RCS")}>
                        <img src='images/rcslogo1.png' style={{ width: '2.2rem', cursor: "pointer" }} />
                    </div>

                    <div className='img-div-3' style={{ cursor: "pointer" }} onClick={() => setServiceType("WABA")}>
                        <img src='images/waba-removebg-preview.png' style={{ width: '2.5rem' }} />
                    </div>

                    <div className='img-div-4' style={{ cursor: "pointer" }} onClick={() => setServiceType("Voice")}>
                        <i class="fa-solid fa-microphone-lines" style={{ color: "#FFD43B", cursor: "pointer", fontSize: "1.4rem" }} ></i>
                    </div>

                    <div className='img-div-5' style={{ cursor: "pointer" }} onClick={() => setServiceType("Email")}>
                        <i class="fa-solid fa-envelope" style={{ color: "#ef4ff5", cursor: "pointer", fontSize: "1.4rem" }} ></i>
                    </div>
                </div>
            </div>

            <div className="campaign-content">
                <div className="left-scroll-container">
                    <div className={`card-left ${!sidebarOpen ? 'sidebarclose' : ''}`}>
                        <div style={{ minHeight: "100%" }}>
                            {renderCampaignComponent()}
                        </div>
                    </div>
                </div>

                <div className="card-right">
                    <Mobile
                        message={
                            tabname === 'Quick' ? quickmsgtext :
                                tabname === 'Dynamic' ? dynmaicmsgtext :
                                    tabname === 'Group' ? groupmsgtext :
                                        tabname === 'Upload' ? uploadmsgtext : ''
                        }
                        senderid={
                            tabname === 'Quick' ? senderid :
                                tabname === 'Dynamic' ? dynamicsenderid :
                                    tabname === 'Group' ? groupsenderid :
                                        tabname === 'Upload' ? uploadsenderid : ''
                        }
                        serviceType={servicetype}
                    />


                </div>
            </div>
        </div>
    );
}