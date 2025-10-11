import React, { useState, useMemo, useEffect, useRef } from "react";
import '../Pages/CSS/Custom CSS/Mobile.css'
import { Select } from "antd";
import SelectBox from "./Form-Elements/SelectBox";
export default function Table({ data = [], columns = [], onEdit, showprocess }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [activeFilterColumn, setActiveFilterColumn] = useState(null);
    const [originalColumns, setOriginalColumns] = useState([]); // initial columns order
const [displayColumns, setDisplayColumns] = useState([]); // current columns (with pinned changes)
    const [pinnedColumns, setPinnedColumns] = useState({});
    
const [pinnedOrder, setPinnedOrder] = useState([]); // NEW


    const tableRef = useRef(null);
    const dropdownRef = useRef(null);

    const columnOptions = useMemo(() => {
        const map = {};
        columns.forEach(({ key }) => {
            const values = data
                .map(row => row[key])
                .filter(val => val !== undefined && val !== null && val !== "")
                .map(val => val.toString().trim());
            map[key] = Array.from(new Set(values)).sort();
        });
        return map;
    }, [data, columns]);


    const handleFilterDropdownToggle = (key) => {
        setActiveFilterColumn((prev) => (prev === key ? null : key));

        setFilters((prevFilters) => {
            if (prevFilters[key]) return prevFilters;

            return {
                ...prevFilters,
                [key]: {
                    values: ["", ""],
                    logic: ["", ""], // 👈 empty string means "--Select--" by default
                    condition: "and",
                },
            };
        });
    };

    const [filters, setFilters] = useState({});

    function naturalCompare(a, b) {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    }

    // const togglePin = (key) => {
    //     setPinnedColumns((prev) => ({
    //         ...prev,
    //         [key]: !prev[key],
    //     }));
    // };

    const restoreColumns = () => {
    setDisplayColumns(originalColumns);
    setPinnedColumns({});
};

useEffect(() => {
    setOriginalColumns(columns);     // Keep a copy of initial column order
    setDisplayColumns(columns);      // Working column state
}, [columns]);

// const togglePin = (key) => {
//     setPinnedColumns((prevPinned) => {
//         const isPinned = prevPinned[key];
//         const newPinned = { ...prevPinned, [key]: !isPinned };

//         const colToMove = displayColumns.find(col => col.key === key);
//         let updatedDisplayColumns = displayColumns.filter(col => col.key !== key);

//         if (!isPinned) {
//             // PINNING: Insert after the last pinned column
//             const pinnedKeys = originalColumns
//                 .filter(col => newPinned[col.key]) // order matters!
//                 .map(col => col.key);

//             const insertIndex = pinnedKeys.length;
//             updatedDisplayColumns.splice(insertIndex, 0, colToMove);
            
//         } else {
//             // UNPINNING: Place at its original index
//             const originalIndex = originalColumns.findIndex(col => col.key === key);

//             // Count how many pinned columns are before it in the original order
//             const pinnedBefore = originalColumns
//                 .slice(0, originalIndex)
//                 .filter(col => newPinned[col.key]).length;

//             const adjustedIndex = originalIndex - pinnedBefore;
//             updatedDisplayColumns.splice(adjustedIndex, 0, colToMove);
//         }

//         setDisplayColumns(updatedDisplayColumns);
//         return newPinned;
//     });
// };




//     const togglePin = (key) => {
//     setPinnedColumns((prevPinned) => {
//         const isPinned = prevPinned[key];

//         if (isPinned) {
//             // Unpin: Move it back to unpinned group (but not original position yet)
//             const newDisplay = [...displayColumns.filter(col => col.key !== key), displayColumns.find(col => col.key === key)];
//             setDisplayColumns(newDisplay);
//         } else {
//             // Pin: Move to the left (start of array)
//             const pinnedCol = displayColumns.find(col => col.key === key);
//             const others = displayColumns.filter(col => col.key !== key);
//             setDisplayColumns([pinnedCol, ...others]);
//         }

//         return {
//             ...prevPinned,
//             [key]: !isPinned,
//         };
//     });
// };

// const togglePin = (key) => {
//     setPinnedColumns((prevPinned) => {
//         const isPinned = prevPinned[key];
//         const updatedPinned = { ...prevPinned, [key]: !isPinned };

//         // Remove the column from the current display
//         let newDisplay = displayColumns.filter(col => col.key !== key);
//         const pinnedCol = displayColumns.find(col => col.key === key);

//         if (!isPinned) {
//             // Pinned: Insert after last pinned column
//             const pinnedKeys = Object.keys(updatedPinned).filter(k => updatedPinned[k]);
//             const pinnedCount = pinnedKeys.length - 1; // since we're adding one now

//             // Insert at position after the last pinned column
//             newDisplay.splice(pinnedCount, 0, pinnedCol);
//         } else {
//             // Unpin: Move to end of unpinned section
//             newDisplay.push(pinnedCol);
//         }

//         setDisplayColumns(newDisplay);
//         return updatedPinned;
//     });
// };


const togglePin = (key) => {
    setPinnedOrder((prevOrder) => {
        let newOrder;

        if (prevOrder.includes(key)) {
            // 🔓 Unpinning: remove from pinnedOrder
            newOrder = prevOrder.filter(k => k !== key);
        } else {
            // 📌 Pinning: add to the end
            newOrder = [...prevOrder, key];
        }

        // Build new displayColumns
        const pinnedColumns = newOrder
            .map(pinKey => originalColumns.find(col => col.key === pinKey))
            .filter(Boolean); // in case column was removed or not found

        const unpinnedColumns = originalColumns.filter(
            col => !newOrder.includes(col.key)
        );

        setDisplayColumns([...pinnedColumns, ...unpinnedColumns]);
        return newOrder;
    });
};

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    // const handleFilterChange = (key, value) => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         [key]: value,
    //     }));
    // };

    // const filteredData = useMemo(() => {
    //     const safeData = Array.isArray(data) ? data : [];
    //     return safeData.filter((row) =>
    //         columns.every(({ key, disableFilter }) => {
    //             if (disableFilter) return true;
    //             const filterValue = filters[key]?.toLowerCase() || "";
    //             const cellValue = (row[key] ?? "").toString().toLowerCase();
    //             return cellValue.includes(filterValue);
    //         })
    //     );
    // }, [data, filters, columns]);

    //      const filteredData = useMemo(() => {
    //   const safeData = Array.isArray(data) ? data : [];

    //   return safeData.filter((row) =>
    //     columns.every(({ key, disableFilter }) => {
    //       if (disableFilter) return true;

    //       const filterObj = filters[key];
    //       if (!filterObj) return true;

    //       const { values = [], condition = "and" } = filterObj;
    //       const cellValue = (row[key] ?? "").toString().toLowerCase();

    //       const [val1, val2] = values.map((v) => (v ?? "").toLowerCase());

    //       const match1 = cellValue.includes(val1);
    //       const match2 = cellValue.includes(val2);

    //       if (val1 && val2) {
    //         return condition === "and" ? match1 && match2 : match1 || match2;
    //       } else if (val1) {
    //         return match1;
    //       } else if (val2) {
    //         return match2;
    //       }
    //       return true;
    //     })
    //   );
    // }, [data, filters, columns]);

    // const filteredData = data.filter(row => {
    //   return Object.keys(filters).every((key) => {
    //     const filter = filters[key];
    //     if (!filter) return true;

    //     const [value1, value2] = filter.values;
    //     const [logic1, logic2] = filter.logic || ["Contains", "Contains"];
    //     const condition = filter.condition || "and";

    //     const cellValue = String(row[key] ?? "").toLowerCase();

    //     const check = (value, logic) => {
    //       if (!value) return true;

    //       const val = value.toLowerCase();

    //       if (logic === "Contains") {
    //         return cellValue.includes(val);
    //       } else if (logic === "Equals") {
    //         return cellValue === val;
    //       } else {
    //         // assuming it's a dynamic value
    //         return cellValue === logic.toLowerCase();
    //       }
    //     };

    //     const result1 = check(value1, logic1);
    //     const result2 = check(value2, logic2);

    //     return condition === "and" ? result1 && result2 : result1 || result2;
    //   });
    // });

    const filteredData = useMemo(() => {
        return data.filter(row => {
            return columns.every(({ key, disableFilter }) => {
                if (disableFilter) return true;

                const filter = filters[key];
                if (!filter) return true;

                const values = filter.values || ["", ""];
                const logics = filter.logic || ["Contains", "Contains"];
                const condition = filter.condition || "and";

                const cellValue = String(row[key] ?? "").toLowerCase();

                const check = (logic, value) => {
                    logic = logic?.toLowerCase();
                    value = value?.toLowerCase();

                    if (!logic && !value) return true; // nothing to filter

                    if (logic === "contains") {
                        return cellValue.includes(value);
                    }

                    if (logic === "equals") {
                        return cellValue === value;
                    }

                    // if logic itself is a dynamic value (e.g., selected from dropdown)
                    // and input is empty, use logic as the filter value
                    if (!value && logic) {
                        return cellValue === logic;
                    }

                    return true;
                };

                const result1 = check(logics[0], values[0]);
                const result2 = check(logics[1], values[1]);

                return condition === "and" ? result1 && result2 : result1 || result2;
            });
        });
    }, [data, filters, columns]);

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;
        return [...filteredData].sort((a, b) => {
            const valA = a[sortConfig.key] ?? "";
            const valB = b[sortConfig.key] ?? "";
            const result = naturalCompare(String(valA), String(valB));
            return sortConfig.direction === "asc" ? result : -result;
        });
    }, [filteredData, sortConfig]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (tableRef.current && !tableRef.current.contains(event.target)) {
                setActiveFilterColumn(null); // close any open filter dropdown
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveFilterColumn(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log("Filters changed:", filters);
    }, [filters]);

    return (
        <div ref={tableRef}
            className={showprocess === true ? "table-responsive table-scroll blurred" : "table-responsive table-scroll"} style={{ overflowX: "auto", position: "relative", minHeight: "15rem" }}>
            <table className="table table-bordered table-hover" style={{ width: "100%", tableLayout: "auto", height: "auto" }}>
                <thead>
                    <tr style={{ backgroundColor: "#d6e9f7ff", fontSize: "0.95rem", fontWeight: "500", }}>
                        {displayColumns.map(({ key, label, disableFilter }) => (
                            <th
                                key={key}
                                onClick={(e) => {
                                    // Only sort if the click is NOT on an interactive element
                                    const target = e.target;
                                    const tagName = target.tagName.toLowerCase();
                                    if (["input", "select", "button", "textarea", "label"].includes(tagName)) return;

                                    handleSort(key);
                                }}
                                style={{
                                    cursor: "pointer",
                                    position: "relative",
                                    fontWeight: "500"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                                    {label}
                                    {key !== "Action" && (
                                        <span
                                            style={{ marginLeft: "0.6rem", marginRight: "0.2rem", position: "relative" }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent sorting
                                                handleFilterDropdownToggle(key);
                                            }}
                                        >
                                            <img
                                                src={`${process.env.PUBLIC_URL}/images/Icon-Images/filter.png`}
                                                style={{ width: "1rem", marginTop: "-0.1rem" }}
                                                alt="filter"
                                            />
                                            <i className="fa-solid fa-angle-down" style={{ fontSize: "0.5rem", position: 'absolute', bottom: "0.1rem" }}></i>

                                            <img
                                                src={`${process.env.PUBLIC_URL}/images/Icon-Images/push-pin (3).png`}
                                                style={{ width: "0.9rem", marginLeft: "0.9rem" }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent dropdown or sort from toggling
                                                    togglePin(key);
                                                }}
                                                alt="Pin"
                                            />
                                        </span>

                                    )}


                                    {/* <span className={`diagonal-line ${pinnedColumns[key] ? 'show-diagonal' : ''}`}></span> */}
                                    <span className={`diagonal-line ${pinnedOrder.includes(key) ? 'show-diagonal' : ''}`}></span>

                                </div>

                                {activeFilterColumn === key && (
                                    <div
                                        className="table-dropdown"
                                        ref={dropdownRef}
                                        style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                                    >

                                        {/* First Logic Select */}
                                        <div className="select-div">
                                            <select
                                                style={{
                                                    padding: "0.15rem 0.1rem",
                                                    width: '96%',
                                                    margin: "0.2rem",
                                                    fontSize: '0.82rem',
                                                    outline: "none",
                                                    color: "gray"
                                                }}
                                                value={filters[key]?.logic?.[0] ?? ""}

                                                onChange={(e) => {
                                                    const newFilters = { ...filters };
                                                    if (!newFilters[key]) {
                                                        newFilters[key] = {
                                                            values: ["", ""],
                                                            logic: ["Contains", "Contains"],
                                                            condition: "and"
                                                        };
                                                    }
                                                    newFilters[key].logic[0] = e.target.value;
                                                    setFilters(newFilters);

                                                }}
                                            >
                                                <option value="" disabled>-- Select --</option> {/* 👈 Default empty option */}
                                                <option value="Contains">Contains</option>
                                                {columnOptions[key]?.map((val, i) => (
                                                    <option key={i} value={val}>{val}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* First Input */}
                                        <div className="select-div" style={{ width: "94%" }}>
                                            <input
                                                type="text"
                                                style={{
                                                    width: "100%",
                                                    padding: "0.15rem 0.3rem",
                                                    fontSize: "0.82rem",
                                                    boxSizing: "border-box"
                                                }}
                                                placeholder="Search..."
                                                className="no-border-input"
                                                value={filters[key]?.values?.[0] || ""}

                                                disabled={filters[key]?.logic?.[0] !== "Contains"}  // Enabled only if logic is "Contains"
                                                onChange={(e) => {
                                                    const newFilters = { ...filters };
                                                    if (!newFilters[key]) {
                                                        newFilters[key] = {
                                                            values: ["", ""],
                                                            logic: ["Contains", "Contains"],
                                                            condition: "and"
                                                        };
                                                    }
                                                    newFilters[key].values[0] = e.target.value;
                                                    setFilters(newFilters);
                                                }}
                                            />
                                        </div>

                                        {/* AND / OR Radio */}
                                        <div style={{ padding: "0.15rem 0.1rem", display: "flex", justifyContent: "center", marginTop: "0.2rem" }}>
                                            <div className="d-flex justify-content-center gap-2" style={{ gap: "15px" }}>
                                                <label className="and">
                                                    <input
                                                        type="radio"
                                                        name={`condition-${key}`}
                                                        checked={filters[key]?.condition === "and"}
                                                        onChange={() =>
                                                            setFilters((prev) => ({
                                                                ...prev,
                                                                [key]: { ...prev[key], condition: "and" },
                                                            }))
                                                        }
                                                    /> AND
                                                </label>
                                                <label className="or">
                                                    <input
                                                        type="radio"
                                                        name={`condition-${key}`}
                                                        checked={filters[key]?.condition === "or"}
                                                        onChange={() =>
                                                            setFilters((prev) => ({
                                                                ...prev,
                                                                [key]: { ...prev[key], condition: "or" },
                                                            }))
                                                        }
                                                    /> OR
                                                </label>
                                            </div>
                                        </div>

                                        {/* Second Logic Select */}
                                        <div className="select-div">
                                            <select
                                                style={{
                                                    padding: "0.15rem 0.1rem",
                                                    width: '96%',
                                                    margin: "0.2rem",
                                                    marginTop: "-0.5rem",
                                                    fontSize: '0.82rem',
                                                    outline: "none",
                                                    color: "gray"
                                                }}

                                                value={filters[key]?.logic?.[1] ?? ""}
                                                onChange={(e) => {
                                                    const newFilters = { ...filters };
                                                    if (!newFilters[key]) {
                                                        newFilters[key] = {
                                                            values: ["", ""],
                                                            logic: ["Contains", "Contains"],
                                                            condition: "and"
                                                        };
                                                    }
                                                    newFilters[key].logic[1] = e.target.value;
                                                    setFilters(newFilters);
                                                }}
                                            >
                                                <option value="" disabled>-- Select --</option>
                                                <option value="Contains">Contains</option>
                                                {columnOptions[key]?.map((val, i) => (
                                                    <option key={i} value={val}>{val}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Second Input */}
                                        <div className="select-div" style={{ width: "94%" }}>
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="no-border-input"
                                                style={{
                                                    width: "100%",
                                                    padding: "0.15rem 0.3rem",
                                                    fontSize: "0.82rem",
                                                    boxSizing: "border-box"
                                                }}
                                                value={filters[key]?.values?.[1] || ""}
                                                disabled={filters[key]?.logic?.[1] !== "Contains"}  // Enabled only if logic is "Contains"
                                                onChange={(e) => {
                                                    const newFilters = { ...filters };
                                                    if (!newFilters[key]) {
                                                        newFilters[key] = {
                                                            values: ["", ""],
                                                            logic: ["Contains", "Contains"],
                                                            condition: "and"
                                                        };
                                                    }
                                                    newFilters[key].values[1] = e.target.value;
                                                    setFilters(newFilters);
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                    
                </thead>
               
                <tbody style={{ backgroundColor: "#fff" }}>
                    {sortedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "1rem", fontSize: "0.9rem", fontStyle: "italic" }}>
                                <img src={`images/NoReport.png`} style={{ width: "4rem", height: "4rem", marginBottom: '1rem', marginTop: '2rem' }} />
                                <br />
                                No records found ...
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((row, idx) => (
                            <tr key={idx}>
                                {displayColumns.map(({ key }) => (
                                    <td
                                        key={key}
                                        style={{
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {key === "Action" ? (
                                            <button
                                                type="button"
                                                className="btn btn-outline-info round btn-glow btn-sm"
                                                style={{
                                                    margin: "0rem",
                                                    marginTop: "-0.5rem",
                                                    marginBottom: "-0.3rem"
                                                }}
                                                onClick={() => onEdit?.(row)}
                                                data-toggle="modal"
                                                data-target="#exampleModal"
                                            >
                                                <i className="fa fa-edit"></i>
                                            </button>
                                        ) : (
                                            row[key] !== null && row[key] !== undefined && row[key] !== ""
                                                ? row[key]
                                                : "-"
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}