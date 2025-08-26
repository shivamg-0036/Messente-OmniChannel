import { React, useState, useEffect } from 'react'
import { DatePicker } from 'antd';
import InputBox from './Form-Elements/InputBox';
import Textarea from './Form-Elements/Textarea';
import RadioButton from './Form-Elements/RadioButton';
import SelectBox from './Form-Elements/SelectBox';
import UploadFileInput from './UploadFileInput';


export default function SMSCampaign(
    { senderid, setsenderid, dynamicsenderid, setdynamicsenderid, uploadsenderid, setuploadsenderid, groupsenderid, setgroupsenderid
        , dynmaicmsgtext, setdynamicmsgtext, tabname, settabname, quickmsgtext, setquickmsgtext, uploadmsgtext, setuploadmsgtext, setgroupmsgtext, groupmsgtext
        , sidebarOpen
    }
) {
    const [campaignname, setcampaignname] = useState("");
    const [mobilearray, setmobilearray] = useState([]);
    const [templatename, settemplatename] = useState("");
    const [msgtext, setmsgtext] = useState("");
    const [fileName, setFileName] = useState("");
    const [mobilelist, setmobilelist] = useState("");
    const [columnlist, setcolumnlist] = useState("");
    const [groupname, setgroupname] = useState("");
    const [group, setgroup] = useState("");
    const [domain, setdomain] = useState("");
    const [callbackurl, setcallbackurl] = useState("");
    const [isshorturl, setisshorturl] = useState("No");
    const [filename, setfilename] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [dynamictemplatename, setdynamictemplatename] = useState("");
    const [isdynamicshorturl, setisdynamicshorturl] = useState("No");
    const [dynamicallbackurl, setdynamiccallbackurl] = useState("");
    const [dynamicdomain, setdynamicdomain] = useState("");
    const [isschedulemsg, setisschedulemsg] = useState("No");
    const [uploadcallbackurl, setuploadcallbackurl] = useState("");
    const [uploaddomain, setuploaddomain] = useState("");
    const [isuploadshorturl, setisuploadshorturl] = useState("No");
    const [uploadtemplatename, setuploadtemplatename] = useState("");
    const [groupcallbackurl, setgroupcallbackurl] = useState("");
    const [groupdomain, setgroupdomain] = useState("");
    const [isgroupshorturl, setisgroupshorturl] = useState("No");
    const [grouptemplatename, setgrouptemplatename] = useState("");
    const [isgroupschedulemsg, setisgroupschedulemsg] = useState("No");
    const [scheduletimes, setscheduletimes] = useState("");
    const [isuploadschedulemsg, setisuploadschedulemsg] = useState("No");
    const [uploadscheduletimes, setuploadscheduletimes] = useState("");
    const [groupscheduletimes, setgroupscheduletimes] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [inputwidth, setInputwidth] = useState("");

    // Track screen resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const updateWidth = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 980 && screenWidth > 900) {
                setInputwidth("35.3%");
            }

            else if (screenWidth <= 900) {
                setInputwidth("99%");
            }


            else {
                setInputwidth("44%");
            }
        };

        updateWidth(); // Initial check
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);


    const handleFileSelect = (file) => {
        setSelectedFile(file);
        // Do something with the selected file
        if (file) {
            const fname = file.name;
            setfilename(fname);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("");
        }
    };

    const { RangePicker } = DatePicker;

    const handletab = (name) => {
        settabname(name);
    };

    const GSM_7_BASIC =
        '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞ !"#¤%&\'()*+,-./0123456789:;<=>?' +
        '¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';

    const GSM_7_EXTENDED = '^{}\\[~]|€';

    // Function to strip placeholders like {#var#}
    function stripPlaceholders(text) {
        return text.replace(/\{#.*?#\}/g, '');
    }

    // Check if char is GSM-7 compatible
    function isGsm7Char(char) {
        return GSM_7_BASIC.includes(char) || GSM_7_EXTENDED.includes(char);
    }

    // Check if whole message is GSM-7 compatible
    function isGsm7Message(text) {
        for (let i = 0; i < text.length; i++) {
            if (!isGsm7Char(text[i])) {
                return false;
            }
        }
        return true;
    }

    // Count characters in GSM-7 with extended chars counted as 2
    function countGsm7Length(text) {
        let length = 0;
        for (let i = 0; i < text.length; i++) {
            if (GSM_7_EXTENDED.includes(text[i])) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }

    // Calculate SMS details based on current message
    function calculateSmsDetails(text) {
        const cleanedText = stripPlaceholders(text);
        const isGsm7 = isGsm7Message(cleanedText);

        let charCount, charsPerPart, multipartCharsPerPart;

        if (isGsm7) {
            charCount = countGsm7Length(cleanedText);
            charsPerPart = 160;
            multipartCharsPerPart = 153;
        } else {
            charCount = cleanedText.length;
            charsPerPart = 70;
            multipartCharsPerPart = 67;
        }

        const messageParts = charCount <= charsPerPart ? 1 : Math.ceil(charCount / multipartCharsPerPart);

        return {
            charCount,
            encoding: isGsm7 ? 'Plain Text' : 'Unicode',
            messageParts,
            smsCredits: messageParts,
        };
    }

    // Run calculation on current message text
    const messageMap = {
        Quick: quickmsgtext,
        Dynamic: dynmaicmsgtext,
        Group: groupmsgtext,
        Upload: uploadmsgtext
    };

    const selectedMessage = messageMap[tabname] || '';
    const { charCount, encoding, messageParts, smsCredits } = calculateSmsDetails(selectedMessage);

    return (
        <>
            <div className=" p-0 m-0 mb-1 " style={{ display: "flex", flexWrap: "wrap", columnGap: "1.7rem", justifyContent: "flex-start" }} >
                <div className="card-header" style={{ borderTop: "1px solid rgba(0, 0, 0, .06)", backgroundColor: "#3BAFDA", width: "100%" }}>
                    <h6 className="card-title" style={{ fontWeight: "600" }}>SMS</h6>
                </div>
            </div>

            <ul class="nav nav-tabs px-2" style={{ fontSize: windowWidth < 830 ? "0.7rem" : "0.8rem", width: "100%" }}>
                <li class="nav-item" onClick={() => handletab("Quick")}>
                    <a class="nav-link active show" id="base-tab1" data-toggle="tab"
                        aria-controls="tab1" href="#tab1" aria-expanded="true">QUICK CAMPAIGN</a>
                </li>
                <li class="nav-item" onClick={() => handletab("Dynamic")}>
                    <a class="nav-link" id="base-tab2" data-toggle="tab"
                        aria-controls="tab2" href="#tab2" aria-expanded="false">DYNAMIC CAMPAIGN
                    </a>
                </li>
                <li class="nav-item" onClick={() => handletab("Upload")}>
                    <a class="nav-link" id="base-tab3" data-toggle="tab"
                        aria-controls="tab3" href="#tab3" aria-expanded="false">UPLOAD CAMPAIGN</a>
                </li>

                <li class="nav-item" onClick={() => handletab("Group")}>
                    <a class="nav-link" id="base-tab3" data-toggle="tab"
                        aria-controls="tab3" href="#tab3" aria-expanded="false">GROUP CAMPAIGN</a>
                </li>
            </ul>

            {tabname === "Quick" && <>
                <div class="row px-2 mt-1"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // columnGap: "1.7rem",
                        justifyContent: "flex-start",
                        columnGap: "1.7rem",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        boxSizing: "border-box",
                        paddingBottom: "0.2rem"
                    }}>
                    <InputBox
                        label="Campaign Name"
                        type="text"
                        placeholder="Enter Campaign Name"
                        maxLength={32}
                        isreq={false}
                        widthPercent="45%"
                        widthPercent950="40%" widthPercent900="40%"
                        value={campaignname}
                        onChange={(e) => setcampaignname(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ marginBottom: windowWidth < 482 ? "0.5rem" : "" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.9rem", marginTop: "0.35rem" }}>
                            <strong>Message Type</strong>
                        </label>
                        <RadioButton
                            name="Message type"
                            options={windowWidth < 862
                                ? ['Promo', 'Trans', 'Service']
                                : ['Promotional', 'Transactional', 'Service']}
                        />


                    </div>

                    <Textarea
                        label="Mobile Numbers"
                        placeholder="Mobile Numbers [ with country code ]"
                        value={mobilearray}
                        onChange={(e) => setmobilearray(e.target.value)}
                        maxLength={2000}
                        rows='3'
                        overflow='auto'
                        inwidth="101%"
                    />

                    <SelectBox
                        label="Sender ID"
                        options={[
                            { label: 'VEHOST', value: 'VEHOST' },
                            { label: 'TATAMO', value: 'TATAMO' }
                        ]}
                        value={senderid}
                        onChange={(e) => setsenderid(e.target.value)}
                        isreq={true}
                        placeholder="Select Sender ID"
                        maxLength={15}
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <SelectBox
                        label="Template Name"
                        options={[
                        ]}
                        value={templatename}
                        onChange={(e) => settemplatename(e.target.value)}
                        isreq={true}
                        placeholder="Select Template Name"
                        maxLength={30}
                        widthRem="16rem"
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ display: "block", marginLeft: "0.5rem", marginTop: "0.05rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                            <strong>Is ShortUrl Selected</strong>
                        </label>
                        <RadioButton
                            name="Is ShortUrl Selected"
                            value={isshorturl}
                            onChange={setisshorturl}
                            options={['Yes', 'No']}
                            ispassed={true}
                        />
                    </div>













                </div>

                <div class="row px-2"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // columnGap: "1.7rem",
                        justifyContent: "flex-start",
                        columnGap: "1.7rem",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        boxSizing: "border-box",
                        paddingBottom: "0.2rem"
                    }} >
                    {isshorturl === "Yes" && <>
                        <SelectBox
                            label="Select Domain"
                            options={[
                            ]}
                            value={domain}
                            onChange={(e) => setdomain(e.target.value)}
                            isreq={false}
                            placeholder="Select Domain Name"
                            maxLength={15}
                            widthRem="16rem"          // try commenting this out to see widthPercent used
                            widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                            sidebarOpen={sidebarOpen}
                        />


                        <SelectBox
                            label="Callback URL"
                            options={[
                            ]}
                            value={callbackurl}
                            onChange={(e) => setcallbackurl(e.target.value)}
                            isreq={false}
                            placeholder="--  Select  --"
                            maxLength={25}

                            widthPercent="19.2%" widthPercent950="23%" widthPercent900="46.3%"
                            sidebarOpen={sidebarOpen}
                        />

                        <input type="text"
                            className="form-control"
                            placeholder="URL"

                            style={{ width: inputwidth, fontSize: "0.9rem", height: "2.9rem", padding: "0rem 0.4rem", borderColor: "rgb(210, 210, 211)", marginTop: windowWidth > 900 ? '1.9rem' : "1rem", marginBottom: windowWidth > 900 ? '0rem' : "1rem" }}

                        />
                    </>}

                    <Textarea
                        label="Message Text"
                        placeholder="Message Text"
                        value={quickmsgtext}
                        onChange={(e) => setquickmsgtext(e.target.value)}
                        maxLength={2000}
                        rows="3"
                        overflow="auto"
                        infoList={[
                            { label: "Characters", value: charCount },
                            { label: "Message Part", value: charCount === 0 ? '0' : messageParts.toString() },
                            { label: "Encoding", value: encoding },
                            { label: "SMS Credit", value: charCount === 0 ? 0 : smsCredits }
                        ]}
                    />
                </div>
            </>}

            {tabname === "Dynamic" && <>
                <div class="row px-2 mt-1" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "flex-start",
                    columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem"
                }}>
                    <InputBox
                        label="Campaign Name"
                        type="text"
                        placeholder="Enter Campaign Name"
                        maxLength={32}
                        isreq={false}
                        widthPercent="45%"
                        widthPercent950="40%" widthPercent900="40%"
                        value={campaignname}
                        onChange={(e) => setcampaignname(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ marginBottom: windowWidth < 482 ? "0.5rem" : "" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.9rem", marginTop: "0.35rem" }}>
                            <strong>Message Type</strong>
                        </label>
                        <RadioButton
                            name="Message type"
                            options={windowWidth < 862
                                ? ['Promo', 'Trans', 'Service']
                                : ['Promotional', 'Transactional', 'Service']}
                        />


                    </div>




                </div>

                <div className='row px-2' style={{ display: "flex", flexWrap: "wrap", columnGap: "1.9rem", justifyContent: "flex-start", paddingLeft: "0.5rem" }}>
                    <label style={{ fontWeight: "600", color: "", fontSize: "0.9rem" }}>
                        <strong>Upload File</strong>
                    </label>
                    <div className='file-upload-div'>
                        <UploadFileInput onFileSelect={handleFileSelect} file={filename} />
                    </div>
                </div>

                <div class="row px-2 mt-1" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "flex-start",
                    columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem"
                }}>
                    <SelectBox
                        label="Sender ID"
                        options={[
                            { label: 'VEHOST', value: 'VEHOST' },
                            { label: 'TATAMO', value: 'TATAMO' }
                        ]}
                        value={senderid}
                        onChange={(e) => setsenderid(e.target.value)}
                        isreq={true}
                        placeholder="Select Sender ID"
                        maxLength={15}
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <SelectBox
                        label="Template Name"
                        options={[
                        ]}
                        value={templatename}
                        onChange={(e) => settemplatename(e.target.value)}
                        isreq={true}
                        placeholder="Select Template Name"
                        maxLength={30}
                        widthRem="16rem"
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ display: "block", marginLeft: "0.5rem", marginTop: "0.05rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                            <strong>Is ShortUrl Selected</strong>
                        </label>
                        <RadioButton
                            name="Is ShortUrl Selected"
                            value={isshorturl}
                            onChange={setisshorturl}
                            options={['Yes', 'No']}
                            ispassed={true}
                        />
                    </div>
                </div>

                <div class="row px-2" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "flex-start",
                    columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem"
                }}>

                    {isshorturl === "Yes" && <>
                        <SelectBox
                            label="Select Domain"
                            options={[
                            ]}
                            value={domain}
                            onChange={(e) => setdomain(e.target.value)}
                            isreq={false}
                            placeholder="Select Domain Name"
                            maxLength={15}
                            widthRem="16rem"          // try commenting this out to see widthPercent used
                            widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                            sidebarOpen={sidebarOpen}
                        />


                        <SelectBox
                            label="Callback URL"
                            options={[
                            ]}
                            value={callbackurl}
                            onChange={(e) => setcallbackurl(e.target.value)}
                            isreq={false}
                            placeholder="--  Select  --"
                            maxLength={25}

                            widthPercent="19.2%" widthPercent950="23%" widthPercent900="46.3%"
                            sidebarOpen={sidebarOpen}
                        />

                        <input type="text"
                            className="form-control"
                            placeholder="URL"

                            style={{ width: inputwidth, fontSize: "0.9rem", height: "2.9rem", padding: "0rem 0.4rem", borderColor: "rgb(210, 210, 211)", marginTop: windowWidth > 900 ? '1.9rem' : "1rem", marginBottom: windowWidth > 900 ? '0rem' : "1rem" }}

                        />
                    </>}

                    <Textarea
                        label="Message Text"
                        placeholder="Message Text"
                        value={quickmsgtext}
                        onChange={(e) => setquickmsgtext(e.target.value)}
                        maxLength={2000}
                        rows="3"
                        overflow="auto"
                        infoList={[
                            { label: "Characters", value: charCount },
                            { label: "Message Part", value: charCount === 0 ? '0' : messageParts.toString() },
                            { label: "Encoding", value: encoding },
                            { label: "SMS Credit", value: charCount === 0 ? 0 : smsCredits }
                        ]}
                    />

                    <SelectBox
                        label="Mobile List"
                        options={[
                        ]}
                        value={mobilelist}
                        onChange={(e) => setmobilelist(e.target.value)}
                        isreq={true}
                        placeholder="Select Mobile Option"
                        maxLength={15}
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />


                    <SelectBox
                        label="Column List"
                        options={[
                        ]}
                        value={columnlist}
                        onChange={(e) => setcolumnlist(e.target.value)}
                        isreq={true}
                        placeholder="Select Column Option"
                        maxLength={15}
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ display: "block", marginLeft: "0.5rem", marginTop: "0.05rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                            <strong>Schedule Message</strong>
                        </label>
                        <RadioButton
                            name="Schedule Message"
                            value={isschedulemsg}
                            onChange={setisschedulemsg}
                            options={['Yes', 'No']}
                            ispassed={true}
                        />
                    </div>

                    {isschedulemsg === "Yes" && <Textarea
                        label="Schedule Time"
                        placeholder="Schedule Time"
                        value={scheduletimes}
                        onChange={(e) => setscheduletimes(e.target.value)}
                        maxLength={2000}
                        rows='2'
                    />}


                </div>

            </>}

            {tabname === "Upload" && <>
                <div class="row px-2 mt-1" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "flex-start",
                    columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem"
                }}>
                    <InputBox
                        label="Campaign Name"
                        type="text"
                        placeholder="Enter Campaign Name"
                        maxLength={32}
                        isreq={false}
                        widthPercent="45%"
                        widthPercent950="40%" widthPercent900="40%"
                        value={campaignname}
                        onChange={(e) => setcampaignname(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ marginBottom: windowWidth < 482 ? "0.5rem" : "" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.9rem", marginTop: "0.35rem" }}>
                            <strong>Message Type</strong>
                        </label>
                        <RadioButton
                            name="Message type"
                            options={windowWidth < 862
                                ? ['Promo', 'Trans', 'Service']
                                : ['Promotional', 'Transactional', 'Service']}
                        />


                    </div>




                </div>

                <div className='row px-2' style={{ display: "flex", flexWrap: "wrap", columnGap: "1.9rem", justifyContent: "flex-start", paddingLeft: "0.5rem" }}>
                    <label style={{ fontWeight: "600", color: "", fontSize: "0.9rem" }}>
                        <strong>Upload File</strong>
                    </label>
                    <div className='file-upload-div'>
                        <UploadFileInput onFileSelect={handleFileSelect} file={filename} />
                    </div>
                </div>

                <div class="row px-2 mt-1" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "flex-start",
                    columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem"
                }}>
                    <SelectBox
                        label="Sender ID"
                        options={[
                            { label: 'VEHOST', value: 'VEHOST' },
                            { label: 'TATAMO', value: 'TATAMO' }
                        ]}
                        value={senderid}
                        onChange={(e) => setsenderid(e.target.value)}
                        isreq={true}
                        placeholder="Select Sender ID"
                        maxLength={15}
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <SelectBox
                        label="Template Name"
                        options={[
                        ]}
                        value={templatename}
                        onChange={(e) => settemplatename(e.target.value)}
                        isreq={true}
                        placeholder="Select Template Name"
                        maxLength={30}
                        widthRem="16rem"
                        widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ display: "block", marginLeft: "0.5rem", marginTop: "0.05rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                            <strong>Is ShortUrl Selected</strong>
                        </label>
                        <RadioButton
                            name="Is ShortUrl Selected"
                            value={isshorturl}
                            onChange={setisshorturl}
                            options={['Yes', 'No']}
                            ispassed={true}
                        />
                    </div>
                </div>

                <div class="row px-2"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // columnGap: "1.7rem",
                        justifyContent: "flex-start",
                        columnGap: "1.7rem",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        boxSizing: "border-box",
                        paddingBottom: "0.2rem"
                    }} >
                    {isshorturl === "Yes" && <>
                        <SelectBox
                            label="Select Domain"
                            options={[
                            ]}
                            value={domain}
                            onChange={(e) => setdomain(e.target.value)}
                            isreq={false}
                            placeholder="Select Domain Name"
                            maxLength={15}
                            widthRem="16rem"          // try commenting this out to see widthPercent used
                            widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                            sidebarOpen={sidebarOpen}
                        />


                        <SelectBox
                            label="Callback URL"
                            options={[
                            ]}
                            value={callbackurl}
                            onChange={(e) => setcallbackurl(e.target.value)}
                            isreq={false}
                            placeholder="--  Select  --"
                            maxLength={25}

                            widthPercent="19.2%" widthPercent950="23%" widthPercent900="46.3%"
                            sidebarOpen={sidebarOpen}
                        />

                        <input type="text"
                            className="form-control"
                            placeholder="URL"

                            style={{ width: inputwidth, fontSize: "0.9rem", height: "2.9rem", padding: "0rem 0.4rem", borderColor: "rgb(210, 210, 211)", marginTop: windowWidth > 900 ? '1.9rem' : "1rem", marginBottom: windowWidth > 900 ? '0rem' : "1rem" }}

                        />
                    </>}

                    <Textarea
                        label="Message Text"
                        placeholder="Message Text"
                        value={quickmsgtext}
                        onChange={(e) => setquickmsgtext(e.target.value)}
                        maxLength={2000}
                        rows="3"
                        overflow="auto"
                        infoList={[
                            { label: "Characters", value: charCount },
                            { label: "Message Part", value: charCount === 0 ? '0' : messageParts.toString() },
                            { label: "Encoding", value: encoding },
                            { label: "SMS Credit", value: charCount === 0 ? 0 : smsCredits }
                        ]}
                    />

                    <div style={{ display: "block", marginLeft: "0.5rem", marginTop: "0.05rem", marginBottom: "0.4rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                            <strong>Schedule Message</strong>
                        </label>
                        <RadioButton
                            name="Schedule Message"
                            value={isschedulemsg}
                            onChange={setisschedulemsg}
                            options={['Yes', 'No']}
                            ispassed={true}
                        />
                    </div>

                    {isschedulemsg === "Yes" && <Textarea
                        label="Schedule Time"
                        placeholder="Schedule Time"
                        value={scheduletimes}
                        onChange={(e) => setscheduletimes(e.target.value)}
                        maxLength={2000}
                        rows='2'
                    />}
                </div>

            </>}

            {tabname === "Group" && <>
                <div class="row px-2 mt-1" style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "flex-start",
                    columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem"
                }}>
                    <InputBox
                        label="Campaign Name"
                        type="text"
                        placeholder="Enter Campaign Name"
                        maxLength={32}
                        isreq={false}
                        widthPercent="45%"
                        widthPercent950="40%" widthPercent900="40%"
                        value={campaignname}
                        onChange={(e) => setcampaignname(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ marginBottom: windowWidth < 482 ? "0.5rem" : "" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.9rem", marginTop: "0.35rem" }}>
                            <strong>Message Type</strong>
                        </label>
                        <RadioButton
                            name="Message type"
                            options={windowWidth < 862
                                ? ['Promo', 'Trans', 'Service']
                                : ['Promotional', 'Transactional', 'Service']}
                        />


                    </div>

                   


                </div>

                <div class="row px-2"
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
                        label="Sender ID"
                        options={[
                            { label: 'VEHOST', value: 'VEHOST' },
                            { label: 'TATAMO', value: 'TATAMO' }
                        ]}
                        value={senderid}
                        onChange={(e) => setsenderid(e.target.value)}
                        isreq={true}
                        placeholder="Select Sender ID"
                        maxLength={15}
                        widthPercent="32%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                    <SelectBox
                        label="Template Name"
                        options={[
                        ]}
                        value={templatename}
                        onChange={(e) => settemplatename(e.target.value)}
                        isreq={true}
                        placeholder="Select Template Name"
                        maxLength={30}
                        widthRem="16rem"
                        widthPercent="32%" widthPercent950="32%" widthPercent900="47%"
                        sidebarOpen={sidebarOpen}
                    />

                     <SelectBox
                        label="Group Name"
                        options={[
                        ]}
                        value={groupname}
                        onChange={(e) => setgroupname(e.target.value)}
                        isreq={true}
                        placeholder="Select Group"
                        maxLength={25}
                       widthPercent="31%" widthPercent950="31%" widthPercent900="100%"
                        sidebarOpen={sidebarOpen}
                    />

                    <div style={{ display: "block", marginTop: "0.4rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                            <strong>Is ShortUrl Selected</strong>
                        </label>
                        <RadioButton
                            name="Is ShortUrl Selected"
                            value={isshorturl}
                            onChange={setisshorturl}
                            options={['Yes', 'No']}
                            ispassed={true}
                        />
                    </div>
                </div>

                <div class="row px-2"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // columnGap: "1.7rem",
                        justifyContent: "flex-start",
                        columnGap: "1.7rem",
                        flex: "0 0 100%",
                        maxWidth: "100%",
                        boxSizing: "border-box",
                        paddingBottom: "0.2rem",
                        marginTop:"0.2rem",
                        marginBottom:"0.1rem"
                    }} >
                         {isshorturl === "Yes" && <>
                        <SelectBox
                            label="Select Domain"
                            options={[
                            ]}
                            value={domain}
                            onChange={(e) => setdomain(e.target.value)}
                            isreq={false}
                            placeholder="Select Domain Name"
                            maxLength={15}
                            widthRem="16rem"          // try commenting this out to see widthPercent used
                            widthPercent="28.92%" widthPercent950="32%" widthPercent900="47%"
                            sidebarOpen={sidebarOpen}
                        />


                        <SelectBox
                            label="Callback URL"
                            options={[
                            ]}
                            value={callbackurl}
                            onChange={(e) => setcallbackurl(e.target.value)}
                            isreq={false}
                            placeholder="--  Select  --"
                            maxLength={25}

                            widthPercent="19.2%" widthPercent950="23%" widthPercent900="46.3%"
                            sidebarOpen={sidebarOpen}
                        />

                        <input type="text"
                            className="form-control"
                            placeholder="URL"

                            style={{ width: inputwidth, fontSize: "0.9rem", height: "2.9rem", padding: "0rem 0.4rem", borderColor: "rgb(210, 210, 211)", marginTop: windowWidth > 900 ? '1.9rem' : "1rem", marginBottom: windowWidth > 900 ? '0rem' : "1rem" }}

                        />
                    </>}

                    <Textarea
                        label="Message Text"
                        placeholder="Message Text"
                        value={quickmsgtext}
                        onChange={(e) => setquickmsgtext(e.target.value)}
                        maxLength={2000}
                        rows="3"
                        overflow="auto"
                        infoList={[
                            { label: "Characters", value: charCount },
                            { label: "Message Part", value: charCount === 0 ? '0' : messageParts.toString() },
                            { label: "Encoding", value: encoding },
                            { label: "SMS Credit", value: charCount === 0 ? 0 : smsCredits }
                        ]}
                    />

                    <div style={{ display: "block", marginTop: "0.05rem", marginBottom: "0.5rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                            <strong>Schedule Message</strong>
                        </label>
                        <RadioButton
                            name="Schedule Message"
                            value={isschedulemsg}
                            onChange={setisschedulemsg}
                            options={['Yes', 'No']}
                            ispassed={true}
                        />
                    </div>

                    {isschedulemsg === "Yes" && <Textarea
                        label="Schedule Time"
                        placeholder="Schedule Time"
                        value={scheduletimes}
                        onChange={(e) => setscheduletimes(e.target.value)}
                        maxLength={2000}
                        rows='2'
                    />}

                    
                        
                    </div>


            </>}
        </>
    );
}