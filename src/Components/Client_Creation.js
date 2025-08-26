import { useState, useEffect, useRef } from "react";
import { RotateSpinner } from "react-spinners-kit";
import InputBox from "./Form-Elements/InputBox";
import SelectBox from "./Form-Elements/SelectBox";
import { DatePicker } from 'antd';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import Textarea from "./Form-Elements/Textarea";
import RadioButton from "./Form-Elements/RadioButton";
import '../Pages/CSS/Custom CSS/ClientCreation.css'
import Table from "./Table";
import BASE_URL from "./apiConfig";
import '../Pages/CSS/Custom CSS/UserCreation.css'
import { Modal, Button } from "react-bootstrap";
import { genComponentStyleHook } from "antd/es/theme/internal";

export default function Client_Creation({ sidebarOpen }) {
    const [showprogress, setshowprogress] = useState(false);
    const [load, setload] = useState(false);
    const [enterprise, setenterprise] = useState("");
    const [tabname, settabname] = useState("add");
    const [email, setemail] = useState("");
    const [mobileno, setmobileno] = useState("");
    const [gstnumber, setgstnumber] = useState("");
    const [billingcycle, setbillingcycle] = useState("");
    const [billingtype, setbillingtype] = useState("");
    const [spocname, setspocname] = useState("");
    const [spocemail, setspocemail] = useState("");
    const [status, setstatus] = useState("Active");
    const [primarycontact, setprimarycontact] = useState("");
    const [dateValue, setDateValue] = useState(null);
    const [DepartmentDateValue, setDepartmentDateValue] = useState(null);
    const [address, setaddress] = useState("");
    const [isdefaultdepartment, setisdefaultdepartment] = useState("Yes");
    const [department, setdepartment] = useState("");
    const [departmentemail, setdepartmentemail] = useState("");
    const [departmentmobileno, setdepartmentmobileno] = useState("");
    const [Dstatus, setDstatus] = useState("Active");
    const [dspocname, setdspocname] = useState("");
    const [dspocmobile, setdspocmobile] = useState("");
    const [dspocemail, setdspocemail] = useState("");
    const [deptbillingtype, setdeptbillingtype] = useState("");
    const [originalEnterpriseData, setOriginalEnterpriseData] = useState(null);
    const [originalDepartmentData, setOriginalDepartmentData] = useState(null);
    const [deptDatevalue, setdeptDatevalue] = useState(null);
    const [deptbillingcycle, setdeptbillingcycle] = useState("");
    const [deptaddress, setdeptaddress] = useState("");
    const [inputwidth, setInputwidth] = useState("21.5%");
    const [EnterpriseAPIData, setEnterpriseAPIData] = useState([]);
    const [DepartmentAPIData, setDepartmentAPIData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
    const [isDeptAddModalOpen, setIsDeptAddModalOpen] = useState(false);
    const [SpecificEnterpriseData, setSpecificEnterpriseData] = useState(null);
    const [SpecificDepartmentData, setSpecificDepartmentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const DEFAULT_COLUMNS = ["clientname", "emailid", "contactnumber", "expirydate", "status"];
    const DEPT_DEFAULT_COLUMNS = ["deptemailid", "deptstatus", "deptexpirydate"];

    const [selectedColumns, setSelectedColumns] = useState(DEFAULT_COLUMNS);
    const [selectedDepartmentColumns, setselectedDepartmentColumns] = useState(DEPT_DEFAULT_COLUMNS);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeptOpen, setIsDeptOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownDeptRef = useRef(null);
    const prevTabnameRef = useRef();

    const allOptions = [
        { value: "clientname", label: "Enterprise Name" },
        { value: "emailid", label: "Email ID" },
        { value: "contactnumber", label: "Contact Number" },
        { value: "billingcycle", label: "Billing Cycle" },
        { value: "billingtype", label: "Biiling Type" },
        { value: "expirydate", label: "Expiry Date" },
        { value: "status", label: "Status" },
        { value: "spocname", label: "SPOC Name" },
        { value: "spocemailid", label: "SPOC Email ID" },
        { value: "spocphone", label: "SPOC Mobile No." },
        { value: "gstnumber", label: "GST Number" },
    ];

    const allDeptOptions = [
        // { value: "enterprisename", label: "Enterprise Name" },
        // { value: "departmentname", label: "Department Name" },
        { value: "deptemailid", label: "Email ID" },
        { value: "deptcontactnumber", label: "Contact Number" },
        { value: "deptstatus", label: "Status" },
        { value: "deptspocname", label: "SPOC Name" },
        { value: "deptspocmobilenumber", label: "SPOC Mobile Number" },
        { value: "deptspocemailid", label: "SPOC Email ID" },
        { value: "deptexpirydate", label: "Expiry Date" },
        { value: "deptbillingcycle", label: "Billing Cycle" },
        { value: "deptbillingtype", label: "Billing type" },

    ];

    const formattedDepartmentData = DepartmentAPIData?.flatMap((enterprise) =>
        enterprise?.lstDept.map((dept) => ({
            enterprisename: enterprise?.entpName,
            deptID: dept?.deptID,
            departmentname: dept?.deptName,
            deptemailid: dept?.deptEmailId,
            deptcontactnumber: dept?.deptMoblieNo,
            deptstatus: dept?.detpStatus === "1" ? "Active" : "Inactive",
            deptspocname: dept?.deptSpocName,
            deptspocmobilenumber: dept?.deptSpocMobile,
            deptspocemailid: dept?.deptSpocEmail,
            deptexpirydate: dept?.deptExpiryDate,
            deptbillingcycle: `${dept?.detpBillingCycle} Days`,
            deptbillingtype: dept?.detpBillingType?.charAt(0).toUpperCase() + dept?.detpBillingType.slice(1),
            Action: (
                <button
                    type="button"
                    style={{ margin: "0rem", marginTop: "-0.5rem", marginBottom: "-0.3rem" }}
                    className="btn btn-outline-info round btn-glow btn-sm"
                    onClick={() => handleDepartmentEdit(dept)}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ) // capitalize
        }))
    );

    // Define fields for the modal form
    const fields = [
        //     { key: "clientname", label: "Enterprise Name" },
        //     { key: "emailid", label: "Email ID" },
        //     { key: "contactnumber", label: "Contact Number" },
        //     { key: "billingcycle", label: "Billing Cycle", inputtype: "select", options: ["30 Days", "45 Days", "60 Days"] },
        //     { key: "billingtype", label: "Billing Type", inputtype: "select", options: ["Prepaid", "Postpaid"] },
        //     { key: "expirydate", label: "Expiry Date", inputtype: "date" },
        //     { key: "status", label: "Status", inputtype: "select", options: ["Active", "Inactive"] },
        //     { key: "spocname", label: "SPOC Name" },
        //     { key: "spocemailid", label: "SPOC Email ID" },
        //     { key: "spocphone", label: "SPOC Contact Number" },
        //     { key: "gstnumber", label: "GST Number" },
        //     { key: "address", label: "Address", inputtype: "textarea" }

        { key: "entpName", label: "Enterprise Name" },
        { key: "entpEmailId", label: "Email ID" },
        { key: "entpMoblieNo", label: "Contact Number" },
        { key: "entpBillingCycle", label: "Billing Cycle", inputtype: "select", options: ["30 Days", "45 Days", "60 Days"] },
        { key: "entpBillingType", label: "Billing Type", inputtype: "select", options: ["Prepaid", "Postpaid"] },
        { key: "expiryDate", label: "Expiry Date", inputtype: "date" },
        { key: "entpStatus", label: "Status", inputtype: "select", options: ["Active", "Inactive"] },
        { key: "entpspocName", label: "SPOC Name" },
        { key: "entpspocEmail", label: "SPOC Email ID" },
        { key: "entpspocMobile", label: "SPOC Contact Number" },
        { key: "entpGSTNumber", label: "GST Number" },
        { key: "entpAddress", label: "Address", inputtype: "textarea" }

    ];

    const Departmentfields = [
        { key: "entpName", label: "Enterprise Name" },
        { key: "deptName", label: "Department Name" },
        { key: "deptEmailId", label: "Email ID" },
        { key: "deptMoblieNo", label: "Contact Number" },
        { key: "detpBillingCycle", label: "Billing Cycle", inputtype: "select", options: ["30 Days", "45 Days", "60 Days"] },
        { key: "detpBillingType", label: "Billing Type", inputtype: "select", options: ["Prepaid", "Postpaid"] },
        { key: "deptExpiryDate", label: "Expiry Date", inputtype: "date" },
        { key: "detpStatus", label: "Status", inputtype: "select", options: ["Active", "Inactive"] }, // or Active/Inactive depending on how it's stored
        { key: "detpAddress", label: "Address", inputtype: "textarea" },
        { key: "deptSpocName", label: "SPOC Name" },
        { key: "deptSpocEmail", label: "SPOC Email ID" },
        { key: "deptSpocMobile", label: "SPOC Contact Number" }
    ];

    const handleInputChange = (key, value) => {
        setSpecificEnterpriseData(prev => ({
            ...prev,
            [key]: value,
        }));

        setData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleDeptInputChange = (key, value) => {
        setSpecificDepartmentData(prev => ({
            ...prev,
            [key]: value,
        }));

    };

    const getChangedFields = (original, updated) => {
        const changes = {};
        for (const key in updated) {
            // console.log("key:",key);
            if (updated[key] !== original[key]) {
                changes[key] = updated[key];
            }
        }
        return changes;
    };

    const retryFunction = () => {
        setdepartment("");
        setdepartmentemail("");
        setenterprise("");
        setdepartmentmobileno("");
        setdeptDatevalue("");
        setdeptaddress("");
        setdeptbillingcycle("");
        setdeptbillingtype("");
        setdspocemail("");
        setdspocmobile("");
        setdspocname("");
        setDstatus("");
    };

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        // getMonth() returns 0-11, so add 1 and pad start with 0
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSave = async () => {
        // console.log("specificEnterpirse:", SpecificEnterpriseData)

        const changedFields = getChangedFields(originalEnterpriseData, SpecificEnterpriseData);

        // console.log("Changed fields only:", changedFields);

        // Optional: update the full list
        const updated = EnterpriseAPIData?.map((row) =>
            row.ID === SpecificEnterpriseData.ID ? SpecificEnterpriseData : row
        );

        //setData(updated);
        try {
            if (Object.keys(changedFields).length === 0) {
                await Swal.fire({
                    title: 'Update Error',
                    html: "No changes detected; Update will not be performed.",
                    icon: 'error'
                });
            }

            else {
                // setshowprogress(true);
                // Preprocess specific fields
                if (changedFields.entpBillingCycle) {
                    changedFields.entpBillingCycle = changedFields.entpBillingCycle.split(' ')[0];
                }

                if (changedFields.entpStatus) {
                    changedFields.entpStatus = changedFields.entpStatus === "Active" ? "1" : "0"
                }
                setLoading(true);
                const apiUrl = `${BASE_URL}/entp/${SpecificEnterpriseData.id}`;
                const fetchOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(changedFields),
                };

                // API Request
                const response = await fetch(apiUrl, fetchOptions);
                const data = await response.json();
                setLoading(false);
                //setshowprogress(false);

                if (data.status === "Success" || data.errorCode === "000") {
                    const result = await Swal.fire({
                        title: "Success",
                        text: data.errorDesc,
                        icon: "success",
                        confirmButtonText: "OK",
                        allowOutsideClick: false,
                    });

                    if (result.isConfirmed) {
                        setIsModalOpen(false);
                        callViewAllEnterprise();
                    }
                }

                else {
                    const re = await Swal.fire({
                        title: "Enterprise Update Error",
                        text: data.errorDesc || "Something went wrong",
                        icon: "error"
                    });

                    if (re.isConfirmed) {
                        setIsModalOpen(false);
                        setLoading(false);
                        // callViewAllEnterprise();
                    }
                }

            }

        }

        catch (error) {
            console.error("API Request Error:", error.message);
            setshowprogress(false);

            const result = await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error'
            });
        }
    };

    const handleDepartmentSave = async () => {
        // // console.log("specificEnterpirse:", SpecificEnterpriseData)
        const changedFields = getChangedFields(originalDepartmentData, SpecificDepartmentData);

        console.log("changedFieldsDept:", changedFields);
        try {
            if (Object.keys(changedFields).length === 0) {
                await Swal.fire({
                    title: 'Update Error',
                    html: "No changes detected; Update will not be performed.",
                    icon: 'error'
                });
            }

            else {
                if (changedFields.detpBillingCycle) {
                    changedFields.detpBillingCycle = changedFields.detpBillingCycle.split(' ')[0];
                }

                if (changedFields.detpStatus) {
                    changedFields.detpStatus = changedFields.detpStatus === "Active" ? "1" : "0"
                }
                setLoading(true);

                const apiUrl = `${BASE_URL}/department/${SpecificDepartmentData.deptID}`;
                const fetchOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(changedFields),
                };

                // API Request
                const response = await fetch(apiUrl, fetchOptions);
                const data = await response.json();
                setLoading(false);
                //setshowprogress(false);

                if (data.status === "Success" || data.errorCode === "000") {
                    const result = await Swal.fire({
                        title: "Success",
                        text: data.errorDesc,
                        icon: "success",
                        confirmButtonText: "OK",
                        allowOutsideClick: false,
                    });

                    if (result.isConfirmed) {
                        setIsDeptModalOpen(false);
                        callViewAllDepartment();
                    }
                }

                else {
                    const re = await Swal.fire({
                        title: "Department Update Error",
                        text: data.errorDesc || "Something went wrong",
                        icon: "error"
                    });

                    if (re.isConfirmed) {
                        setIsDeptModalOpen(false);
                        setLoading(false);
                        // callViewAllEnterprise();
                    }
                }


            }
        }

        catch (error) {
            console.error("API Request Error:", error.message);
            setshowprogress(false);

            const result = await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error'
            });
        }
    };

    const callAddAPI = async () => {
        try {
            // console.log("entpName:", enterprise);
            // console.log("entpemailID:", email);
            // console.log("mobile:", mobileno);
            setshowprogress(true);
            if (enterprise === "" || email === "" || mobileno === "" || billingtype === "" || billingcycle === "" || status === "") {
                setshowprogress(false);
                const re = await Swal.fire({
                    title: "Value Error!",
                    text: "Please fill all Required fields. Some field(s) are missing.",
                    icon: "error",
                    allowOutsideClick: false
                });
            }

            else {
                const formattedExpiryDate = formatDate(dateValue);
                const formattedDeptExpiryDate = formatDate(deptDatevalue);

                const apiUrl = `${BASE_URL}/entp`;
                const requestBody = {
                    entpName: enterprise,
                    entpEmailId: email,
                    entpMoblieNo: mobileno,
                    entpspocName: spocname,
                    entpspocEmail: spocemail,
                    entpspocMobile: primarycontact,
                    entpBillingCycle: billingcycle,
                    entpAddress: address,
                    entpStatus: status === "Active" ? "1" : "0",
                    entpBillingType: billingtype,
                    entpGSTNumber: gstnumber,
                    expiryDate: formattedExpiryDate
                };

                if (isdefaultdepartment === "No") {
                    requestBody.lstDept = [
                        {
                            deptName: department,
                            deptExpiryDate: formattedDeptExpiryDate,
                            detpAddress: deptaddress,
                            detpBillingCycle: deptbillingcycle,
                            detpStatus: Dstatus === "Active" ? "1" : "0",
                            detpBillingType: deptbillingtype,
                            deptEmailId: departmentemail,
                            deptMoblieNo: departmentmobileno,
                            deptSpocName: dspocname,
                            deptSpocEmail: dspocemail,
                            deptSpocMobile: dspocmobile
                        }
                    ]
                }
                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                };

                // API Request
                const response = await fetch(apiUrl, fetchOptions);
                const data = await response.json();

                // // console.log(data);
                if (data.status === "Success" || data.errorCode === "000") {
                    setshowprogress(false);
                    const re = await Swal.fire({
                        title: "Success",
                        text: data.errorDesc,
                        icon: "success"
                    });

                    if (re.isConfirmed) {
                        setenterprise("");
                        setemail("");
                        setmobileno("");
                        setgstnumber("");
                        setaddress("");
                        setstatus("");
                        setDateValue(null);
                        setbillingcycle("");
                        setisdefaultdepartment("Yes");
                        setbillingtype("");
                        setdepartment("");
                        setprimarycontact("");
                        setdepartmentemail("");
                        setdspocname("");
                        setdepartmentmobileno("");
                        setdspocmobile("");
                        setdeptaddress("");
                        setdeptbillingcycle("");
                        setdeptbillingtype("");
                        setdspocemail("");
                    }
                }

                else {
                    setshowprogress(false);
                    await Swal.fire({
                        title: "Enterprise Creation Error",
                        text: data.errorDesc || "Something went wrong",
                        icon: "error"
                    });
                }
            }
        }

        catch (error) {
            console.error("API Request Error:", error.message);
            setshowprogress(false);

            const result = await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error'
            });
        }
    };

    const callAddDeptAPI = async () => {
        try {
            setLoading(true);
            if (enterprise === "" || enterprise === null || department === "" || departmentemail === "" || departmentmobileno === "" || deptaddress === "" || Dstatus === "" || deptDatevalue === "" || deptbillingtype === "" || deptbillingcycle ==="") {
                setLoading(false);
                const re = await Swal.fire({
                    title: "Value Error!",
                    text: "Please fill all Required fields. Some field(s) are missing.",
                    icon: "error",
                    allowOutsideClick: false
                });
            }

            else {
                const formattedDeptExpiryDate = formatDate(deptDatevalue);
                
                console.log("ID", enterprise);
                console.log("deptName", department);
                console.log("deptExpiryDate", formattedDeptExpiryDate);
                console.log("detpAddress", deptaddress);
                console.log("detpBillingCycle", deptbillingcycle);
                console.log("detpStatus", Dstatus === "Active" ? "1" : "0");
                console.log("detpBillingType", deptbillingtype);
                console.log("deptEmailId", departmentemail);
                console.log("deptMoblieNo", departmentmobileno);
                console.log("deptSpocName", dspocname);
                console.log("deptSpocEmail", dspocemail);
                console.log("deptSpocMobile", dspocmobile);

                const apiUrl = `${BASE_URL}/department`;
                const requestBody = {
                     ID: enterprise,
                   lstDept:[{
                    deptName: department,
                    deptExpiryDate: formattedDeptExpiryDate,
                    detpAddress: deptaddress,
                    detpBillingCycle: deptbillingcycle,
                    detpStatus: Dstatus === "Active" ? "1" : "0",
                    detpBillingType: deptbillingtype,
                    deptEmailId: departmentemail,
                    deptMoblieNo: departmentmobileno,
                    deptSpocName: dspocname,
                    deptSpocEmail: dspocemail,
                    deptSpocMobile: dspocmobile
                   }]
                };

                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                };

                // API Request
                const response = await fetch(apiUrl, fetchOptions);
                const data = await response.json();

                // // console.log(data);
                if (data.status === "Success" || data.errorCode === "000") {
                    setshowprogress(false);
                    const re = await Swal.fire({
                        title: "Success",
                        text: data.errorDesc,
                        icon: "success"
                    });

                    if (re.isConfirmed) {
                        setIsDeptAddModalOpen(false);
                        callViewAllDepartment();
                      retryFunction();
                    }
                }

                else {
                    setLoading(false);
                   const re = await Swal.fire({
                        title: "Department Creation Error",
                        text: data.errorDesc || "Something went wrong",
                        icon: "error"
                    });

                     
                }
            }
        }

        catch (error) {
            console.error("API Request Error:", error.message);
            setLoading(false);
            setIsDeptAddModalOpen(false);
            const result = await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error'
            });
        }
    };

    const capitalizeFirstLetter = (str) => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
    };

    // Dropdown options exclude "Action"
    const dropdownOptions = allOptions.filter(col => col.key !== "Action");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleDeptClickOutside = (event) => {
            if (dropdownDeptRef.current && !dropdownDeptRef.current.contains(event.target)) {
                setIsDeptOpen(false);
            }
        };
        document.addEventListener("mousedown", handleDeptClickOutside);
        return () => document.removeEventListener("mousedown", handleDeptClickOutside);
    }, []);

    const toggleOption = (value) => {
        setSelectedColumns(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    // const DepartmenttoggleOption = (value) => {
    //     setselectedDepartmentColumns(prev =>
    //         prev.includes(value)
    //             ? prev.filter(v => v !== value)
    //             : [...prev, value]
    //     );
    //     // console.log("Toggled:", value, "Updated:", updated);
    // };

    const DepartmenttoggleOption = (value) => {
        setselectedDepartmentColumns(prev => {
            const updated = prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value];
            // // console.log("Toggled:", value, "Updated:", updated);
            return updated;
        });
    };

    const handletab = (name) => {
        settabname(name);
    };

    const handleEdit = async (item) => {
        // // console.log("item:", item);

        // Initially set the data for the modal
        setData(item);
        setDateValue(item?.expirydate ? dayjs(item?.expirydate) : null); // Set date with dayjs if expirydate exists
        setSpecificEnterpriseData(item);
        setSelectedRow(item); // Store item data for possible use

        try {
            setshowprogress(true);
            const apiUrl = `${BASE_URL}/entp/${item.ID}`;
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // API Request
            const response = await fetch(apiUrl, fetchOptions);
            const data = await response.json();

            setshowprogress(false);

            if (data.status === "Success" || data.errorCode === "000") {
                const sen = data?.enterprise[0];
                //// console.log("Data:", sen);

                const transformed = {
                    ...sen,
                    entpStatus: sen.entpStatus === "1" ? "Active" : "Inactive",
                    entpBillingType: capitalizeFirstLetter(sen.entpBillingType),
                    entpBillingCycle: `${sen.entpBillingCycle} Days`,
                };

                // Update state with transformed data
                setSpecificEnterpriseData(transformed);
                setOriginalEnterpriseData(transformed);
                setData(transformed);

                // Set the date properly with transformed expiryDate
                setDateValue(transformed?.expiryDate ? dayjs(transformed?.expiryDate) : null);

                // Open the modal after setting all data
                setIsModalOpen(true);
            } else {
                const errorMessage = data?.status;
                const responseBody = await data?.errorDesc();
                setshowprogress(false);
                await Swal.fire({
                    title: 'Get Specific Enterprise Details Error',
                    html: `${errorMessage}${responseBody}`,
                    icon: 'error',
                });
                setEnterpriseAPIData(null);
            }
        } catch (error) {
            console.error("API Request Error:", error.message);
            setshowprogress(false);

            await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error',
            });
        }
    };

    const handleDepartmentEdit = async (item) => {
        try {
            setshowprogress(true);
            const apiUrl = `${BASE_URL}/department/${item.deptID}`;
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // API Request
            const response = await fetch(apiUrl, fetchOptions);
            const data = await response.json();

            setshowprogress(false);

            if (data.status === "Success" || data.errorCode === "000") {
                const sen = data?.enterprise[0];
                const transformed = {
                    entpName: sen?.entpName,
                    deptName: sen.lstDept[0]?.deptName,
                    deptID: sen.lstDept[0]?.deptID,
                    deptEmailId: sen.lstDept[0]?.deptEmailId,
                    deptMoblieNo: sen.lstDept[0]?.deptMoblieNo,
                    detpBillingCycle: `${sen.lstDept[0]?.detpBillingCycle} Days`,
                    detpBillingType: capitalizeFirstLetter(sen.lstDept[0]?.detpBillingType),
                    detpStatus: sen?.lstDept[0]?.detpStatus === "1" ? "Active" : "Inactive",
                    detpAddress: sen?.lstDept[0]?.detpAddress,
                    deptSpocName: sen.lstDept[0]?.deptSpocName,
                    deptSpocEmail: sen.lstDept[0]?.deptSpocEmail,
                    deptSpocMobile: sen.lstDept[0]?.deptSpocMobile,
                    deptExpiryDate: sen.lstDept[0]?.deptExpiryDate
                };

                // Update state with transformed data
                setSpecificDepartmentData(transformed);
                setOriginalDepartmentData(transformed);
                //setData(transformed);

                // Set the date properly with transformed expiryDate
                setDepartmentDateValue(sen.lstDept[0]?.deptExpiryDate ? dayjs(sen.lstDept[0]?.deptExpiryDate) : null);

                // Open the modal after setting all data
                setIsDeptModalOpen(true);
            } else {
                const errorMessage = data?.status;
                const responseBody = await data?.errorDesc();
                setshowprogress(false);
                await Swal.fire({
                    title: 'Get Specific Department Details Error',
                    html: `${errorMessage}${responseBody}`,
                    icon: 'error',
                });
                setDepartmentAPIData(null);
            }
        } catch (error) {
            console.error("API Request Error:", error.message);
            setshowprogress(false);

            await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error',
            });
        }

    };

    const handleDateChange = (date) => {
        if (date) {
            const isoDate = date.format('YYYY-MM-DD');
            const formattedDate = date ? date.format("YYYY-MM-DD") : '';
            setDateValue(date); // Update date state
            setData(prevData => ({
                ...prevData,
                expirydate: formattedDate
            })); // Update main data state


            setSpecificEnterpriseData(prevData => ({
                ...prevData,
                expiryDate: formattedDate
            })); // Update main data state




            // Preserve the data structure, make sure it's always an array
        } else {
            setDateValue(null);
        }
    };

    const handleDeptDateChange = (date) => {
        if (date) {
            const isoDate = date.format('YYYY-MM-DD');
            const formattedDate = date ? date.format("YYYY-MM-DD") : '';
            setdeptDatevalue(date);
            setDepartmentDateValue(date);
            setSpecificDepartmentData(prevData => ({
                ...prevData,
                deptExpiryDate: formattedDate
            })); // Update main data state
            // // console.log('Selected Date:', isoDate);

        } else {
            setdeptDatevalue(null);
            setDepartmentDateValue(null);
        }
    };

    const callViewAllEnterprise = async () => {
        try {
            setshowprogress(true);
            const apiUrl = `${BASE_URL}/entp`;
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            };

            // API Request
            const response = await fetch(apiUrl, fetchOptions);
            const data = await response.json();

            setshowprogress(false);

            if (data.status === "Success" || data.errorCode === "000") {
                // const sen = data?.enterprise.map((item) => item);
                // // // console.log("Data:", data?.enterprise)
                // setEnterpriseAPIData(sen);
                const enterpriseData = Array.isArray(data?.enterprise) ? data?.enterprise : [];
                setEnterpriseAPIData(enterpriseData);
            }

            else {
                const errorMessage = data?.status;
                const responseBody = await data?.errorDesc();
                setshowprogress(false);
                const result = await Swal.fire({
                    title: 'Get Sender ID Error',
                    html: `${errorMessage}${responseBody}`,
                    icon: 'error'
                });
                setEnterpriseAPIData(null);

            }
        }

        catch (error) {
            console.error("API Request Error:", error.message);
            setshowprogress(false);

            const result = await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error'
            });
        }
    }

    const callViewAllDepartment = async () => {
        try {
            setshowprogress(true);
            const apiUrl = `${BASE_URL}/department`;
            const fetchOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            };

            // API Request
            const response = await fetch(apiUrl, fetchOptions);
            const data = await response.json();

            setshowprogress(false);

            if (data.status === "Success" || data.errorCode === "000") {
                const sen = data?.enterprise.map((item) => item);
                // // console.log("Data:", data?.enterprise)
                setDepartmentAPIData(sen);
            }

            else {
                const errorMessage = data?.status;
                const responseBody = await data?.errorDesc();
                setshowprogress(false);
                const result = await Swal.fire({
                    title: 'Get Sender ID Error',
                    html: `${errorMessage}${responseBody}`,
                    icon: 'error'
                });
                setDepartmentAPIData(null);

            }
        }

        catch (error) {
            console.error("API Request Error:", error.message);
            setshowprogress(false);

            const result = await Swal.fire({
                title: 'API Request Error',
                html: error.message,
                icon: 'error'
            });
        }
    }

    // const AddNew = () => {
    //     setIsDeptAddModalOpen(true);
    //     setLoading(true);
    //     callViewAllEnterprise();
    //     setLoading(false);
    //     console.log("enterprise:", EnterpriseAPIData);
    // };

    const AddNew = async () => {
        setIsDeptAddModalOpen(true);
        setLoading(true);

        try {
            await callViewAllEnterprise();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching enterprise data:", error);
        }
    };


    useEffect(() => {

        const prev = prevTabnameRef.current;

        if (prev !== tabname) {
            setSelectedColumns(DEFAULT_COLUMNS);
            setselectedDepartmentColumns(DEPT_DEFAULT_COLUMNS);
            //setEnterpriseAPIData(null);
            //setDepartmentAPIData(null);
        }

        if (prevTabnameRef.current !== "client" && tabname === "client") {
            callViewAllEnterprise();
        }

        if (prevTabnameRef.current !== "department" && tabname === "department") {
            //     callViewAllEnterprise();
            retryFunction();
            callViewAllDepartment();
        }




        prevTabnameRef.current = tabname; // update ref for next render
    }, [tabname]);

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
                setInputwidth("21.5%");
            }
        };

        updateWidth(); // Initial check
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() =>{
        if(isDeptAddModalOpen === false){
            retryFunction();
        }
    },[isDeptAddModalOpen])

    //console.log("EnterpriseData:", EnterpriseAPIData)

    return (
        <div class="content-body" style={{ fontSize: "0.8rem" }}>
            <div class="row mb-0">
                <div class="col-12 pr-0 pl-0"  >
                    <div class="card mb-0" style={{ boxShadow: "0 0px 12px rgba(8, 70, 243, 0.4)" }} >
                        <div class="card-header">
                            <h6 class="card-title font-weight-bold">Enterprise & Department - View / Add</h6>
                        </div>
                    </div>

                </div>
            </div>

            {showprogress === true ? <div className="showprocessspinner" style={{ position: "absolute", top: "46%", left: sidebarOpen ? "55%" : "50%", zIndex: "100" }}>
                <RotateSpinner color="black" />
            </div> : <div></div>}

            <div class={showprogress === true ? "row mb-0 blurred" : "row mb-0"} style={{ marginTop: "1.2rem" }}>
                <div class="col-12 pr-0 pl-0 " style={{ minHeight: "98%", overflowY: "auto" }} >
                    <div class="card" style={{ boxShadow: "0 0px 12px rgba(8, 70, 243, 0.4)" }} >
                        <div class="card-content collapse show">
                            <div class="card-body">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item" onClick={() => handletab("add")}>
                                        <a class="nav-link active show" id="base-tab1" data-toggle="tab"
                                            aria-controls="tab1" href="#tab1" aria-expanded="true">ADD</a>
                                    </li>
                                    <li class="nav-item" onClick={() => handletab("client")}>
                                        <a class="nav-link" id="base-tab2" data-toggle="tab"
                                            aria-controls="tab2" href="#tab2" aria-expanded="false">CLIENT
                                            VIEW</a>
                                    </li>
                                    <li class="nav-item" onClick={() => handletab("department")}>
                                        <a class="nav-link" id="base-tab3" data-toggle="tab"
                                            aria-controls="tab3" href="#tab3" aria-expanded="false">DEPARTMENT
                                            VIEW</a>
                                    </li>
                                </ul>

                                {tabname === "add" && (

                                    <div class="tab-content " style={{ marginTop: "0.2rem", overflow: "auto", paddingTop: ".7rem" }}>
                                        <div role="tabpanel" class="tab-pane active show" id="tab1"
                                            aria-expanded="true" aria-labelledby="base-tab1" style={{ position: "relative" }}>
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
                                                }}>

                                                <InputBox
                                                    label="Enterprise Name"
                                                    type="text"
                                                    placeholder="Enterprise Name"
                                                    maxLength={150}
                                                    isreq={true}
                                                    widthPercent="25%"
                                                    widthPercent950="32%" widthPercent900="49%"
                                                    value={enterprise}
                                                    onChange={(e) => setenterprise(e.target.value)}
                                                    sidebarOpen={sidebarOpen}
                                                />

                                                <InputBox
                                                    label="Email ID"
                                                    type="email"
                                                    placeholder="Email ID"
                                                    maxLength={150}
                                                    isreq={true}
                                                    widthPercent="25%"
                                                    widthPercent950="32%" widthPercent900="49%"
                                                    value={email}
                                                    onChange={(e) => setemail(e.target.value)}
                                                    sidebarOpen={sidebarOpen}
                                                />

                                                <InputBox
                                                    label="Phone Number"
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    maxLength={25}
                                                    isreq={true}
                                                    widthPercent="21.5%" widthPercent950="32%" widthPercent900="49%"
                                                    value={mobileno}
                                                    onChange={(e) => setmobileno(e.target.value)}
                                                    sidebarOpen={sidebarOpen}

                                                />



                                                <InputBox
                                                    label="GST Number"
                                                    type="text"
                                                    placeholder="GST Number"
                                                    maxLength={25}
                                                    isreq={true}
                                                    widthPercent="21.5%" widthPercent950="32%" widthPercent900="49%"
                                                    value={gstnumber}
                                                    onChange={(e) => setgstnumber(e.target.value)}
                                                    sidebarOpen={sidebarOpen}
                                                />

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
                                                    maxLength={20}
                                                    widthRem="16rem"          // try commenting this out to see widthPercent used
                                                    widthPercent="24.92%" widthPercent950="32%" widthPercent900="49%"
                                                    sidebarOpen={sidebarOpen}
                                                />

                                                <SelectBox
                                                    label="Billing Cycle"
                                                    options={[
                                                        { label: '30 Days', value: '30' },
                                                        { label: '45 Days', value: '45' },
                                                        { label: '60 Days', value: '60' }
                                                    ]}
                                                    value={billingcycle}
                                                    onChange={(e) => setbillingcycle(e.target.value)}
                                                    isreq={false}
                                                    placeholder="Select Billing Cycle"
                                                    maxLength={15}
                                                    widthRem="19.2rem"          // try commenting this out to see widthPercent used
                                                    widthPercent="24.92%" widthPercent950="32%" widthPercent900="49%"
                                                    sidebarOpen={sidebarOpen} // pass from App
                                                />



                                                <SelectBox
                                                    label="Status"
                                                    options={[
                                                        { label: 'Active', value: 'Active' },
                                                        { label: 'InActive', value: 'InActive' }
                                                    ]}
                                                    value={status}
                                                    onChange={(e) => setstatus(e.target.value)}
                                                    isreq={false}
                                                    placeholder=""
                                                    maxLength={20}
                                                    widthRem="16.3rem"
                                                    widthPercent="21.5%" widthPercent950="32%" widthPercent900="49%"
                                                    sidebarOpen={sidebarOpen}
                                                />

                                                <InputBox
                                                    label="Finance SPOC Name"
                                                    type="text"
                                                    placeholder=" Finance SPOC Name"
                                                    maxLength={150}
                                                    isreq={false}
                                                    widthPercent="21.5%" widthPercent950="32%" widthPercent900="49%"
                                                    value={spocname}
                                                    onChange={(e) => setspocname(e.target.value)}
                                                    sidebarOpen={sidebarOpen}
                                                />

                                                <InputBox
                                                    label="Finance SPOC Contact"
                                                    type="text"
                                                    placeholder=" Finance SPOC Contact Number"
                                                    maxLength={25}
                                                    isreq={false}
                                                    widthPercent="24.92%" widthPercent950="32%" widthPercent900="49%"
                                                    value={primarycontact}
                                                    onChange={(e) => setprimarycontact(e.target.value)}
                                                    sidebarOpen={sidebarOpen}
                                                />

                                                <InputBox
                                                    label="Finance SPOC Email ID"
                                                    type="text"
                                                    placeholder=" Finance SPOC Email ID"
                                                    maxLength={150}
                                                    isreq={false}
                                                    widthPercent="24.92%" widthPercent950="32%" widthPercent900="49%"
                                                    value={spocemail}
                                                    onChange={(e) => setspocemail(e.target.value)}
                                                    sidebarOpen={sidebarOpen}
                                                />

                                                <div style={{
                                                    display: "block",
                                                    width: inputwidth,
                                                    marginBottom: inputwidth === "49%" || "100%" ? "0.8rem" : "0rem"
                                                }} >
                                                    <label style={{ fontSize: "0.9rem" }}><strong>Expiry Date</strong></label>
                                                    <br />
                                                    <DatePicker
                                                        size="middle"
                                                        value={dateValue}
                                                        onChange={handleDateChange}
                                                        placeholder="Select a date"
                                                        disabledDate={(current) => {
                                                            return current && current < dayjs().startOf('day');
                                                        }}
                                                        style={{
                                                            padding: "0.6rem 1.3rem",
                                                            marginTop: "0.3rem",
                                                            border: "1px solid gray",
                                                            width: "100%"
                                                        }}

                                                    />


                                                </div>

                                                <div style={{ width: inputwidth }}></div>

                                                <Textarea
                                                    label="Address"
                                                    placeholder="Enter Address"
                                                    value={address}
                                                    onChange={(e) => setaddress(e.target.value)}
                                                    maxLength={2000}
                                                    inwidth="101%"
                                                    sidebarOpen={sidebarOpen}
                                                />
                                            </div>

                                            <label style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}> <strong>Department by Default </strong> <span style={{ color: "red", fontWeight: "800" }}>*</span></label>


                                            <RadioButton name="Default Department"
                                                options={['Yes', 'No']}
                                                value={isdefaultdepartment}
                                                onChange={setisdefaultdepartment}
                                                ispassed={true}
                                            />
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {tabname === "add" && isdefaultdepartment === "No" && (
                <div class={showprogress === true ? "row mb-0 blurred" : "row mb-0"} style={{ marginTop: '0.3rem', marginBottom: "1rem" }}>
                    <div class="col-12 pr-0 pl-0 mb-1 pb-1" >
                        <div class="card" style={{ boxShadow: "0 0px 12px rgba(8, 70, 243, 0.4)" }} >
                            <div class="card-content collapse show">
                                <div class="card-body">
                                    <div className="row" style={{
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
                                            label="Department Name"
                                            type="text"
                                            placeholder="Department Name"
                                            maxLength={30}
                                            isreq={true}
                                            widthPercent="24.92%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            value={department}
                                            onChange={(e) => setdepartment(e.target.value)}
                                            sidebarOpen={sidebarOpen}
                                        />

                                        <InputBox
                                            label="Email ID"
                                            type="email"
                                            placeholder="Email ID"
                                            maxLength={37}
                                            isreq={true}
                                            widthPercent="24.92%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            value={departmentemail}
                                            onChange={(e) => setdepartmentemail(e.target.value)}
                                            sidebarOpen={sidebarOpen}
                                        />

                                        <InputBox
                                            label="Phone Number"
                                            type="text"
                                            placeholder="Phone Number"
                                            maxLength={30}
                                            isreq={true}
                                            widthPercent="21.5%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            value={departmentmobileno}
                                            onChange={(e) => setdepartmentmobileno(e.target.value)}
                                            sidebarOpen={sidebarOpen}

                                        />

                                        {/* <div style={{
                                            display: "block",
                                            width: inputwidth,
                                            position: "relative",
                                        }} >
                                            <label style={{ fontSize: "0.9rem", marginTop: "0.05rem" }}><strong>Expiry Date</strong></label>
                                            <br />
                                            <DatePicker
                                                size="middle"
                                                value={deptDatevalue}
                                                onChange={handleDeptDateChange}
                                                placeholder="Select a Expiry date"
                                                disabledDate={(current) => {
                                                    return current && current < dayjs().startOf('day');
                                                }}
                                                style={{
                                                    padding: "0.55rem 1.3rem",
                                                    marginTop: "0.2rem",
                                                    border: "1px solid gray",
                                                    width: "100%"
                                                }}


                                            />
                                        </div> */}

                                        {<div style={{
                                            position: "relative", // Key for absolute positioning
                                            width: inputwidth
                                        }}>
                                            <label style={{ fontSize: "0.9rem", marginTop: "0.05rem" }}>
                                                <strong>Expiry Date</strong>
                                            </label>
                                            <br />
                                            <div style={{
                                                position: "absolute",       // Position it relative to parent
                                                top: "35%",               // Adjust as needed to push above
                                                left: 0,
                                                width: "100%",
                                                zIndex: 9999,               // Make sure it’s above other UI
                                            }}>
                                                <DatePicker
                                                    size="middle"
                                                    value={deptDatevalue}
                                                    onChange={handleDeptDateChange}
                                                    placeholder="Select a Expiry date"
                                                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                                                    style={{
                                                        padding: "0.55rem 1.3rem",
                                                        border: "1px solid gray",
                                                        width: "100%"
                                                    }}
                                                    dropdownClassName="custom-datepicker-popup"
                                                    getPopupContainer={trigger => trigger.parentNode}
                                                />
                                            </div>
                                        </div>}

                                        <InputBox
                                            label="Department SPOC Name"
                                            type="text"
                                            placeholder="Department SPOC Name"
                                            maxLength={30}
                                            isreq={true}
                                            widthPercent="24.92%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            value={dspocname}
                                            onChange={(e) => setdspocname(e.target.value)}
                                            sidebarOpen={sidebarOpen}
                                        />

                                        <InputBox
                                            label="Department SPOC Email ID"
                                            type="email"
                                            placeholder="Department SPOC Email ID"
                                            maxLength={37}
                                            isreq={true}
                                            widthPercent="24.92%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            value={dspocemail}
                                            onChange={(e) => setdspocemail(e.target.value)}
                                            sidebarOpen={sidebarOpen}
                                        />

                                        <InputBox
                                            label="SPOC Contact Number"
                                            type="text"
                                            placeholder="SPOC Contact Number"
                                            maxLength={30}
                                            isreq={true}
                                            widthPercent="21.5%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            value={dspocmobile}
                                            onChange={(e) => setdspocmobile(e.target.value)}
                                            sidebarOpen={sidebarOpen}

                                        />

                                        <SelectBox
                                            label="Status"
                                            options={[
                                                { label: 'Active', value: 'Active' },
                                                { label: 'InActive', value: 'InActive' }
                                            ]}
                                            value={Dstatus}
                                            onChange={(e) => setDstatus(e.target.value)}
                                            isreq={false}
                                            placeholder=""
                                            maxLength={20}
                                            widthRem="16.3rem"
                                            widthPercent="21.5%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            sidebarOpen={sidebarOpen}
                                        />



                                        <SelectBox
                                            label="Billing Type"
                                            options={[
                                                { label: 'Prepaid', value: 'Prepaid' },
                                                { label: 'Postpaid', value: 'Postpaid' }
                                            ]}
                                            value={deptbillingtype}
                                            onChange={(e) => setdeptbillingtype(e.target.value)}
                                            isreq={false}
                                            placeholder="Select Billing Type"
                                            maxLength={20}
                                            widthRem="16rem"          // try commenting this out to see widthPercent used
                                            widthPercent="24.92%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            sidebarOpen={sidebarOpen}
                                        />



                                        <SelectBox
                                            label="Billing Cycle"
                                            options={[
                                                { label: '30 Days', value: '30' },
                                                { label: '45 Days', value: '45' },
                                                { label: '60 Days', value: '60' }
                                            ]}
                                            value={deptbillingcycle}
                                            onChange={(e) => setdeptbillingcycle(e.target.value)}
                                            isreq={false}
                                            placeholder="Select Billing Cycle"
                                            maxLength={15}
                                            widthRem="19.2rem"          // try commenting this out to see widthPercent used
                                            widthPercent="24.92%"
                                            widthPercent950="32%"
                                            widthPercent900="49%"
                                            sidebarOpen={sidebarOpen} // pass from App
                                        />

                                        <div style={{ width: inputwidth }}></div>
                                        <div style={{ width: inputwidth }}></div>

                                        <Textarea
                                            label="Address"
                                            placeholder="Enter Address"
                                            value={deptaddress}
                                            onChange={(e) => setdeptaddress(e.target.value)}
                                            inwidth="101%"
                                            maxLength={2000}
                                        />






                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {tabname === "add" && (
                <div className={`row ${isdefaultdepartment === "No" ? "mb-4" : ""}`}>
                    <div className={`button-div ${isdefaultdepartment === "No" ? "showdepart" : "hidedepart"}`}>
                        <button className={`btn btn-info btn-min-width btn-glow mr-1 mb-1 ${showprogress === true ? "blurred" : ""}`} type="button" disabled={showprogress === true} onClick={callAddAPI} >
                            Submit
                        </button>

                        <button className={`btn btn-warning btn-min-width box-shadow-4 mr-1 mb-1 ${showprogress === true ? "blurred" : ""}`} type="button" disabled={showprogress === true} >
                            Reset
                        </button>
                    </div>
                </div>
            )}

            {tabname === "client" && (
                <>
                    <div class="tab-pane mb-1" id="tab2" aria-labelledby="base-tab2">
                        <div class="">

                            <div class={showprogress === true ? "row mb-1 blurred" : "row mb-1"} style={{ display: "flex", alignItems: "center", marginTop: "0.3rem", justifyContent: "space-between" }}>
                                {/* <input type="search" className="form-control" placeholder="Global Search ..."  style={{width:"25%", flex:" 0 0 25%", fontSize:"0.9rem"}}/>
                                <button className="btn btn-warning" >Column Visibility</button> */}
                                <div className="multi-select-dropdown" ref={dropdownRef} style={{ cursor: "pointer", maxWidth: "100%", width: "auto", minWidth: "30%" }}>
                                    <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)} style={{ backgroundColor: "#fff" }}>
                                        {selectedColumns.length > 0 ? (
                                            <div className="selected-tags" onClick={e => e.stopPropagation()} >
                                                {selectedColumns.map(value => {
                                                    const label = allOptions.find(opt => opt.value === value)?.label;
                                                    return (
                                                        <div className="tag" key={value}>
                                                            {label}
                                                            <span className="remove-tag" onClick={() => toggleOption(value)}>×</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <span style={{ color: "#888" }}>Select Columns</span>
                                        )}
                                        <span className="arrow">
                                            {isOpen ? <i className="fa fa-angle-up" /> : <i className="fa fa-angle-down" />}
                                        </span>
                                    </div>

                                    {isOpen && (
                                        <div className="dropdown-list">
                                            {allOptions.map(opt => (
                                                <label key={opt.value} className="dropdown-item">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedColumns.includes(opt.value)}
                                                        onChange={() => toggleOption(opt.value)}
                                                    />
                                                    <span className="custom-checkbox" />
                                                    {opt.label}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Table
                                columns={[
                                    { key: "clientname", label: "Enterprise Name" },
                                    { key: "emailid", label: "Email ID" },
                                    { key: "contactnumber", label: "Contact Number" },
                                    { key: "billingcycle", label: "Billing Cycle" },
                                    { key: "billingtype", label: "Billing Type" },
                                    { key: "expirydate", label: "Expiry Date" },
                                    { key: "status", label: "Status" },
                                    { key: "spocname", label: "SPOC Name" },
                                    { key: "spocemailid", label: "SPOC Email ID" },
                                    { key: "spocphone", label: "SPOC Contact Number" },
                                    { key: "gstnumber", label: "GST Number" },
                                    { key: "Action", label: "Action", disableFilter: true }
                                ].filter(col => selectedColumns.includes(col.key) || col.key === "Action")}
                                data={EnterpriseAPIData?.map(item => ({
                                    ID: item?.id,
                                    clientname: item.entpName,
                                    emailid: item.entpEmailId,
                                    contactnumber: item.entpMoblieNo,
                                    billingcycle: `${item.entpBillingCycle} Days`,
                                    billingtype: item.entpBillingType.charAt(0).toUpperCase() + item.entpBillingType.slice(1),
                                    expirydate: item.expiryDate,
                                    status: item.entpStatus === "1" ? "Active" : "Inactive",
                                    spocname: item.entpspocName,
                                    spocemailid: item.entpspocEmail,
                                    spocphone: item.entpspocMobile,
                                    gstnumber: item.entpGSTNumber,
                                    address: item.entpAddress,
                                    Action: (
                                        <button
                                            type="button"
                                            style={{ margin: "0rem", marginTop: "-0.5rem", marginBottom: "-0.3rem" }}
                                            className="btn btn-outline-info round btn-glow btn-sm"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    )
                                }))}

                                onEdit={handleEdit}
                                showprocess={showprogress}
                            />



                            {/* <Table
                                columns={[{ key: "clientname", label: "Enterprise Name" }
                                    , { key: "emailid", label: "Email ID" },
                                { key: "contactnumber", label: "Contact Number" }
                                    , { key: "billingcycle", label: "Billing Cycle" }
                                    , { key: "billingtype", label: "Biiling Type" }
                                    , { key: "expirydate", label: "Expiry Date" }
                                    , { key: "status", label: "Status" }
                                    , { key: "spocname", label: "SPOC Name" }
                                    , { key: "spocemailid", label: "SPOC Email ID" }
                                    , { key: "spocphone", label: "SPOC Contact Number" }
                                    , { key: "gstnumber", label: "GST Number" }
                                    , { key: "Action", label: "Action", disableFilter: true }
                                ]}
                                data={EnterpriseAPIData?.map(item => ({
                                    ID: item?.id,
                                    clientname: item.entpName,
                                    emailid: item.entpEmailId,
                                    contactnumber: item.entpMoblieNo,
                                    billingcycle: `${item.entpBillingCycle} Days`,
                                    billingtype: item.entpBillingType.charAt(0).toUpperCase() + item.entpBillingType.slice(1),
                                    expirydate: item.expiryDate,
                                    status: item.entpStatus === "1" ? "Active" : "Inactive",
                                    spocname: item.entpspocName,
                                    spocemailid: item.entpspocEmail,
                                    spocphone: item.entpspocMobile,
                                    gstnumber: item.entpGSTNumber,
                                    address: item.entpAddress,
                                    Action: (
                                        <button
                                            type="button"
                                            style={{ margin: "0rem", marginTop: "-0.5rem", marginBottom: "-0.3rem" }}
                                            className="btn btn-outline-info round btn-glow btn-sm"
                                            onEdit={handleEdit}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    )
                                }))}
                            /> */}


                            {/* <div className="modal fade" id="EditEnterpriseModal" tabindex="-1" role="dialog" aria-labelledby="EditEnterpriseModalLabel" >
                                {load === true ? <div style={{ width: "30%", height: "auto", zIndex: "100000", top: "80%", left: "50%", position: "absolute" }}>
                                    <RotateSpinner color="black" /> </div>
                                    : <></>
                                }

                                <div className={load ? "modal-dialog modal-dialog-centered modal-lg blurred" : "modal-dialog modal-dialog-centered modal-lg"} role="document">
                                    <div className="modal-content" >
                                        <div className="modal-header" style={{ backgroundColor: "#2392e0" }}>
                                            <h5 className="modal-title" id="exampleModalLabel">Editing Enterprise</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* React-Bootstrap Modal */}
                            <Modal
                                show={isModalOpen}
                                onHide={() => setIsModalOpen(false)} // Close on backdrop click or close button
                                centered
                                size="lg"
                            >
                                <Modal.Header style={{ backgroundColor: "#2392e0", fontSize: "1.5rem" }}>

                                    <Modal.Title style={{ fontSize: "1.08rem", fontWeight: "600" }}>Editing Enterprise</Modal.Title>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* Spinner overlay for loading */}
                                    {loading && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                zIndex: 100000
                                            }}
                                        >
                                            <RotateSpinner color="black" />
                                        </div>
                                    )}

                                    {SpecificEnterpriseData && (
                                        <form>
                                            <div className="row">
                                                {fields?.map(({ key, label, inputtype = "input", options = [] }) => {
                                                    const colClass = inputtype === "textarea" ? "col-12" : "col-md-4";
                                                    return (
                                                        <div className={`form-group ${colClass}`} key={key} style={{ marginBottom: "1rem" }}>
                                                            <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                                                                {label}
                                                            </label>

                                                            {/* Text input */}
                                                            {inputtype === "input" && (
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={SpecificEnterpriseData[key] || ""}
                                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                                    disabled={loading}
                                                                    style={{ fontSize: "0.9rem" }}
                                                                />
                                                            )}

                                                            {/* Select input */}
                                                            {inputtype === "select" && (
                                                                <select
                                                                    className="form-control"
                                                                    value={SpecificEnterpriseData[key] || ""}
                                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                                    disabled={loading}
                                                                    style={{ fontSize: "0.9rem" }}
                                                                >
                                                                    <option value="" disabled>Select {label}</option>
                                                                    {options.map((option, idx) => (
                                                                        <option key={idx} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}

                                                            {/* Textarea input */}
                                                            {inputtype === "textarea" && (
                                                                <textarea
                                                                    className="form-control"
                                                                    rows="3"
                                                                    value={SpecificEnterpriseData[key] || ""}
                                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                                    disabled={loading}
                                                                    style={{ resize: "vertical", fontSize: "0.9rem" }}
                                                                />
                                                            )}

                                                            {/* Date picker */}
                                                            {inputtype === "date" && (
                                                                <DatePicker
                                                                    size="middle"
                                                                    selected={dateValue ? dateValue.toDate() : null} // Convert to native Date object
                                                                    value={dateValue}
                                                                    onChange={handleDateChange}
                                                                    getPopupContainer={trigger => trigger.parentNode}
                                                                    disabled={loading}
                                                                    style={{
                                                                        padding: "0.55rem 1.3rem",
                                                                        marginTop: "0.2rem",
                                                                        border: "1px solid gray",
                                                                        width: "100%",
                                                                        fontSize: "0.9rem"
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </form>
                                    )}


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className={loading === true ? "btn btn-warning btn-glow blurred" : "btn btn-warning btn-glow"} onClick={() => setIsModalOpen(false)} disabled={loading === true} >
                                        Close
                                    </Button>
                                    <Button className={loading === true ? "btn btn-info btn-glow" : "btn btn-info btn-glow"} onClick={handleSave} disabled={loading === true} >
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>





                        </div>
                    </div>
                </>
            )}

            {tabname === "department" && (
                <div class="tab-pane" id="tab3" aria-labelledby="base-tab3">
                    <div className={showprogress === true ? "row mb-1 blurred" : "row mb-1"} style={{ justifyContent: "space-between", marginTop: "0.2rem" }}>

                        <div class="row " style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div className="multi-select-dropdown" ref={dropdownDeptRef} style={{ cursor: "pointer", maxWidth: "100%", width: "auto", minWidth: "50%" }}>
                                <div className="dropdown-header" onClick={() => setIsDeptOpen(!isDeptOpen)} style={{ backgroundColor: "#fff" }}>
                                    {selectedDepartmentColumns.length > 0 ? (
                                        <div className="selected-tags" onClick={e => e.stopPropagation()} >
                                            {selectedDepartmentColumns.map(value => {
                                                const label = allDeptOptions.find(opt => opt.value === value)?.label;
                                                return (
                                                    <div className="tag" key={value}>
                                                        {label}
                                                        <span className="remove-tag" onClick={() => DepartmenttoggleOption(value)}>×</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <span style={{ color: "#888" }}>Select Columns</span>
                                    )}
                                    <span className="arrow">
                                        {isDeptOpen ? <i className="fa fa-angle-up" /> : <i className="fa fa-angle-down" />}
                                    </span>
                                </div>

                                {isDeptOpen && (
                                    <div className="dropdown-list">
                                        {allDeptOptions.map(opt => (
                                            <label key={opt.value} className="dropdown-item">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedDepartmentColumns.includes(opt.value)}
                                                    onChange={() => DepartmenttoggleOption(opt.value)}
                                                />
                                                <span className="custom-checkbox" />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>


                        <button className="btn btn-success btn-min-width btn-glow" onClick={AddNew}>Add Department
                            <i class="fa-solid fa-circle-plus" style={{ marginLeft: "0.5rem" }}></i>
                        </button>



                    </div>

                    <Table
                        columns={[
                            { key: "enterprisename", label: "Enterprise Name" },
                            { key: "departmentname", label: "Department Name" },
                            { key: "deptemailid", label: "Email ID" },
                            { key: "deptcontactnumber", label: "Contact Number" },
                            { key: "deptstatus", label: "Status" },
                            { key: "deptspocname", label: "SPOC Name" },
                            { key: "deptspocmobilenumber", label: "SPOC Mobile Number" },
                            { key: "deptspocemailid", label: "SPOC Email ID" },
                            { key: "deptexpirydate", label: "Expiry Date" },
                            { key: "deptbillingcycle", label: "Billing Cycle" },
                            { key: "deptbillingtype", label: "Billing type" },
                            { key: "Action", label: "Action", disableFilter: true }
                        ].filter(col => selectedDepartmentColumns.includes(col.key) || col.key === "Action" || col.key === "enterprisename" || col.key === "departmentname")}
                        data={formattedDepartmentData}
                        onEdit={handleDepartmentEdit}
                        showprocess={showprogress}
                    />

                    <Modal
                        show={isDeptModalOpen}
                        onHide={() => setIsDeptModalOpen(false)} // Close on backdrop click or close button
                        centered
                        size="lg"
                    >
                        <Modal.Header style={{ backgroundColor: "#2392e0", fontSize: "1.5rem" }}>

                            <Modal.Title style={{ fontSize: "1.08rem", fontWeight: "600" }}>Editing Department</Modal.Title>
                            <button type="button" onClick={() => setIsDeptModalOpen(false)} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Header>

                        <Modal.Body>
                            {/* Spinner overlay for loading */}
                            {loading && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 100000
                                    }}
                                >
                                    <RotateSpinner color="black" />
                                </div>
                            )}

                            {SpecificDepartmentData && (
                                <form>
                                    <div className="row">
                                        {Departmentfields?.map(({ key, label, inputtype = "input", options = [] }) => {
                                            const colClass = inputtype === "textarea" ? "col-12" : "col-md-4";
                                            return (
                                                <div className={`form-group ${colClass}`} key={key} style={{ marginBottom: "1rem" }}>
                                                    <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                                                        {label}
                                                    </label>

                                                    {/* Text input */}
                                                    {inputtype === "input" && (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={`Enter ${label}`}
                                                            value={SpecificDepartmentData[key] || ""}
                                                            onChange={(e) => handleDeptInputChange(key, e.target.value)}
                                                            disabled={loading}
                                                            style={{ fontSize: "0.9rem" }}
                                                        />
                                                    )}

                                                    {/* Select input */}
                                                    {inputtype === "select" && (
                                                        <select
                                                            className="form-control"
                                                            value={SpecificDepartmentData[key] || ""}
                                                            placeholder={`Enter ${label}`}
                                                            onChange={(e) => handleDeptInputChange(key, e.target.value)}
                                                            disabled={loading}
                                                            style={{ fontSize: "0.9rem" }}
                                                        >
                                                            <option value="" disabled>Select {label}</option>
                                                            {options.map((option, idx) => (
                                                                <option key={idx} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}

                                                    {/* Textarea input */}
                                                    {inputtype === "textarea" && (
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            placeholder={`Enter ${label}`}
                                                            value={SpecificDepartmentData[key] || ""}
                                                            onChange={(e) => handleDeptInputChange(key, e.target.value)}
                                                            disabled={loading}
                                                            style={{ resize: "vertical", fontSize: "0.9rem" }}
                                                        />
                                                    )}

                                                    {/* Date picker */}
                                                    {inputtype === "date" && (
                                                        <DatePicker
                                                            size="middle"
                                                            selected={DepartmentDateValue ? DepartmentDateValue.toDate() : null} // Convert to native Date object
                                                            value={DepartmentDateValue}
                                                            onChange={handleDeptDateChange}
                                                            placeholder={`Enter ${label}`}
                                                            //getPopupContainer={trigger => trigger.parentNode}
                                                            disabled={loading}
                                                            style={{
                                                                padding: "0.55rem 1.3rem",
                                                                marginTop: "0.2rem",
                                                                border: "1px solid gray",
                                                                width: "100%",
                                                                fontSize: "0.9rem"
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </form>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className={loading === true ? "btn btn-warning btn-glow blurred" : "btn btn-warning btn-glow"} onClick={() => setIsDeptModalOpen(false)} disabled={loading === true} >
                                Close
                            </Button>
                            <Button className={loading === true ? "btn btn-info btn-glow" : "btn btn-info btn-glow"} onClick={handleDepartmentSave} disabled={loading === true} >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={isDeptAddModalOpen}
                        onHide={() => setIsDeptAddModalOpen(false)} // Close on backdrop click or close button
                        centered
                        size="lg"
                      
                        
                    >
                        <Modal.Header style={{ backgroundColor: "#2392e0", fontSize: "1.5rem" }}>

                            <Modal.Title style={{ fontSize: "1.08rem", fontWeight: "600" }}>Add New Department</Modal.Title>
                            <button type="button" onClick={() => setIsDeptAddModalOpen(false)} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Header>

                        <Modal.Body>
                            {loading && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 100000
                                    }}
                                >
                                    <RotateSpinner color="black" />
                                </div>
                            )}

                            <div className={loading === true ? "row blurred" : "row"} style={{
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
                                    label="Enterprise Name"
                                    options={EnterpriseAPIData?.map(item => ({ value: item.id, label: item.entpName }))}
                                    value={enterprise}
                                    // onChange={(e) => setenterprise(e.target.value)}
                               onChange={(e) => {setenterprise(e.target.value); // Set the ID in your state
  }}
                                    isreq={true}
                                    placeholder="Select Enterprise"
                                    maxLength={1000}
                                    widthRem="16rem"
                                    widthPercent="31%" widthPercent950="32%" widthPercent900="49%"
                                    sidebarOpen={sidebarOpen}
                                />


                                <InputBox
                                    label="Department Name"
                                    type="text"
                                    placeholder="Enter Department Name"
                                    maxLength={30}
                                    isreq={true}
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    value={department}
                                    onChange={(e) => setdepartment(e.target.value)}
                                    sidebarOpen={sidebarOpen}
                                />

                                <InputBox
                                    label="Email ID"
                                    type="text"
                                    placeholder="Enter Email ID"
                                    maxLength={30}
                                    isreq={true}
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    value={departmentemail}
                                    onChange={(e) => setdepartmentemail(e.target.value)}
                                    sidebarOpen={sidebarOpen}
                                />

                                <InputBox
                                    label="Contact Number"
                                    type="text"
                                    placeholder="Enter Contact Number"
                                    maxLength={30}
                                    isreq={true}
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    value={departmentmobileno}
                                    onChange={(e) => setdepartmentmobileno(e.target.value)}
                                    sidebarOpen={sidebarOpen}
                                />

                                <SelectBox
                                    label="Status"
                                    options={[
                                        { label: 'Active', value: 'Active' },
                                        { label: 'InActive', value: 'InActive' }
                                    ]}
                                    value={Dstatus}
                                    onChange={(e) => setDstatus(e.target.value)}
                                    isreq={true}
                                    placeholder=""
                                    maxLength={20}
                                    widthRem="16.3rem"
                                    widthPercent="31%" widthPercent950="32%" widthPercent900="49%"
                                    sidebarOpen={sidebarOpen}
                                />

                                {<div style={{
                                    position: "relative", // Key for absolute positioning
                                    width: "31%"
                                }}>
                                    <label style={{ fontSize: "0.9rem", marginTop: "0.05rem" }}>
                                        <strong>Expiry Date</strong>
                                    </label>
                                    <br />
                                    <div style={{
                                        position: "absolute",       // Position it relative to parent
                                        top: "35%",               // Adjust as needed to push above
                                        left: 0,
                                        width: "100%",
                                        zIndex: "1000000",               // Make sure it’s above other UI
                                    }}>
                                        <DatePicker
                                            size="middle"
                                            value={deptDatevalue}
                                            onChange={handleDeptDateChange}
                                            placeholder="Select a Expiry date"
                                            disabledDate={(current) => current && current < dayjs().startOf("day")}
                                            style={{
                                                padding: "0.55rem 1.3rem",
                                                border: "1px solid gray",
                                                width: "100%",
                                               

                                            }}
                                            dropdownClassName="custom-datepicker-popup"
                                        // getPopupContainer={trigger => trigger.parentNode}
                                        />
                                    </div>
                                </div>}

                                <SelectBox
                                    label="Billing Type"
                                    options={[
                                        { label: 'Prepaid', value: 'Prepaid' },
                                        { label: 'Postpaid', value: 'Postpaid' }
                                    ]}
                                    value={deptbillingtype}
                                    onChange={(e) => setdeptbillingtype(e.target.value)}
                                    isreq={false}
                                    placeholder="Select Billing Type"
                                    maxLength={20}
                                    widthRem="16rem"          // try commenting this out to see widthPercent used
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    sidebarOpen={sidebarOpen}
                                />



                                <SelectBox
                                    label="Billing Cycle"
                                    options={[
                                        { label: '30 Days', value: '30' },
                                        { label: '45 Days', value: '45' },
                                        { label: '60 Days', value: '60' }
                                    ]}
                                    value={deptbillingcycle}
                                    onChange={(e) => setdeptbillingcycle(e.target.value)}
                                    isreq={false}
                                    placeholder="Select Billing Cycle"
                                    maxLength={15}
                                    widthRem="19.2rem"          // try commenting this out to see widthPercent used
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    sidebarOpen={sidebarOpen} // pass from App
                                />


                                <InputBox
                                    label="SPOC Name"
                                    type="text"
                                    placeholder="Enter SPOC Name"
                                    maxLength={30}
                                    isreq={false}
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    value={dspocname}
                                    onChange={(e) => setdspocname(e.target.value)}
                                    sidebarOpen={sidebarOpen}
                                />






                            </div>

                            <div className={loading === true ? "row blurred" : "row"} style={{ gap: "1.9rem" }}>
                                <InputBox
                                    label="SPOC Email ID"
                                    type="text"
                                    placeholder="Enter SPOC Email ID"
                                    maxLength={30}
                                    isreq={false}
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    value={dspocemail}
                                    onChange={(e) => setdspocemail(e.target.value)}
                                    sidebarOpen={sidebarOpen}
                                />

                                <InputBox
                                    label="SPOC Contact Number"
                                    type="text"
                                    placeholder="SPOC Contact Number"
                                    maxLength={30}
                                    isreq={false}
                                    widthPercent="31%"
                                    widthPercent950="32%"
                                    widthPercent900="49%"
                                    value={dspocmobile}
                                    onChange={(e) => setdspocmobile(e.target.value)}
                                    sidebarOpen={sidebarOpen}
                                />


                            </div>

                            <Textarea
                                label="Address"
                                placeholder="Enter Address"
                                value={deptaddress}
                                onChange={(e) => setdeptaddress(e.target.value)}
                                inwidth="101%"
                                maxLength={2000}
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button className={loading === true ? "btn btn-warning btn-glow blurred" : "btn btn-warning btn-glow"} onClick={() => setIsDeptAddModalOpen(false)} disabled={loading === true} >
                                Close
                            </Button>
                            <Button className={loading === true ? "btn btn-info btn-glow" : "btn btn-info btn-glow"} disabled={loading === true} onClick={callAddDeptAPI} >
                                Add  New
                                <i class="fa-solid fa-circle-plus" style={{ marginLeft: "0.5rem" }}></i>
                            </Button>
                        </Modal.Footer>

                    </Modal>






                </div>
            )}
        </div>
    )
};