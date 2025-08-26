import { useState, useEffect } from 'react';
import '../Pages/CSS/Custom CSS/UserCreation.css'
import SelectBox from './Form-Elements/SelectBox';
import InputBox from './Form-Elements/InputBox';
import Textarea from './Form-Elements/Textarea';

export default function SMSUserCreation({ accounttype, setaccounttype, sidebarOpen, usertype }) {
    const [enterprise, setenterprise] = useState("");
    const [department, setdepartment] = useState("");
    const [billingon, setbillingon] = useState("");
    const [sendertype, setsendertype] = useState("");
    const [priority, setpriority] = useState("");
    const [traffictype, settraffictype] = useState("");
    const [accmanager, setaccmanager] = useState("");
    const [isotp, setisotp] = useState("");
    const [billingtype, setbillingtype] = useState("");
    const [smsservice, setsmsservice] = useState("");
    const [smppcharset, setsmppcharset] = useState("");
    const [tx, settx] = useState("");
    const [rx, setrx] = useState("");
    const [trx, settrx] = useState("");
    const [tm1_id, settm1_id] = useState("");
    const [tm2_id, settm2_id] = useState("");
    const [td_id, settd_id] = useState("");
    const [teleid, setteleID] = useState("");
    const [smpptps, setsmpptps] = useState("");
    const [webtps, setwebtps] = useState("");
    const [apitps, setapitps] = useState("");
    const [smppdroute, setsmppdroute] = useState("");
    const [webdroute, setwebdroute] = useState("");
    const [apidroute, setapidroute] = useState("");
    const [dlrurltype, setdlrurltype] = useState("");
    const [dlrpushurl, setdlrpushurl] = useState("");
    const [isipcheck, setisipcheck] = useState("");
    const [iswebipcheck, setwebisipcheck] = useState("");
    const [smppisipcheck, setsmppisipcheck] = useState("");
    const [apiwhitelisetip, setapiwhitelisetip] = useState("");
    const [webwhitelisetip, setwebwhitelisetip] = useState("");
    const [smppwhitelisetip, setsmppwhitelisetip] = useState("");
    const [dlrbody, setdlrbody] = useState("");
    const [inputwidth, setInputwidth] = useState("");

    useEffect(() => {
        const updateWidth = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 475) {
                setInputwidth("100%");
            }

            else if (screenWidth <= 980 && screenWidth > 900) {
                setInputwidth("32%");
            }
            else if (screenWidth <= 900) {
                setInputwidth("49%");
            }
            else {
                setInputwidth("23%");
            }
        };

        updateWidth(); // Initial check
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const resetAccountFunction = () =>{
        setsmppcharset("");
        settx("");
        setrx("");
        settrx("");
        setsmppdroute("");
        setsmppisipcheck("");
        setsmpptps("");
        setsmppwhitelisetip("");
        setapidroute("");
        setapitps("");
        setapiwhitelisetip("");
        setdlrbody("");
        setdlrpushurl("");
        setdlrurltype("");
        setisipcheck("");
        setwebdroute("");
        setwebisipcheck("");
        setwebtps("");
        setwebwhitelisetip("");
      
    };

    const resetUserTypeFunction = () =>{
        setaccounttype("");
        setenterprise("");
        setdepartment("");
        setaccmanager("");
        setbillingon("");
        setbillingtype("");
        setisotp("");
        setpriority("");
        setsendertype("");
        settd_id("");
        setteleID("");
        settm1_id("");
        settm2_id("");
    };

    useEffect(()=>{
        resetAccountFunction();
    },[accounttype])

    useEffect(()=>{
        resetUserTypeFunction();
    },[usertype])


    return (
        <>
            <div className="row p-0 mb-0" style={{ display: "flex", flexWrap: "wrap", columnGap: "1.7rem", justifyContent: "flex-start" }} >
                <div className="card-header" style={{ borderTop: "1px solid rgba(0, 0, 0, .06)", backgroundColor: "#3BAFDA", width: "100%" }}>
                    <h6 className="card-title" style={{ fontWeight: "600" }}>SMS</h6>
                </div>
            </div>

            <div class="row px-2 py-1"
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
                <SelectBox label="Choose Enterprise"
                    options={[]}
                    value={enterprise}
                    onChange={(e) => setenterprise(e.target.value)}
                    isreq={false}
                    placeholder="Choose Enterprise"
                    maxLength={50}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />

                <SelectBox label="Choose Department"
                    options={[]}
                    value={department}
                    onChange={(e) => setdepartment(e.target.value)}
                    isreq={false}
                    placeholder="Choose Department"
                    maxLength={25}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />

                {usertype === "User" && (<SelectBox label="Account Type"
                    options={[
                        { label: 'SMPP', value: 'SMPP' },
                        { label: 'Web', value: 'Web' },
                        { label: 'API', value: 'API' }
                    ]}
                    value={accounttype}
                    onChange={(e) => setaccounttype(e.target.value)}
                    isreq={false}
                    placeholder=""
                    maxLength={5}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />)}

                <SelectBox label="Credit Deduction On"
                    options={[
                        { label: 'Submission', value: 'Submission' },
                        { label: 'Delivery', value: 'Delivery' }
                    ]}
                    value={billingon}
                    onChange={(e) => setbillingon(e.target.value)}
                    isreq={false}
                    placeholder="Select Credit Deduction"
                    maxLength={25}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />

                {usertype === "User" && <>
                    <SelectBox label="Sender Type"
                        options={[
                            { label: 'Static', value: 'Static' },
                            { label: 'Dynamic', value: 'Dynamic' }
                        ]}
                        value={sendertype}
                        onChange={(e) => setsendertype(e.target.value)}
                        isreq={false}
                        placeholder=""
                        maxLength={10}
                        widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                        sidebarOpen={sidebarOpen}
                    />

                    <SelectBox label="Priority"
                        options={[
                            { label: 'High', value: 'High' },
                            { label: 'Medium', value: 'Medium' },
                            { label: 'Low', value: 'Low' }
                        ]}
                        value={priority}
                        onChange={(e) => setpriority(e.target.value)}
                        isreq={false}
                        placeholder=""
                        maxLength={10}
                        widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                        sidebarOpen={sidebarOpen}
                    />
                </>}



                <SelectBox label="Auth OTP Required"
                    options={[
                        { label: 'Yes', value: 'Yes' },
                        { label: 'No', value: 'No' }
                    ]}
                    value={isotp}
                    onChange={(e) => setisotp(e.target.value)}
                    isreq={false}
                    placeholder="Select Is OTP Required"
                    maxLength={10}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />

                <SelectBox label="SMS Service"
                    options={[
                        { label: 'Domestic', value: 'Domestic' },
                        { label: 'International', value: 'International' },
                        { label: 'Both ', value: 'Both' }
                    ]}
                    value={smsservice}
                    onChange={(e) => setsmsservice(e.target.value)}
                    isreq={false}
                    placeholder=""
                    maxLength={15}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />

                {usertype === "User" && (<SelectBox
                    label="SMS Traffic Type"
                    options={[
                        { label: 'OTP', value: 'OTP' },
                        { label: 'Promotional', value: 'Promo' },
                        { label: 'Transactional', value: 'Trans' },
                        { label: 'Promo + Trans', value: 'promo_trans' }
                    ]}
                    value={traffictype}
                    onChange={(e) => settraffictype(e.target.value)}
                    isreq={false}
                    placeholder=""
                    maxLength={15}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />)}


                <SelectBox
                    label="Account Manager"
                    options={[
                    ]}
                    value={accmanager}
                    onChange={(e) => setaccmanager(e.target.value)}
                    isreq={false}
                    placeholder=""
                    maxLength={40}
                    widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />

                {usertype === "User" && <>
                    <InputBox
                        label="TM1_ID"
                        type="text"
                        placeholder="Enter TM1_ID"
                        maxLength={32}
                        isreq={false}
                        widthPercent="23%"
                        widthPercent950="32%" widthPercent900="49%"
                        value={tm1_id}
                        onChange={(e) => settm1_id(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />

                    <InputBox
                        label="TM2_ID"
                        type="text"
                        placeholder="Enter TM2_ID"
                        maxLength={32}
                        isreq={false}
                        widthPercent="23%"
                        widthPercent950="32%" widthPercent900="49%"
                        value={tm2_id}
                        onChange={(e) => settm2_id(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />

                    <InputBox
                        label="TD_ID"
                        type="text"
                        placeholder="Enter TD_ID"
                        maxLength={32}
                        isreq={false}
                        widthPercent="23%"
                        widthPercent950="32%" widthPercent900="49%"
                        value={td_id}
                        onChange={(e) => settd_id(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />
                </>}

                {usertype !== "User" && (
                    <InputBox
                        label="Telemarketer ID"
                        type="text"
                        placeholder="Enter Telemarketer ID"
                        maxLength={32}
                        isreq={false}
                        widthPercent="23%"
                        widthPercent950="32%" widthPercent900="49%"
                        value={teleid}
                        onChange={(e) => setteleID(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />
                )}


                <SelectBox
                    label="Billing Type"
                    options={[
                        { label: 'Prepaid', value: 'Prepaid' },
                        { label: 'Postpaid', value: 'Postpaid' }
                    ]}
                    value={billingtype}
                    onChange={(e) => setbillingtype(e.target.value)}
                    isreq={false}
                    placeholder="Select Billing Type"
                    maxLength={25}
                    widthPercent="23%"
                    widthPercent950="32%" widthPercent900="49%"
                    sidebarOpen={sidebarOpen}
                />

                <div style={{ width: inputwidth }}></div>
                <div style={{ width: inputwidth }}></div>




            </div>

            {usertype === "User" && accounttype === "SMPP" && <>
                <div className="card-header mx-1 mb-1" style={{ borderTop: "1px solid rgba(0, 0, 0, .06)", backgroundColor: "#e8fc34" }}>
                    <h6 className="card-title" style={{ fontWeight: "600" }}>SMPP</h6>
                </div>

                <div className='card-body p-0 mb-2' style={{ marginLeft: "0.7rem" }}>
                    <div class="row px-1 py-0"
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
                        <SelectBox label="SMPP Charset"
                            options={[
                                { label: 'ASCII', value: 'ASCII' },
                                { label: 'GSM', value: 'GSM' }
                            ]}
                            value={smppcharset}
                            onChange={(e) => setsmppcharset(e.target.value)}
                            isreq={false}
                            placeholder=""
                            maxLength={7}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                        <SelectBox
                            label="Tx"
                            options={Array.from({ length: 20 }, (_, i) => ({
                                label: `${i + 1}`,
                                value: `${i + 1}`
                            }))}
                            value={tx}
                            onChange={(e) => settx(e.target.value)}
                            isreq={false}
                            placeholder="Select Tx"
                            maxLength={5}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                            disabled={trx !== "" ? true : false}
                        />

                        <SelectBox
                            label="Rx"
                            options={Array.from({ length: 20 }, (_, i) => ({
                                label: `${i + 1}`,
                                value: `${i + 1}`
                            }))}
                            value={rx}
                            onChange={(e) => setrx(e.target.value)}
                            isreq={false}
                            placeholder="Select Rx"
                            maxLength={5}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                            disabled={trx !== "" ? true : false}
                        />


                        <SelectBox
                            label="TRx"
                            options={Array.from({ length: 20 }, (_, i) => ({
                                label: `${i + 1}`,
                                value: `${i + 1}`
                            }))}
                            value={trx}
                            onChange={(e) => settrx(e.target.value)}
                            isreq={false}
                            placeholder="Select TRx"
                            maxLength={5}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                            disabled={(tx !== "" || rx !== "") ? true : false}
                        />

                        <SelectBox
                            label="Is IP To Check"
                            options={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' }
                            ]}
                            value={smppisipcheck}
                            onChange={(e) => setsmppisipcheck(e.target.value)}
                            isreq={false}
                            placeholder="Is IP to Check "
                            maxLength={5}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                        <SelectBox label="SMPP Default Route"
                            options={[
                                { label: 'Option 1', value: 'Option 1' },
                                { label: 'Option 2', value: 'Option 2' }
                            ]}
                            value={smppdroute}
                            onChange={(e) => setsmppdroute(e.target.value)}
                            isreq={false}
                            placeholder=""
                            maxLength={7}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                        <InputBox
                            label="TPS"
                            type="text"
                            placeholder="Enter TPS"
                            maxLength={19}
                            isreq={false}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            value={smpptps}
                            onChange={(e) => setsmpptps(e.target.value)}
                            sidebarOpen={sidebarOpen}
                        />

                        <div style={{ width: inputwidth }}></div>
                        <Textarea
                            label="Whiteliset IPs"
                            placeholder="Whitelist IPs"
                            value={smppwhitelisetip}
                            onChange={(e) => setsmppwhitelisetip(e.target.value)}
                            maxLength={2000}
                            rows='1'
                            disable={smppisipcheck === "No" ? true : false}

                        />
                    </div>
                </div>
            </>}

            {usertype === "User" && accounttype === "Web" && <>
                <div className="card-header mx-1 mb-1" style={{ borderTop: "1px solid rgba(0, 0, 0, .06)", backgroundColor: "#e8fc34" }}>
                    <h6 className="card-title" style={{ fontWeight: "600" }}>Web</h6>
                </div>

                <div className='card-body p-0 mb-2' style={{ marginLeft: "0.7rem" }}>
                    <div class="row px-1 py-0"
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
                             <InputBox
                                label="TPS"
                                type="text"
                                placeholder="Enter TPS"
                                maxLength={19}
                                isreq={false}
                                 widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                                value={webtps}
                                onChange={(e) => setwebtps(e.target.value)}
                                sidebarOpen={sidebarOpen}
                            />

                            <SelectBox label="Web Default Route"
                            options={[
                                { label: 'Option 1', value: 'Option 1' },
                                { label: 'Option 2', value: 'Option 2' }
                            ]}
                            value={webdroute}
                            onChange={(e) => setwebdroute(e.target.value)}
                            isreq={false}
                            placeholder=""
                            maxLength={7}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                        <SelectBox
                            label="Is IP To Check"
                            options={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' }
                            ]}
                            value={iswebipcheck}
                            onChange={(e) => setwebisipcheck(e.target.value)}
                            isreq={false}
                            placeholder="Is IP to Check "
                            maxLength={5}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                        <div style={{width:inputwidth}}></div>
                        <Textarea
                            label="Whiteliset IPs"
                            placeholder="Whitelist IPs"
                            value={webwhitelisetip}
                            onChange={(e) => setwebwhitelisetip(e.target.value)}
                            maxLength={2000}
                            rows='1'
                            disable={iswebipcheck === "No" ? true : false}

                        />
                    </div>
                </div>
            </>}

            {usertype === "User" && accounttype === "API" && <>
                <div className="card-header mx-1 mb-1" style={{ borderTop: "1px solid rgba(0, 0, 0, .06)", backgroundColor: "#e8fc34" }}>
                    <h6 className="card-title" style={{ fontWeight: "600" }}>API</h6>
                </div>

                <div className='card-body p-0 mb-2' style={{ marginLeft: "0.7rem" }}>
                    <div class="row px-1 py-0"
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
                            <SelectBox
                            label="DLR URL Method Type"
                            options={[
                                { label: 'Get', value: 'Get' },
                                { label: 'Post', value: 'Post' }
                            ]}
                            value={dlrurltype}
                            onChange={(e) => setdlrurltype(e.target.value)}
                            isreq={false}
                            placeholder="Select URL Type"
                            maxLength={5}
                             widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                        <SelectBox label="API Default Route"
                            options={[
                                { label: 'Option 1', value: 'Option 1' },
                                { label: 'Option 2', value: 'Option 2' }
                            ]}
                            value={apidroute}
                            onChange={(e) => setapidroute(e.target.value)}
                            isreq={false}
                            placeholder=""
                            maxLength={7}
                             widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                         <InputBox
                                label="TPS"
                                type="text"
                                placeholder="Enter TPS"
                                maxLength={19}
                                isreq={false}
                                 widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                                value={apitps}
                                onChange={(e) => setapitps(e.target.value)}
                                sidebarOpen={sidebarOpen}
                            />

                             <SelectBox
                            label="Is IP To Check"
                            options={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' }
                            ]}
                            value={isipcheck}
                            onChange={(e) => setisipcheck(e.target.value)}
                            isreq={false}
                            placeholder="Is IP to Check "
                            maxLength={5}
                            widthPercent="23%" widthPercent950="32%" widthPercent900="49%"
                            sidebarOpen={sidebarOpen}
                        />

                        <Textarea
                            label="Whiteliset IPs"
                            placeholder="Whitelist IPs"
                            value={apiwhitelisetip}
                            onChange={(e) => setapiwhitelisetip(e.target.value)}
                            maxLength={2000}
                            rows='1'
                            disable={isipcheck === "No" ? true : false}

                        />

                        <Textarea
                            label="DLR Push URL"
                            placeholder="Enter DLR URL"
                            value={dlrpushurl}
                            onChange={(e) => setdlrpushurl(e.target.value)}
                            maxLength={2000}
                            rows='1'
                        />

                        {dlrurltype === "Post" && <Textarea
                            label="DLR Body"
                            placeholder="Enter DLR Body"
                            value={dlrbody}
                            onChange={(e) => setdlrbody(e.target.value)}
                            maxLength={2000}
                            col='12'
                        />}
                        </div>
                </div>
            </>}






        </>);
}