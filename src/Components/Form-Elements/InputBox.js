import { useState, useEffect } from "react";

export default function InputBox({
    label,
    type = "text",
    placeholder = "",
    maxLength = 20,
    isreq = false,
    disable = false,
    text = "",
    widthPercent = "100%",
    widthPercent950 = "",
    widthPercent900 = "",
    value = "",
    onChange = () => { },
    minno ="0",
    maxno="999999",
    sidebarOpen = true // 
}){

    const [inputwidth,setInputwidth] = useState(widthPercent);
     useEffect(() => {
        const updateWidth = () => {
            const screenWidth = window.innerWidth;
            if(screenWidth <= 475){
                setInputwidth("100%");
            }

            else if (screenWidth <= 980 && screenWidth > 900 && widthPercent950) {
                setInputwidth(widthPercent950);
            }
            else if(screenWidth <= 900 && widthPercent900){
                 setInputwidth(widthPercent900);
            }
            else {
                setInputwidth(widthPercent);
            }
        };

        updateWidth(); // Initial check
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [widthPercent, widthPercent950]);
    
   return (
     <div className="form-group" style={{ width: inputwidth }}>
        <div className="label-div">
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                <strong>{label}</strong>
            </label>
            {isreq ? (
                <span className="text-danger" style={{ fontSize: "1rem", fontWeight: "600", marginLeft: "0.2rem" }}>*</span>
            ) : (
                <span style={{ fontSize: "1.14rem", fontWeight: "600", marginLeft: "0.2rem" }}></span>
            )}
        </div>
         <input
                type={type}
                className="form-control"
                placeholder={placeholder}
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                min={minno}
                max={maxno}
                style={{
                    width: "100%",
                    fontSize: "0.88rem",
                    borderColor: "#d2d2d3",
                    boxSizing: "border-box"
                    
                }}
                disabled={disable}
            />
            <p style={{ fontSize: "0.82rem", marginTop: "0.3rem" }}>{text}</p>
    </div>
   );
}