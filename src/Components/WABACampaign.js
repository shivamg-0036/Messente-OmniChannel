import React, { useState, useEffect } from "react";
import RadioButton from "./Form-Elements/RadioButton";
import InputBox from "./Form-Elements/InputBox";
import SelectBox from "./Form-Elements/SelectBox";
import Textarea from "./Form-Elements/Textarea";
import UploadFileInput from "./UploadFileInput";

export default function WABACampaign(sidebarOpen) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [campaignname, setcampaignname] = useState("");
    const [templatetype, settemplatetype] = useState("");
    const [template, settemplate] = useState("");
    const [contact, setcontact] = useState("");
    const [messagetext, setmessagetext] = useState("");
    const [filename, setfilename] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [mediaurl, setmediaurl] = useState("");
    const [mediaurltype, setmediaurltype] = useState("Common URL");
    const [msgsentapitype, setmsgsentapitype] = useState("Cloud API");

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        // Do something with the selected file
        if (file) {
            const fname = file.name;
            setfilename(fname);
        }
    };

    // Track screen resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log("Media URL Type:", mediaurltype);


    return (
        <>
            <div className=" p-0 m-0 " style={{ display: "flex", flexWrap: "wrap", columnGap: "1.7rem", justifyContent: "flex-start" }} >
                <div className="card-header" style={{ borderTop: "1px solid hsla(0, 0.00%, 0.00%, 0.06)", backgroundColor: "#2af173", width: "100%" }}>
                    <h6 className="card-title" style={{ fontWeight: "600" }}>WhatsApp</h6>
                </div>
            </div>



            <div class="row px-2 mt-1"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "space-between",
                    //columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem"
                }}>

                <div style={{ marginBottom: windowWidth < 482 ? "0.5rem" : "" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.4rem", marginTop: "0.35rem" }}>
                        <strong>Schedule Campaign</strong>
                    </label>
                    <RadioButton
                        name="Message type"
                        options={
                            ['Immediate', 'Schedule']}
                    />
                </div>

            </div>

            <div class="row px-2"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // columnGap: "1.7rem",
                    justifyContent: "space-between",
                    //columnGap: "1.7rem",
                    flex: "0 0 100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    paddingBottom: "0.2rem",
                    marginTop: "0.45rem"
                }}>



                <InputBox
                    label="Campaign Name"
                    type="text"
                    placeholder="Enter Campaign Name"
                    maxLength={32}
                    isreq={true}
                    widthPercent="48%"
                    widthPercent950="48%" widthPercent900="48%"
                    value={campaignname}
                    onChange={(e) => setcampaignname(e.target.value)}
                    sidebarOpen={sidebarOpen}
                />

                <SelectBox
                    label="Contacts"
                    options={[
                    ]}
                    value={contact}
                    onChange={(e) => setcontact(e.target.value)}
                    isreq={true}
                    placeholder="Select Contact"
                    maxLength={15}
                    widthPercent="48%" widthPercent950="48%" widthPercent900="48%"
                    sidebarOpen={sidebarOpen}
                />

                <SelectBox
                    label="Template Type"
                    options={[
                        { label: 'Document', value: 'Document' },
                        { label: 'Image', value: 'Image' },
                        { label: 'Video', value: 'Video' },
                        { label: 'Text', value: 'Text' },
                        { label: 'Location', value: 'Location' },
                        { label: 'Carousel', value: 'Carousel' }
                    ]}
                    value={templatetype}
                    onChange={(e) => settemplatetype(e.target.value)}
                    isreq={true}
                    placeholder="Select Template Type"
                    maxLength={15}
                    widthPercent="48%" widthPercent950="48%" widthPercent900="48%"
                    sidebarOpen={sidebarOpen}
                />

                <SelectBox
                    label="Template"
                    options={[
                    ]}
                    value={template}
                    onChange={(e) => settemplate(e.target.value)}
                    isreq={true}
                    placeholder="Select Template"
                    maxLength={15}
                    widthPercent="48%" widthPercent950="48%" widthPercent900="48%"
                    sidebarOpen={sidebarOpen}
                />

                {(templatetype === "Document" || templatetype === "Image" || templatetype === "Video" || templatetype === "Carousel")
                    && <div style={{ marginBottom: windowWidth < 482 ? "0.5rem" : "0.4rem" }}>
                        <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.5rem", marginTop: "0.35rem" }}>
                            <strong>Media URL Type</strong>
                        </label>
                        <RadioButton
                            name="Media URL type"
                            value={mediaurltype}
                            onChange={setmediaurltype}
                            ispassed={true}
                            options={
                                (templatetype === "Carousel" ? ['Media ID', 'Media URL'] : ['Common URL', 'Dynamic URL'])}
                        />
                    </div>
                }





                <Textarea
                    label="Message"
                    placeholder="Enter Message"
                    value={messagetext}
                    onChange={(e) => setmessagetext(e.target.value)}
                    maxLength={2000}
                    rows='5'
                    overflow='auto'
                    inwidth="101%"
                    disable={true}
                />

                {template !== "" && <div className="row" style={{width:"100%", fontSize:"0.85rem", marginBottom:"0.4rem", color:"#008cff"}}>
                    <a>Download sample file</a>
                </div> }

                <div style={{ marginBottom: windowWidth < 482 ? "0.5rem" : "0.5rem" }}>
                    <label style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.5rem", marginTop: "0.35rem" }}>
                        <strong>Message Sent API Type</strong>
                    </label>
                    <RadioButton
                        name="Msg Sent API type"
                        value={msgsentapitype}
                        onChange={setmsgsentapitype}
                        ispassed={true}
                        options={
                            ['Cloud API', 'MMLite']}
                    />
                </div>

                {(templatetype === "Document" || templatetype === "Image" || templatetype === "Video") && mediaurltype === "Common URL" &&
                    <InputBox
                        label="Media URL"
                        type="text"
                        placeholder="Enter media url"
                        maxLength={32}
                        isreq={true}
                        widthPercent="100%"
                        widthPercent950="109%" widthPercent900="100%"
                        value={mediaurl}
                        onChange={(e) => setmediaurl(e.target.value)}
                        sidebarOpen={sidebarOpen}
                    />
                }





            </div>

           

            <div className='row px-2 pb-2' style={{ display: "flex", flexWrap: "wrap", columnGap: "1.9rem", justifyContent: "flex-start", paddingLeft: "0.5rem" }}>
                <label style={{ fontWeight: "600", color: "", fontSize: "0.9rem" }}>
                    <strong>Upload File</strong>
                </label>
                <div className='file-upload-div'>
                    <UploadFileInput onFileSelect={handleFileSelect} file={filename} />
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
                    marginTop: "0.4rem"
                }}>
                <div class="checkbox-wrapper-19">
                    <input type="checkbox" id="cbtest-19" />
                    <label for="cbtest-19" class="check-box">
                    </label>
                </div>
                <span style={{ marginLeft: "-0.8rem", fontSize: "0.95rem", marginTop: "-0.19rem" }}>Allow duplicate number </span>

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
                    paddingBottom: "0.45rem",
                    marginTop: "0rem"
                }}>



                <div class="checkbox-wrapper-20">
                    <input type="checkbox" id="cbtest-20" />
                    <label for="cbtest-20" class="check-box">
                    </label>
                </div>
                <span style={{ marginLeft: "-0.8rem", fontSize: "0.95rem", marginTop: "-0.19rem" }}> Allow encryption for this campaign </span>

            </div>


        </>
    );
}