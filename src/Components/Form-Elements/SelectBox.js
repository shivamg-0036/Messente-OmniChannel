import { useState, useEffect } from "react";

export default function SelectBox({
    label,
    options = [],
    value,
    onChange,
    isreq = false,
    placeholder = '',
    maxLength = 0,
    widthRem = '',      
     widthPercent950 = "32%", 
    widthPercent = '100%', 
    widthPercent900 = "",
    disabled = false,
    sidebarOpen = true      
}){
     const [inputwidth,setInputwidth] = useState(widthPercent);
     useEffect(() => {
        const updateWidth = () => {
            const screenWidth = window.innerWidth;

            if(screenWidth <= 475){
                setInputwidth("100%");
            }

            else if (screenWidth <= 980 && screenWidth > 900  && widthPercent950) {
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
        <div className="form-group" style={{ width: inputwidth, marginBottom: label !== "" ? inputwidth === widthPercent900 || "100%" ? "0.8rem" :"0rem": "" }}>
             {label !== "" && (<div className="label-div">
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
                <strong>{label}</strong>
            </label>
            {isreq ? (
                <span className="text-danger" style={{ fontSize: "1rem", fontWeight: "600", marginLeft: "0.2rem" }}>*</span>
            ) : (
                <span style={{ fontSize: "1.14rem", fontWeight: "600", marginLeft: "0.2rem" }}></span>
            )}
        </div>)}

         <select
                value={value}
                onChange={onChange}
                className="form-control"
                style={{
                  
                    fontSize: "0.88rem",
                  
                }}
                disabled={disabled}
            >
                <option value="" disabled>
                    {placeholder || `Select ${label.toLowerCase()}`}
                </option>
                {options.map((opt) => {
                    const displayLabel = maxLength > 0 ? opt.label.slice(0, maxLength) : opt.label;
                    return (
                        <option key={opt.value} value={opt.value}>
                            {displayLabel}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}