import React, { useRef } from 'react';
import '../Pages/CSS/Custom CSS/createcampaign.css'
const UploadFileInput = ({ onFileSelect, file }) => {

    const fileInputRef = useRef(null);

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        onFileSelect(file);
    };



    return (
        <div className="file-input-wrapper" onClick={handleDivClick} style={{ cursor: "pointer" }}>
            <div className='file-icon-div'>
                <i className='fa-solid fa-cloud-arrow-up'></i>
            </div>

            <div className='span-div'>
                <span>File Type Supported:.xlsx ,.csv,.zip ,.gz</span>
            </div>

            <div className='file-selected-div'>
                <input type='text' value={file || ""}   
              placeholder={file === null ? "No File Selected" : ""} className='form-control' style={{ width: "90%", fontSize:"0.95rem" }} disabled />
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept='.xlsx,.csv,.zip,.gz'
            />
        </div>
    );
};

export default UploadFileInput;
