import React, { useState, useRef, useEffect } from 'react';

export default function Textarea({ label, placeholder, value, onChange, maxLength, col = "12", rows = "2", disable = false, overflow = "hidden", infoList = [], inwidth = "100%", sidebarOpen = false }) {
  const textareaRef = useRef(null);
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Adjust height when value changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; // set to scrollHeight
    }
  }, [value]);

    // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`col-${col}`} style={{ padding: "0", marginTop: "0.13rem", marginBottom: "1.2rem",
      paddingRight: windowWidth < 450 ? "0" : "0.75rem"
     }}>
      {label && <label style={{ fontSize: "0.9rem" }}>
        <strong>
          {label} </strong></label>}
      <textarea
        className='form-control'
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        disabled={disable}
        style={{
          width: inwidth ,
          resize: 'none', // prevent manual resizing, optional
          overflowY: overflow, // hide scrollbar
          fontSize: '0.9rem',
          marginTop: "0.15rem",
        }}
        rows={rows}
      />
      {/* <div style={{display:"flex",justifyContent:"space-between", alignItems:"center",flex:"0 0 100%",  maxWidth:"100%", fontSize:"0.8rem", marginTop:"0.2rem"}}>
        <div>
         <strong><span>Characters: </span></strong>
          <span>0</span>
        </div>

        <div >
          <strong>
            <span>Message Part: </span>
          </strong>
          
         <span>Multipart <strong>[ 2 ]</strong></span>
        </div>

        <div>
          <strong>
            <span>Message Encoding: </span></strong>
            <span>Unicode</span>
        </div>

        <div>
          <strong>
            <span>SMS Credit: </span></strong>
            <span>2</span>
        </div>




      </div> */}

      {infoList.length > 0 && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          fontSize: "0.8rem",
          marginTop: "0.4rem",
         
        }}>
          {infoList.map((info, index) => (
            <div key={index} style={{marginBottom: windowWidth < 421 ? "0.3rem" : "0rem"}}>
              <strong>{info.label}: </strong>
              <span>{info.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
