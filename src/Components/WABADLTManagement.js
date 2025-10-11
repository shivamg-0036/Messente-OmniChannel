import { useState, useEffect } from "react";
import Table from "./Table";
import SelectBox from "./Form-Elements/SelectBox";

export default function WABADLTManagement(sidebarOpen) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSenderExpanded, setIsSenderExpanded] = useState(false);
    const [isEntityExpanded, setIsEntityExpanded] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isSenderCollapsed, setisSenderCollapsed] = useState(true);
    const [isEntityCollapsed, setisEntityCollapsed] = useState(true);

    const toggleExpand = () => { setIsExpanded(prev => !prev) };
    const toggleCollapse = () => setIsCollapsed(prev => !prev);

    const toggleSenderExpand = () => { setIsSenderExpanded(prev => !prev) };
    const toggleSenderCollapse = () => setisSenderCollapsed(prev => !prev);

    const toggleEntityExpand = () => { setIsEntityExpanded(prev => !prev) };
    const toggleEntityCollapse = () => setisEntityCollapsed(prev => !prev);

    return (
        <div className={`dlt-container ${isExpanded || isSenderExpanded || isEntityExpanded ? 'fullscreen' : ''}`}>
            {(!isExpanded && !isSenderExpanded && !isEntityExpanded) && (
                <div className='dlt-row mt-5'>
                    <div className="dlt-card px-0">
                        <div className="card bg-gradient-directional-info" style={{
                            backgroundImage: "linear-gradient(45deg, #228EB6, #4FC1E9",
                            backgroundRepeat: "repeat-x"
                        }}>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="media d-flex">
                                        <div className="align-self-center">
                                            <i class="fa-solid fa-mobile-screen text-white float-left" style={{ fontSize: "1.8rem" }}></i>
                                            {/* <i className="fa-solid fa-user-check " ></i> */}
                                        </div>
                                        <div className="media-body text-white text-right">
                                            <h3 className="text-white">278</h3>
                                            <span className='dlt-span'>WABA Numbers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dlt-card px-0">
                        <div className="card bg-gradient-directional-info" style={{
                            backgroundImage: "linear-gradient(to right, #298D74 0, #48CFAD 100%)",
                            backgroundRepeat: "repeat-x"
                        }}>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="media d-flex">
                                        <div className="align-self-center">
                                            <i className="fa-solid fa-envelope-circle-check text-white float-left" style={{ fontSize: "1.8rem" }}></i>
                                        </div>
                                        <div className="media-body text-white text-right">
                                            <h3 className="text-white">278</h3>
                                            <span className='dlt-span'>Templates</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dlt-card px-0">
                        <div className="card bg-gradient-directional-info" style={{
                            background: "#FFDD3C",
                            backgroundRepeat: "repeat-x"
                        }}>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="media d-flex">
                                        <div className="align-self-center">
                                            <i class="fa-solid fa-key text-white float-left" style={{ fontSize: "1.8rem" }}></i>
                                            {/* <i className="fa-solid fa-building-circle-check text-white float-left" style={{ fontSize: "1.8rem" }}></i> */}
                                        </div>
                                        <div className="media-body text-white text-right">
                                            <h3 className="text-white">8</h3>
                                            <span className='dlt-span'>API Keys</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='dlt-row'>
                {/* <div className='dlt-temp-card'>
                            <div class="row mb-0" style={{display:"flex", justifyContent:"space-between", flex:"0 0 100%", maxWidth:"100%"}}>
                                <div class="card-header" style={{border:"none"}}>
                                    <h6 class="card-title font-weight-bold">DLT Templates</h6>
                                </div>
        
                                <div className='mr-2' style={{display:"flex", height:"100%", alignItems:"center", margin:"auto"}} >
                                    <i class="fa-solid fa-minus" style={{marginRight:"1.4rem"}}></i>
                                    <i class="fa-solid fa-arrow-rotate-right" style={{marginRight:"1.4rem"}}></i>
                                    <i class="fa-solid fa-expand "></i>
                                    
                                </div>
                            </div>
        
                            <div className='row mb-2 ml-2 mt-1' style={{display:"flex", justifyContent:"space-between", flex:"0 0 99%", maxWidth:"99%"}}>
                                <div class="input-group" style={{width:"30%"}}>
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Search...." aria-describedby="basic-addon1" style={{fontSize:"0.9rem"}} />
                                    </div>
                            </div>
                        </div> */}

                {/* <div className='dlt-temp-card' > */}
                {!isSenderExpanded && !isEntityExpanded && (<div className={`dlt-temp-card ${isExpanded ? 'expanded' : ''}`}>
                    <div class="row mb-0" style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                        <div class="card-header" style={{ border: "none" }}>
                            <h5 class="card-title font-weight-bold">WhatsApp Templates</h5>
                        </div>

                        <div className='mr-2' style={{ display: "flex", height: "100%", alignItems: "center", margin: "auto" }} >
                            <i className={`fa-solid ${isCollapsed ? 'fa-plus' : 'fa-minus'} rotate-icon`} style={{ marginRight: "1.4rem", cursor: "pointer" }} onClick={toggleCollapse} ></i>
                            <i class="fa-solid fa-arrow-rotate-right" style={{ marginRight: "1.4rem" }}></i>
                            <i className={`fa-solid ${isExpanded ? 'fa-compress' : 'fa-expand'}`}
                                style={{ cursor: "pointer" }} onClick={toggleExpand}></i>

                        </div>
                    </div>

                    <div className={`collapsible-wrapper ${isCollapsed ? 'collapsed' : ''} ml-2  mr-2`} style={{ width: "100%" }}>
                        <div className={`collapsible-container ${isCollapsed ? 'collapsed' : 'expanded'} `} style={{ width: "100%" }}>
                            <div className='row ' style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                {/* <div class="input-group" style={{ width: "30%" }}>
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Search...." aria-describedby="basic-addon1" style={{ fontSize: "0.9rem" }} />
                                </div> */}

                                <SelectBox
                                        label=""
                                        options={[

                                        ]}
                                        value=""
                                        // onChange={(e) => setbillingtype(e.target.value)}
                                        isreq={false}
                                        placeholder="Search Template Name"
                                        maxLength={20}
                                        widthRem="16rem"          // try commenting this out to see widthPercent used
                                        widthPercent="23%" widthPercent950="23%" widthPercent900="23%"
                                        sidebarOpen={sidebarOpen}
                                    />

                                 <SelectBox
                                        label=""
                                        options={[

                                        ]}
                                        value=""
                                        // onChange={(e) => setbillingtype(e.target.value)}
                                        isreq={false}
                                        placeholder="Select Category"
                                        maxLength={20}
                                        widthRem="16rem"          // try commenting this out to see widthPercent used
                                        widthPercent="23%" widthPercent950="23%" widthPercent900="23%"
                                        sidebarOpen={sidebarOpen}
                                    />

                                    <SelectBox
                                        label=""
                                        options={[

                                        ]}
                                        value=""
                                        // onChange={(e) => setbillingtype(e.target.value)}
                                        isreq={false}
                                        placeholder="Select Type"
                                        maxLength={20}
                                        widthRem="16rem"          // try commenting this out to see widthPercent used
                                        widthPercent="23%" widthPercent950="23%" widthPercent900="23%"
                                        sidebarOpen={sidebarOpen}
                                    />

                                
                                    
                                    
                                    <SelectBox
                                        label=""
                                        options={[

                                        ]}
                                        value=""
                                        // onChange={(e) => setbillingtype(e.target.value)}
                                        isreq={false}
                                        placeholder="Select Language"
                                        maxLength={20}
                                        widthRem="16rem"          // try commenting this out to see widthPercent used
                                       widthPercent="23%" widthPercent950="23%" widthPercent900="23%"
                                        sidebarOpen={sidebarOpen}
                                    />

                                    

                                <div style={{ width: "100%", overflowX: "auto" }} className='table-dlt-div'>
                                    <Table
                                        columns={[
                                            { key: "TemplateID", label: "Template ID" },
                                             { key: "TemplateName", label: "Template Name" },
                                           
                                            { key: "Category", label: "Category" },
                                            { key: "Language", label: "Language" },
                                            { key: "DateandTime", label: "Date/Time" },
                                            { key: "Status", label: "Status" },
                                              {key:"Action", label:"Preview" , disableFilter: true},
                                            

                                        ]}
                                        //.filter(col => selectedColumns.includes(col.key) || col.key === "Action")}
                                        data={[]}
                                    />
                                </div>




                            </div>
                        </div>
                    </div>


                </div>)}

                {!isExpanded && (
                    <div className='dlt-card-row'>
                        {!isEntityExpanded && (<div className={`div-small-card-1 ${isSenderExpanded ? 'expanded' : ''}`}>
                            <div class="row mb-0" style={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: "center" }}>
                                <div class="card-header" style={{ border: "none", display: "flex", alignItems: 'center' }}>
                                    <h6 class="card-title font-weight-bold">WABA Numbers</h6>
                                    <div class="badge badge-pill badge-border badge-glow border-warning warning badge-square ml-1">
                                        Total: 12
                                    </div>
                                </div>

                                <div className='mr-2' style={{ display: "flex", fontSize: "0.85rem" }} >
                                    <i className={`fa-solid ${isSenderCollapsed ? 'fa-plus' : 'fa-minus'} rotate-icon`} style={{ marginRight: "1.4rem", cursor: "pointer" }} onClick={toggleSenderCollapse} ></i>
                                    <i class="fa-solid fa-arrow-rotate-right" style={{ marginRight: "1.4rem" }}></i>
                                    <i className={`fa-solid ${isSenderExpanded ? 'fa-compress' : 'fa-expand'}`}
                                        style={{ cursor: "pointer" }} onClick={toggleSenderExpand} ></i>

                                </div>
                            </div>

                            <div className={`collapsible-wrapper ${isSenderCollapsed ? 'collapsed' : ''}  mr-2`} style={{ width: "100%" }}>
                                <div className={`collapsible-container ${isSenderCollapsed ? 'collapsed' : 'expanded'} `} style={{ width: "100%" }}>
                                    <div className='row mx-2 mb-2' style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                                        <div class="input-group" style={{ width: "100%" }}>
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">
                                                    <i class="fa-solid fa-magnifying-glass"></i>
                                                </span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Search...." aria-describedby="basic-addon1" style={{ fontSize: "0.9rem" }} />
                                        </div>
                                    </div>

                                    <div className='row mx-3 ' style={{ display: "flex", alignItems: "center", justifyContent: 'flex-start', marginTop: "2.2rem", marginBottom: "2.2rem", rowGap: "0.8rem", columnGap: '0.6rem' }}>
                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>

                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>

                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>
                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>
                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>
                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>

                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>
                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>

                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>

                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>
                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>
                                        <div class="badge badge-pill badge-glow badge-info badge-square" style={{ margin: "auto", paddingTop: "0.7rem", paddingBottom: "0.5rem" }}>
                                            <span style={{ paddingTop: "0.3rem" }}>919667066881</span>
                                        </div>
                                       

                                        


                                    </div>

                                    <div className='row mx-2 mb-1' style={{ borderTop: "1px solid #dddbdbff", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
                                            <span>Showing 1 to 12 of 23 results</span>
                                        </div>

                                        <div>
                                            <button type="button" class="btn btn-outline-secondary" style={{ padding: "0.4rem 0.8rem 0.4rem 0.8rem", marginTop: "1rem", marginRight: "1rem" }}>
                                                <i class="fa-solid fa-angle-left"></i>
                                            </button>

                                            <button type="button" class="btn btn-outline-secondary" style={{ padding: "0.4rem 0.8rem 0.4rem 0.8rem", marginTop: "1rem" }}>
                                                <i class="fa-solid fa-angle-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}

                        {!isSenderExpanded && (
                            <div className={`div-small-card-2 ${isEntityExpanded ? 'expanded' : ''}`}>
                                <div class="row mb-0" style={{ display: "flex", justifyContent: "space-between", width: '100%', height: "auto", alignItems: 'center' }}>
                                    <div class="card-header" style={{ border: "none", display: "flex", alignItems: 'center' }}>
                                        <h6 class="card-title font-weight-bold" >API Keys</h6>
                                        {/* <div class="badge badge-pill badge-border border-info info" >57</div> */}
                                        <div class="badge badge-pill badge-border badge-glow border-info info badge-square ml-1">
                                            Total: 10
                                        </div>
                                    </div>

                                    <div className='mr-2' style={{ display: "flex", fontSize: "0.85rem" }} >
                                        <i className={`fa-solid ${isEntityCollapsed ? 'fa-plus' : 'fa-minus'} rotate-icon`} style={{ marginRight: "1.4rem", cursor: "pointer" }} onClick={toggleEntityCollapse}  ></i>
                                        <i class="fa-solid fa-arrow-rotate-right" style={{ marginRight: "1.4rem" }}></i>
                                        <i className={`fa-solid ${isEntityExpanded ? 'fa-compress' : 'fa-expand'}`}
                                            style={{ cursor: "pointer" }} onClick={toggleEntityExpand}></i>

                                    </div>
                                </div>

                                <div className={`collapsible-wrapper ${isEntityCollapsed ? 'collapsed' : ''}  mr-2`} style={{ width: "100%" }}>
                                    <div className={`collapsible-container ${isEntityCollapsed ? 'collapsed' : 'expanded'} `} style={{ width: "100%" }}>

                                        <div className='row mx-2 mb-2' style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                                            <div class="input-group" style={{ width: "100%" }}>
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">
                                                        <i class="fa-solid fa-magnifying-glass"></i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control" placeholder="Search...." aria-describedby="basic-addon1" style={{ fontSize: "0.9rem" }} />
                                            </div>
                                        </div>

                                        <div className='row mx-2' style={{ marginTop: "2.2rem", fontSize: "0.9rem" }}>
                                            {/* <table class="table table-hover ">
                                            <thead style={{backgroundColor:"rgb(249, 250, 251)", }}>
                                                <tr style={{borderBottom:"none"}}>
                                                   
                                                    <th scope="col">Last</th>
                                                    <th scope="col">Handle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                  
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                   
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>@twitter</td>
                                                </tr>
        
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>Jacob</td>
                                                   
                                                </tr>
        
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>Jacob</td>
                                                   
                                                </tr>
                                            </tbody>
                                        </table> */}

                                            <div className="card-content ">
                                                <div className="card-body card-dashboard" style={{ padding: "0" }}>
                                                    <div className="row">
                                                        <div
                                                            className="col-12 d-flex justify-content-between align-items-center py-1"
                                                            style={{
                                                                backgroundColor: "#F9FAFB",
                                                                borderRadius: "5px",
                                                                paddingTop: "0.6rem", paddingBottom: "0.6rem"
                                                            }}
                                                        >
                                                            <p className="text-muted mb-0">API Key</p>
                                                            <p className="text-muted mb-0">TOTAL </p>
                                                        </div>
                                                    </div>
                                                    <section className="row pl-0" style={{ paddingRight: "0.6rem" }}>
                                                        <div
                                                            className="col-12 d-flex justify-content-between my-1"
                                                            style={{ borderBottom: "1px solid #eee" }}
                                                        >
                                                            <p>7c3edad6-3abf-11ef-b1d4-02c8a5e042bd</p>
                                                            <span
                                                                className="badge rounded-pill grey-theme-btn  align-self-start"
                                                                style={{ backgroundColor: "#475256" }}
                                                            >
                                                                3
                                                            </span>
                                                        </div>

                                                        <div
                                                            className="col-12 d-flex justify-content-between my-1"
                                                            style={{ borderBottom: "1px solid #eee" }}
                                                        >
                                                            <p>Aedndad6-3abf-11ef-b1d4-042bd02c8a5e</p>
                                                            <span
                                                                className="badge rounded-pill grey-theme-btn  align-self-start"
                                                                style={{ backgroundColor: "#475256" }}
                                                            >
                                                                3
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="col-12 d-flex justify-content-between my-1"
                                                            style={{ borderBottom: "1px solid #eee" }}
                                                        >
                                                            <p>453b3b85-4a9c-11f0-98fc-02c8a5e042bd</p>
                                                            <span
                                                                className="badge rounded-pill grey-theme-btn  align-self-start"
                                                                style={{ backgroundColor: "#475256" }}
                                                            >
                                                                4
                                                            </span>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>


                                        </div>

                                        <div className='row mx-2 mb-1' style={{ alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #dddbdbff", marginTop: "2rem" }}>
                                            <div style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
                                                <span>Showing 1 to 3 of 12 results</span>
                                            </div>

                                            <div style={{ marginTop: "1rem" }}>
                                                <button type="button" class="btn btn-outline-secondary" style={{ padding: "0.4rem 0.8rem 0.4rem 0.8rem", marginRight: "1rem" }}>
                                                    <i class="fa-solid fa-angle-left"></i>
                                                </button>

                                                <button type="button" class="btn btn-outline-secondary" style={{ padding: "0.4rem 0.8rem 0.4rem 0.8rem" }}>
                                                    <i class="fa-solid fa-angle-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}