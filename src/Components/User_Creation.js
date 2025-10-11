import SelectBox from "./Form-Elements/SelectBox";
import { useState, useEffect, useMemo, useRef } from "react";
import '../Pages/CSS/Custom CSS/UserCreation.css'
import { DatePicker } from 'antd';
import InputBox from "./Form-Elements/InputBox";
import SMSUserCreation from "./SMSUserCreation";
import RCSUserCreation from "./RCSUserCreation";
import WABAUserCreation from "./WABAUserCreation";
import VoiceUserCreation from "./VoiceUserCreation";
import EmailUserCreation from "./EmailUserCreation";
import Textarea from "./Form-Elements/Textarea";

export default function User_Creation({ sidebarOpen }) {
    const [usertype, setusertype] = useState("");
    const [accounttype, setaccounttype] = useState("");
    const [enterprise, setenterprise] = useState("");
    const [reseller, setreseller] = useState("");
    const [seller, setseller] = useState("");
    const [selectionOrder, setSelectionOrder] = useState([]);
    const [assignaccounts, setassignaccounts] = useState([]);
    const [status, setstatus] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [AccselectedOptions, setAccSelectedOptions] = useState([]);
    const [UserAccselectedOptions, setUserAccselectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isAccOpen, setIsAccOpen] = useState(false);
    const [isUserAccOpen, setisUserAccOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [is2faenable, setis2faenable] = useState("");
    const [isguiipcheck, setisguiipcheck] = useState("");
    const [isspamfilter,setisspamfilter] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [userstatus, setuserstatus] = useState("Active");
    const [inputwidth, setInputwidth] = useState("21.5%");
    const [DateInputwidth, setDateInputwidth] = useState("");
    const [reportinputwidth, setreportinputwidth] = useState("");
    const [AssignAccountInputwidth, setAssignAccountInputwidth] = useState("");
    const [guiwhitelisetip,setguiwhitelisetip] = useState("");
    const [spamfilterkeyword,setspamfilterkeyword] = useState("");
    const [searchETerm, setESearchTerm] = useState("");
    const [EDropdownVisible, setEDropdownVisible] = useState(false);
    const [isESelecting, setisESelecting] = useState(false);
    const [percentapplicable,setpercentapplicable] = useState("");

    const [searchRTerm, setRSearchTerm] = useState("");
    const [RDropdownVisible, setRDropdownVisible] = useState(false);
    const [isRSelecting, setisRSelecting] = useState(false);

    const [searchSTerm, setSSearchTerm] = useState("");
    const [SDropdownVisible, setSDropdownVisible] = useState(false);
    const [isSSelecting, setisSSelecting] = useState(false);

    const [searchUTerm, setSearchUTerm] = useState("");

    const isDisabled = usertype === "reportuser" || usertype === "accountmanager";

    const dropdownRef = useRef(null);
    const dropdownRefAssign = useRef();
    const dropdownRefAssignRU = useRef();
    const dateWrapperRef = useRef(null);



    const handleSubmit = () => {
        console.log("Submitting with:", selectedOptions);
        // Final form submission logic here
    };

    // Prioritize SMS if included
    const getOrderedOptions = () => {
        let ordered = selectionOrder.filter(opt => selectedOptions.includes(opt));
        if (ordered.includes('SMS')) {
            ordered = ['SMS', ...ordered.filter(opt => opt !== 'SMS')];
        }
        return ordered;
    };

    const orderedOptions = getOrderedOptions();

    const goToNext = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const goToPrevious = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };




    const options = [
        { label: 'SMS', value: 'SMS' },
        { label: 'RCS', value: 'RCS' },
        { label: 'WhatsApp', value: 'WABA' },
        { label: 'Voice', value: 'Voice' },
        { label: 'Email', value: 'Email' }
    ];

    const Accoptions = [

        { label: 'User 1', value: 'User1' },
        { label: 'User 2', value: 'User2' },
        { label: 'User 3', value: 'User3' },
        { label: 'User 4', value: 'User4' },
        { label: 'RCS User 1', value: 'RUser1' },
        { label: 'RCS User 2', value: 'RUser2' },
        { label: 'RCS User 3', value: 'RUser3' },
        { label: 'WABA User 4', value: 'WUser4' },
        { label: 'Voice 1', value: 'VUser1' },
        { label: 'Voice 2', value: 'VUser2' },
        { label: 'Voice 3', value: 'VUser3' },
        { label: 'Voice User 4', value: 'VUser4' },
        { label: 'Voice User 1', value: 'VRUser1' },
        { label: 'Voice User 2', value: 'VRUser2' },
        { label: 'Voice User 3', value: 'VRUser3' },
        { label: 'Voice User 4', value: 'VWUser4' }
    ];

    const backndData = [
        { enterprise: "Netwin", reseller: "", seller: "Net-seller1", user: "DHNSRI" },
        { enterprise: "Lombard", reseller: "Reseller3", user: "Prlbard" },
        { enterprise: "Lombard", reseller: "Reseller1", user: "trlbard" },
        { enterprise: "Universalinfo", reseller: "Reseller2", seller: "Univ-seller1", user: "univ-User1" }
    ]

    const enterprisefilterOptions = useMemo(() => {
        return Array.from(new Set(
            backndData
                .filter(opt => opt.enterprise?.trim()) // Step 1
                .filter(opt => opt.enterprise.toLowerCase().includes(searchETerm.toLowerCase())) // Step 2
                .map(opt => opt.enterprise.trim()) // Step 3
        ));
    }, [searchETerm]);

    const resellerfilterOptions = useMemo(() => {
        return Array.from(new Set(
            backndData
                .filter(opt => opt.reseller?.trim())
                .filter(opt =>
                    opt.reseller.toLowerCase().includes(searchRTerm.toLowerCase()) &&
                    (
                        searchETerm?.trim() === "" ||
                        opt.enterprise?.trim() === searchETerm.trim()
                    )
                )
                .map(opt => opt.reseller.trim())
        ));
    }, [searchRTerm, searchETerm]);

    const sellerfilterOptions = useMemo(() => {
        return Array.from(new Set(
            backndData
                .filter(opt => opt.seller?.trim())
                .filter(opt =>
                    opt.seller.toLowerCase().includes(searchSTerm.toLowerCase()) &&
                    (
                        (enterprise?.trim() === "" || opt.enterprise?.trim() === searchETerm.trim()) &&
                        (reseller?.trim() === "" || opt.reseller?.trim() === searchRTerm.trim())
                    )
                )
                .map(opt => opt.seller.trim())
        ));
    }, [searchSTerm, searchETerm, searchRTerm]);

    const userFilterOptions = useMemo(() => {
        const users = backndData
            .filter(opt => opt.user?.trim()) // Ensure 'user' exists and is not empty
            .filter(opt =>
                opt.user.toLowerCase().includes(searchUTerm.toLowerCase()) && // Filter by user search term
                (
                    (enterprise?.trim() === "" || opt.enterprise?.trim() === searchETerm.trim()) &&
                    (reseller?.trim() === "" || opt.reseller?.trim() === searchRTerm.trim()) &&
                    (seller?.trim() === "" || opt.seller?.trim() === searchSTerm.trim())
                )
            )
            .map(opt => opt.user.trim());

        // Create a unique list and map to { label, value } structure
        return Array.from(new Set(users)).map(user => ({
            label: user,
            value: user
        }));
    }, [searchUTerm, searchETerm, searchRTerm, searchSTerm]);

    // const filteredOptions = backndData.filter(opt =>
    //     opt.enterprise.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const filteredOptions = Accoptions.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const toggleAssignOption = (value) => {
        setAccSelectedOptions(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const toggleUserAssignOption = (value) => {
        setUserAccselectedOptions(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const toggleOption = (value) => {
        setSelectedOptions(prev => {
            const isSelected = prev.includes(value);
            let newSelected;

            if (isSelected) {
                newSelected = prev.filter(v => v !== value);
                setSelectionOrder(order => order.filter(v => v !== value));
            } else {
                newSelected = [...prev, value];
                setSelectionOrder(order => {
                    const without = order.filter(v => v !== value);
                    return [...without, value]; // Add to end
                });
            }

            // Handle SMS logic
            if (prev.includes('SMS') && !newSelected.includes('SMS')) {
                setaccounttype('');
            }

            // Determine correct new index
            const currentValue = orderedOptions[currentIndex];
            const newOrderedOptions = getOrderedOptionsFromSelectionOrder(newSelected); // See below

            if (!newSelected.includes(currentValue)) {
                // Current value removed
                const fallbackIndex = Math.min(currentIndex, newOrderedOptions.length - 1);
                setCurrentIndex(fallbackIndex);
            }

            return newSelected;
        });
    };

    const getOrderedOptionsFromSelectionOrder = (customSelected) => {
        let ordered = selectionOrder.filter(opt => customSelected.includes(opt));
        if (ordered.includes('SMS')) {
            ordered = ['SMS', ...ordered.filter(opt => opt !== 'SMS')];
        }
        return ordered;
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const renderComponent = () => {
        const current = orderedOptions[currentIndex];

        switch (current) {
            case 'SMS':
                // Only render SMSUserCreation if accounttype is 'User' or 'Reseller'
                if (usertype === 'User' || usertype === 'Reseller' || usertype === "Seller") {
                    return <SMSUserCreation accounttype={accounttype} setaccounttype={setaccounttype} usertype={usertype} sidebarOpen={sidebarOpen} />;
                } else {
                    return <div></div>;
                }
            case 'RCS':
                return <RCSUserCreation />;
            case 'WABA':
                return <WABAUserCreation />;
            case 'Voice':
                return <VoiceUserCreation />;
            case "Email":
                return <EmailUserCreation />;
            default:
                return <div></div>;
        }
    };





    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (currentIndex >= orderedOptions.length) {
            setCurrentIndex(prev => Math.max(0, orderedOptions.length - 1));
        } else {
            const currentValue = orderedOptions[currentIndex];
            if (!selectedOptions.includes(currentValue)) {
                // current value is no longer selected, move to next one
                setCurrentIndex(0); // or smart logic: find next still-included one
            }
        }
    }, [selectedOptions, orderedOptions, currentIndex]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRefAssign.current && !dropdownRefAssign.current.contains(event.target)) {
                setIsAccOpen(false);
            }

            if (dropdownRefAssignRU.current && !dropdownRefAssignRU.current.contains(event.target)) {
                setisUserAccOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (usertype === "reportuser" || usertype === "accountmanager") {
            setSelectedOptions([]);
        }

        setEDropdownVisible(false);
        setenterprise("");
        setESearchTerm("");
        setisESelecting(false);

        setRDropdownVisible(false);
        setreseller("");
        setRSearchTerm("");
        setisRSelecting(false);

        setSDropdownVisible(false);
        setseller("");
        setSSearchTerm("");
        setisSSelecting(false);
    }, [usertype]);

    useEffect(() => {
        const updateWidth = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 475) {
                setInputwidth("100%");
                setAssignAccountInputwidth("100%");
                setDateInputwidth("100%");
                setreportinputwidth("100%");
            }

            else if (screenWidth <= 980 && screenWidth > 900) {
                setInputwidth("63%");
                setAssignAccountInputwidth("34%");
                setDateInputwidth("30%");
                setreportinputwidth("32%");
            }
            else if (screenWidth <= 900) {
                setInputwidth("49%");
                setAssignAccountInputwidth("49%");
                setDateInputwidth("49%");
                setreportinputwidth("32%");
            }
            else {
                setInputwidth("33.3%");
                setDateInputwidth("20%");
                setAssignAccountInputwidth("20%");
                setreportinputwidth("32%");
            }
        };

        updateWidth(); // Initial check
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const tagContainerRef = useRef(null);
    const [hideArrow, setHideArrow] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            const container = tagContainerRef.current;
            if (!container) return;
            const isOverflowing = container.scrollWidth > container.clientWidth;
            // Hide arrow if there's not enough space for it
            const arrowWidth = 44; // approx width of arrow icon
            const roomForArrow = container.offsetWidth + arrowWidth <= container.parentElement.offsetWidth;
            setHideArrow(!roomForArrow || isOverflowing);
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [selectedOptions]);

    console.log("SearchETerm:" + searchETerm);
    console.log("enterprise:" + enterprise);

    return (
        <div class="content-body" style={{ fontSize: "0.8rem" }}>
            <div class="row mb-0">
                <div class="col-12 pr-0 pl-0"  >
                    <div class="card mb-0" style={{ boxShadow: "0 0px 12px rgba(8, 70, 243, 0.4)" }} >
                        <div class="card-header">
                            <h6 class="card-title font-weight-bold">USER MANAGEMENT PANEL</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-1" style={{ marginTop: "1.2rem" }}>
                <div class="col-12 pr-0 pl-0 " style={{ minHeight: "100%" }} >
                    <div class="card mb-0" style={{ boxShadow: "0 0px 12px rgba(8, 70, 243, 0.4)" }} >
                        <div class="card-content collapse show">
                            <div className="card-body">
                                <div class="row"
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        // columnGap: "1.7rem",
                                        justifyContent: "space-between",
                                        flex: "0 0 100%",
                                        maxWidth: "100%",
                                        boxSizing: "border-box",
                                        paddingBottom: "0.2rem"
                                    }} >

                                    <SelectBox
                                        label="User Type"
                                        options={[
                                            { label: 'User Creation', value: 'User' },
                                            { label: 'Reseller', value: 'Reseller' },
                                            { label: 'Seller', value: 'Seller' },
                                            { label: 'Reporting User', value: 'reportuser' },
                                            { label: 'Account Manager', value: 'accountmanager' },
                                        ].filter(Boolean)}
                                        value={usertype}
                                        onChange={(e) => setusertype(e.target.value)}
                                        isreq={false}
                                        placeholder="Select User Type"
                                        maxLength={20}
                                        widthPercent="20%"
                                        widthPercent950="34%"
                                        widthPercent900="49%"
                                        sidebarOpen={sidebarOpen}
                                    />

                                    <div style={{ display: "block", marginTop: "0.25rem", width: inputwidth, marginBottom: inputwidth === "100%" ? "0.7rem" : "" }}>
                                        <label style={{ fontSize: "0.9rem" }}>
                                            <strong>Service Type</strong>
                                        </label>

                                        <br />

                                        <div className="multi-select-dropdown" ref={dropdownRef} style={{ width: "100%", marginTop: "0.15rem" }}>


                                            <div className={isDisabled ? "dropdown-header disabled" : "dropdown-header"} onClick={() => {
                                                if (!isDisabled) setIsOpen(!isOpen);

                                            }} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "100%",
                                                gap: "0.25rem",
                                                overflow: "hidden", // prevent container overflow
                                            }} >
                                                {selectedOptions.length > 0 ? (
                                                    <div className="selected-tags"
                                                        ref={tagContainerRef}
                                                        style={{
                                                            overflowX: "auto",
                                                            whiteSpace: "nowrap",
                                                            display: "flex",
                                                            gap: "0.25rem", // Optional: space between tags
                                                            flexWrap: "nowrap"
                                                        }}
                                                        onClick={e => e.stopPropagation()}>
                                                        {selectedOptions.map((value) => {
                                                            const label = options.find(opt => opt.value === value)?.label;
                                                            return (
                                                                <div className="tag" key={value}>
                                                                    {label}
                                                                    <span className="remove-tag" onClick={() => !isDisabled && toggleOption(value)}>×</span>
                                                                </div>
                                                            );
                                                        })}


                                                    </div>
                                                ) : (
                                                    'Select Service Type'
                                                )}
                                                {/* <span className="arrow">
                                                    {isOpen ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                                </span> */}

                                                {!hideArrow && (
                                                    <span
                                                        className="arrow"
                                                        style={{
                                                            flexShrink: 0,
                                                            paddingLeft: "0.25rem",
                                                        }}
                                                    >
                                                        {isOpen ? (
                                                            <i className="fa-solid fa-angle-up"></i>
                                                        ) : (
                                                            <i className="fa-solid fa-angle-down"></i>
                                                        )}
                                                    </span>
                                                )}
                                            </div>


                                            {isOpen && !isDisabled && (
                                                <div className="dropdown-list">
                                                    {options.map(opt => (
                                                        <label key={opt.value} className="dropdown-item">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedOptions.includes(opt.value)}
                                                                onChange={() => toggleOption(opt.value)}
                                                                className="form-check-input"
                                                                disabled={isDisabled}
                                                            />
                                                            <span className="custom-checkbox" />
                                                            {opt.label}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <InputBox
                                        label="User Name"
                                        type="text"
                                        placeholder="User Name"
                                        maxLength={31}
                                        isreq={false}
                                        widthPercent="20%"
                                        widthPercent950="34%" widthPercent900="49%"
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                        sidebarOpen={sidebarOpen}
                                    />

                                   

                                    {(usertype !== "accountmanager" && usertype !== "reportuser" )
                                     ? (
                                        <SelectBox label="Is 2FA Enabled"
                                        options={[
                                            { label: 'Yes', value: 'Yes' },
                                            { label: 'No', value: 'No' }
                                        ]}
                                        value={is2faenable}
                                        onChange={(e) => setis2faenable(e.target.value)}
                                        isreq={false}
                                        placeholder="Select Is 2FA Enabled"
                                        maxLength={10}
                                        widthPercent="20%"
                                        widthPercent950="34%"
                                        widthPercent900="49%"
                                        sidebarOpen={sidebarOpen}
                                    />
                                     ) : (
                                    
                                 <InputBox
                                        label="Password"
                                        type="password"
                                        placeholder="Password"
                                        maxLength={31}
                                        isreq={false}
                                        widthPercent="20%"
                                        widthPercent950="30%"
                                        widthPercent900="49%"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        sidebarOpen={sidebarOpen}
                                        disable={(usertype === "accountmanager" || usertype === "reportuser" || usertype === "") ? false : true}
                                    />
                                ) 
                                    }

                                    <SelectBox
                                        label="Status"
                                        options={[
                                            { label: 'Active', value: 'Active' },
                                            { label: 'InActive', value: 'InActive' }
                                        ]}
                                        value={userstatus}
                                        onChange={(e) => setuserstatus(e.target.value)}
                                        isreq={false}
                                        placeholder=""
                                        maxLength={20}
                                        widthPercent="20%"
                                        widthPercent950="30%"
                                        widthPercent900="49%"
                                        sidebarOpen={sidebarOpen}
                                    />





                                    <InputBox
                                        label="Email ID"
                                        type="text"
                                        placeholder="Email ID"
                                        maxLength={150}
                                        isreq={false}
                                        widthPercent="33.2%"
                                        widthPercent950="34%" widthPercent900="49%"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        sidebarOpen={sidebarOpen}
                                    />





                                    <div style={{
                                        display: "block",
                                        marginTop: "0.3rem",
                                        width: DateInputwidth
                                    }} ref={dateWrapperRef}>
                                        <label style={{ fontSize: "0.9rem" }}><strong>Expiry Date</strong></label>
                                        <br />
                                        <DatePicker
                                            size="middle"
                                            style={{
                                                padding: "0.55rem 1.3rem",
                                                margin: "0",
                                                marginTop: "0.08rem",
                                                border: "1px solid gray",
                                                width: "100%"
                                            }}
                                            getPopupContainer={() => dateWrapperRef.current}
                                        />
                                    </div>

                                    {(usertype !== "accountmanager" && usertype !== "reportuser" )
                                    &&
                                    <SelectBox label="Is GUI IP to Check"
                                        options={[
                                            { label: 'Yes', value: 'Yes' },
                                            { label: 'No', value: 'No' }
                                        ]}
                                        value={isguiipcheck}
                                        onChange={(e) => setisguiipcheck(e.target.value)}
                                        isreq={false}
                                        placeholder="Select Is GUI IP to Check"
                                        maxLength={10}
                                        widthPercent="20%"
                                        widthPercent950="30%"
                                        widthPercent900="49%"
                                        sidebarOpen={sidebarOpen}
                                    />}

                                    {(usertype !== "accountmanager" && usertype !== "reportuser" )
                                    &&
                                     <SelectBox label="Is Percentage Apply"
                                        options={[
                                            { label: 'Yes', value: 'Yes' },
                                            { label: 'No', value: 'No' }
                                        ]}
                                        value={percentapplicable}
                                        onChange={(e) => setpercentapplicable(e.target.value)}
                                        isreq={false}
                                        placeholder="Select Is Percent Applicable"
                                        maxLength={10}
                                        widthPercent="20%"
                                        widthPercent950="30%"
                                        widthPercent900="49%"
                                        sidebarOpen={sidebarOpen}
                                    />}
                                    


                                    <InputBox
                                        label="Phone Number"
                                        type="text"
                                        placeholder="Phone Number"
                                        maxLength={31}
                                        isreq={false}

                                        widthPercent={(usertype === "accountmanager" || usertype === "reportuser") 
                                            ? "20%" : "33.2%"
                                        } 
                                        widthPercent950=
                                        {(usertype === "accountmanager" || usertype === "reportuser") 
                                            ? "30%" : "63%"
                                        } 
                                       widthPercent900=
                                       {(usertype === "accountmanager" || usertype === "reportuser") 
                                            ? "49%" : "49%"
                                        } 
                                       
                                        value={phonenumber}
                                        onChange={(e) => setphonenumber(e.target.value)}
                                        sidebarOpen={sidebarOpen}
                                    />

                                      {(usertype === "accountmanager") &&
                                        <div style={{ display: "block", marginTop: "0.25rem", minWidth: AssignAccountInputwidth, width: "auto" }}>
                                            <label style={{ fontSize: "0.9rem" }}>
                                                <strong>Assign Accounts</strong>
                                            </label>

                                            <div className="multi-select-dropdown-accounts" ref={dropdownRefAssign}>
                                                <div className="dropdown-header" onClick={() => setIsAccOpen(!isAccOpen)}>
                                                    {AccselectedOptions.length > 0 ? (
                                                        <div className="selected-tags" onClick={e => e.stopPropagation()}>
                                                            {AccselectedOptions.map((value) => {
                                                                const label = Accoptions.find(opt => opt.value === value)?.label;
                                                                return (
                                                                    <div className="tag" key={value}>
                                                                        {label}
                                                                        <span className="remove-tag" onClick={() => toggleAssignOption(value)}>×</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        'Select Assign Accounts'
                                                    )}

                                                    <span className="arrow">
                                                        {isAccOpen ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                                    </span>
                                                </div>

                                                {isAccOpen && (
                                                    <div className="dropdown-list">
                                                        <input
                                                            type="text"
                                                            placeholder="Search Enterprise accounts..."
                                                            className="dropdown-search"
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                                                        />


                                                        {filteredOptions.map(opt => (
                                                            <label key={opt} className="dropdown-item">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={AccselectedOptions.includes(opt.value)}
                                                                    onChange={() => toggleAssignOption(opt.value)}
                                                                    className="form-check-input"
                                                                />
                                                                <span className="custom-checkbox" />
                                                                {opt.label}
                                                            </label>
                                                        ))}
                                                        {/* {filteredOptions.map(opt => {
                                                                    const label = opt.enterprise;
                                                                    const value = opt.enterprise; // Or use another unique field

                                                                    return (
                                                                        <label key={value} className="dropdown-item">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={AccselectedOptions.includes(value)}
                                                                                onChange={() => toggleAssignOption(value)}
                                                                                className="form-check-input"
                                                                            />
                                                                            <span className="custom-checkbox" />
                                                                            {label}
                                                                        </label>
                                                                    );
                                                                })} */}
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    }

                                    

                                    {(usertype !== "accountmanager" && usertype !== "reportuser" )
                                    &&
                                     <SelectBox label="Is SPAM Filteration"
                                        options={[
                                            { label: 'Yes', value: 'Yes' },
                                            { label: 'No', value: 'No' }
                                        ]}
                                        value={isspamfilter}
                                        onChange={(e) => setisspamfilter(e.target.value)}
                                        isreq={false}
                                        placeholder="Select Is SPAM Filter Enabled"
                                        maxLength={10}
                                        widthPercent="20%"
                                        widthPercent950="30%"
                                        widthPercent900="49%"
                                        sidebarOpen={sidebarOpen}
                                    />
}

                                    <div style={{width:"20%"}}></div>

                                     {isguiipcheck === "Yes" && (usertype !== "accountmanager" && usertype !== "reportuser" ) &&  (
                                         <Textarea
                                                                label="Whiteliset IPs"
                                                                placeholder="Whitelist IPs"
                                                                value={guiwhitelisetip}
                                                                onChange={(e) => setguiwhitelisetip(e.target.value)}
                                                                maxLength={2000}
                                                                rows='1'
                                                                inwidth = "101%"
                                                               
                                    
                                                            />
                                    )}

                                    {isspamfilter === "Yes" && (usertype !== "accountmanager" && usertype !== "reportuser" ) &&  (
                                         <Textarea
                                                                label="SPAM Filter Keywords"
                                                                placeholder="SPAM Filter Keywords"
                                                                value={spamfilterkeyword}
                                                                onChange={(e) => setspamfilterkeyword(e.target.value)}
                                                                maxLength={2000}
                                                                rows='1'
                                                                inwidth = "101%"
                                                               
                                    
                                                            />
                                    )}

                                    
                                   



                                    

                                   

                                  





                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" style={{ marginTop: selectedOptions.length > 0 || usertype === "reportuser" ? "1.2rem" : "0rem", marginBottom: usertype === "reportuser" ? "0.5rem" : "0rem" }}>
                <div class="col-12 pr-0 pl-0"  >
                    <div class="card " style={{ boxShadow: "0 0px 12px rgba(8, 70, 243, 0.4)" }} >
                        <div class="card-content collapse show ">
                            <div className="card-body p-0 m-0 ">
                                {usertype === "reportuser" && (
                                    <>
                                        <div className='row'  >
                                            <div className="card-header" style={{ borderTop: "1px solid rgba(0, 0, 0, .06)", backgroundColor: "#3BAFDA", width: "100%", marginBottom: "0.6rem" }}>
                                                <h6 className="card-title" style={{ fontWeight: "600" }}>Assign Accounts</h6>
                                            </div>
                                        </div>

                                        <div className='row mb-1 px-2'
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                // columnGap: "1.7rem",
                                                justifyContent: "space-between",
                                                flex: "0 0 100%",
                                                maxWidth: "100%",
                                                boxSizing: "border-box",
                                                paddingBottom: "0.2rem"
                                            }}>
                                            <div style={{ position: "relative", width: reportinputwidth, marginTop: "0.4rem" }}>
                                                <strong> <label style={{ fontSize: "0.9rem" }}>Select Enterprise</label></strong>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Select Enterprise"
                                                    value={searchETerm}
                                                    style={{ fontSize: "0.9rem" }}
                                                    onFocus={() => setEDropdownVisible(true)} // Show dropdown on focus
                                                    onBlur={() => {
                                                        if (!isESelecting) {
                                                            setEDropdownVisible(false); // Only hide if not selecting
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        setESearchTerm(e.target.value)
                                                        setenterprise(e.target.value)
                                                    }}
                                                />

                                                {EDropdownVisible && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "100%", // Position dropdown below the input
                                                            width: "100%",
                                                            maxHeight: "150px",
                                                            overflowY: "auto",
                                                            border: "1px solid #ccc",
                                                            borderRadius: "5px",
                                                            backgroundColor: "white",
                                                            zIndex: 1000,
                                                        }}
                                                        onMouseDown={() => setisESelecting(true)} // Mark as selecting
                                                        onMouseUp={() => setisESelecting(false)} // Reset after selecting
                                                    >
                                                        {enterprisefilterOptions?.length > 0 ? (
                                                            enterprisefilterOptions.map((tid, index) => (
                                                                <div
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setenterprise(tid); // Update templateid
                                                                        setESearchTerm(tid); // Update searchTerm to reflect selected value
                                                                        setEDropdownVisible(false); // Hide dropdown after selection
                                                                    }}
                                                                    style={{
                                                                        padding: "5px",
                                                                        cursor: "pointer",
                                                                        fontSize: "0.9rem",
                                                                        backgroundColor:
                                                                            enterprise === tid ? "#f0f0f0" : "white",
                                                                        borderRadius: "3px",
                                                                    }}
                                                                >
                                                                    {tid}
                                                                </div>
                                                            ))
                                                        )
                                                            : (
                                                                <div style={{ padding: "8px 5px" }}>No Enterprise Found</div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ position: "relative", width: reportinputwidth, marginTop: reportinputwidth === "100%" ? "1rem" : "0.4rem" }}>
                                                <strong> <label style={{ fontSize: "0.9rem" }}>Select Re-Seller</label></strong>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Select Reseller"
                                                    value={searchRTerm}
                                                    style={{ fontSize: "0.9rem" }}
                                                    onFocus={() => setRDropdownVisible(true)} // Show dropdown on focus
                                                    onBlur={() => {
                                                        if (!isRSelecting) {
                                                            setRDropdownVisible(false); // Only hide if not selecting
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        setRSearchTerm(e.target.value);
                                                        setreseller(e.target.value);
                                                    }}
                                                />

                                                {RDropdownVisible && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "100%", // Position dropdown below the input
                                                            width: "100%",
                                                            maxHeight: "150px",
                                                            overflowY: "auto",
                                                            border: "1px solid #ccc",
                                                            borderRadius: "5px",
                                                            backgroundColor: "white",
                                                            zIndex: 1000,
                                                        }}
                                                        onMouseDown={() => setisRSelecting(true)} // Mark as selecting
                                                        onMouseUp={() => setisRSelecting(false)} // Reset after selecting
                                                    >
                                                        {resellerfilterOptions?.length > 0 ? (
                                                            resellerfilterOptions.map((tid, index) => (
                                                                <div
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setreseller(tid); // Update templateid
                                                                        setRSearchTerm(tid); // Update searchTerm to reflect selected value
                                                                        setRDropdownVisible(false); // Hide dropdown after selection
                                                                    }}
                                                                    style={{
                                                                        padding: "5px",
                                                                        cursor: "pointer",
                                                                        fontSize: "0.9rem",
                                                                        backgroundColor:
                                                                            reseller === tid ? "#f0f0f0" : "white",
                                                                        borderRadius: "3px",
                                                                    }}
                                                                >
                                                                    {tid}
                                                                </div>
                                                            ))
                                                        )
                                                            : (
                                                                <div style={{ padding: "8px 5px" }}>No Re Seller Found</div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ position: "relative", width: reportinputwidth, marginTop: reportinputwidth === "100%" ? "1rem" : "0.4rem" }}>
                                                <strong> <label style={{ fontSize: "0.9rem" }}>Select Seller</label></strong>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Select Seller"
                                                    value={searchSTerm}
                                                    style={{ fontSize: "0.9rem" }}
                                                    onFocus={() => setSDropdownVisible(true)} // Show dropdown on focus
                                                    onBlur={() => {
                                                        if (!isSSelecting) {
                                                            setSDropdownVisible(false); // Only hide if not selecting
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        setSSearchTerm(e.target.value)
                                                        setseller(e.target.value)
                                                    }}
                                                />

                                                {SDropdownVisible && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "100%", // Position dropdown below the input
                                                            width: "100%",
                                                            maxHeight: "150px",
                                                            overflowY: "auto",
                                                            border: "1px solid #ccc",
                                                            borderRadius: "5px",
                                                            backgroundColor: "white",
                                                            zIndex: 1000,
                                                        }}
                                                        onMouseDown={() => setisSSelecting(true)} // Mark as selecting
                                                        onMouseUp={() => setisSSelecting(false)} // Reset after selecting
                                                    >
                                                        {sellerfilterOptions?.length > 0 ? (
                                                            sellerfilterOptions.map((tid, index) => (
                                                                <div
                                                                    key={index}

                                                                    onClick={() => {
                                                                        setseller(tid); // Update templateid
                                                                        setSSearchTerm(tid); // Update searchTerm to reflect selected value
                                                                        setSDropdownVisible(false); // Hide dropdown after selection
                                                                    }}
                                                                    style={{
                                                                        padding: "8px 5px",
                                                                        cursor: "pointer",
                                                                        fontSize: "0.9rem",
                                                                        backgroundColor:
                                                                            seller === tid ? "#f0f0f0" : "white",
                                                                        borderRadius: "3px",
                                                                    }}
                                                                >
                                                                    {tid}
                                                                </div>
                                                            ))
                                                        )
                                                            : (
                                                                <div style={{ padding: "8px 5px" }}>No Seller Found</div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ position: "relative", minWidth: reportinputwidth, marginTop: "1.2rem", width: "auto", maxWidth: "98%" }}>
                                                <strong> <label style={{ fontSize: "0.9rem" }}>Select Assign Accounts</label></strong>
                                                <div className="multi-select-dropdown-accounts" ref={dropdownRefAssignRU}>
                                                    <div className="dropdown-header" onClick={() => setisUserAccOpen(!isUserAccOpen)}>
                                                        {UserAccselectedOptions.length > 0 ? (
                                                            <div className="selected-tags" onClick={e => e.stopPropagation()}>
                                                                {UserAccselectedOptions.map((value) => {
                                                                    const label = UserAccselectedOptions.find(opt => opt.value === value)?.label || value;
                                                                    return (
                                                                        <div className="tag" key={value}>
                                                                            {label}
                                                                            <span className="remove-tag" onClick={() => toggleUserAssignOption(value)}>×</span>
                                                                        </div>
                                                                    );
                                                                })}

                                                            </div>
                                                        ) : (
                                                            'Select Assign Accounts'
                                                        )}

                                                        <span className="arrow">
                                                            {isUserAccOpen ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                                        </span>
                                                    </div>

                                                    {isUserAccOpen && (
                                                        <div className="dropdown-list">
                                                            <input
                                                                type="text"
                                                                placeholder="Search User accounts..."
                                                                className="dropdown-search"
                                                                value={searchUTerm}
                                                                onChange={(e) => setSearchUTerm(e.target.value)}
                                                                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                                                            />

                                                            {userFilterOptions.length > 0 ? (
                                                                userFilterOptions.map(opt => (
                                                                    <label key={opt.value} className="dropdown-item">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={UserAccselectedOptions.includes(opt.value)}
                                                                            onChange={() => toggleUserAssignOption(opt.value)}
                                                                            className="form-check-input"
                                                                        />
                                                                        <span className="custom-checkbox" />
                                                                        {opt.label}
                                                                    </label>
                                                                ))
                                                            ) : (
                                                                <div style={{ padding: "6px 5px", paddingTop: "2px" }}>No User Account Found</div>
                                                            )}



                                                        </div>


                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                    </>)}

                                {renderComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                position: "sticky",
                bottom: "0",
                textAlign: "right",
                paddingRight: "0.8rem",
                zIndex: 10,

                marginTop: (usertype === 'Reseller' || usertype === 'User' || usertype === "Seller") ? '0.4rem' : '0',
            }}>
                {currentIndex < selectedOptions.length - 1 ? (
                    <button className="btn btn-info  btn-glow mr-1 " type="button" onClick={goToNext}  >
                        Next
                        <i class="fa-solid fa-share-from-square" style={{ marginLeft: "0.5rem" }}></i>
                    </button>
                ) : (
                    <button className="btn btn-info  btn-glow mr-1 " type="button" >
                        Submit <i class="fa-solid fa-paper-plane" style={{ marginLeft: "0.1rem" }}></i>
                    </button>
                )}


                {selectedOptions.length > 1 && currentIndex !== 0 && <button className="btn btn-warning btn-glow box-shadow-4 mr-1" type="button" onClick={goToPrevious}  >
                    Back
                    <i class="fa-solid fa-reply-all" style={{ marginLeft: "0.5rem" }}></i>
                </button>}
            </div>
        </div>
    );
}