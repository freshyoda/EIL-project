import React, { useState, useRef, useEffect } from 'react';
import { FaRegCopy } from 'react-icons/fa';

function Dashboard() {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    const [checkedIn, setCheckedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        document.title = "EIL-Employee Dashboard";
    }, []);

    const details = {
        "Employee ID": userData?.employeeId || "",
        "First Name": (userData?.name || "").split(' ')[0],
        "Middle Name": "",
        "Last Name": (userData?.name || "").split(' ')[1] || "",
        "Date Of Birth": userData?.dateOfBirth || "",
        "E-Mail": userData?.email || "",
        "Phone No.": userData?.phoneNo || "",
        "Department": userData?.department || "",
        "Designation": userData?.designation || "",
        "Join Date": userData?.joinDate || "",
        "Street": userData?.street || "",
        "City": userData?.city || "",
        "ZIP Code": userData?.zipCode || "",
        "State": userData?.state || ""
    };

    const jobList = [
    {
        jobId: "1234",
        description: "Design new landing page",
        deadline: "2025-07-30",
        assignmentDate: "2025-07-20",
        status: "Pending"
    },
    {
        jobId: "1235",
        description: "Fix DB connection",
        deadline: "2025-07-25",
        assignmentDate: "2025-07-15",
        status: "Ongoing"
    },
    {
        jobId: "1236",
        description: "Set up analytics dashboard",
        deadline: "2025-07-21",
        assignmentDate: "2025-07-10",
        status: "Cancelled"
    }
];


    const handleCheckIn = async () => {
        setLoading(true);
        // try {
        //     // POST to your backend to mark check-in time
        //     const response = await fetch('http://localhost:8080/api/checkin', {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ userId }),
        //     });
        //     if (response.ok) {
        //         setCheckedIn(true); // toggle button state
        //     } else {
        //         alert("Check-in failed");
        //     }
        // } catch (err) {
        //     alert("Server error during check-in");
        // }
        setCheckedIn(true);
        setLoading(false);
    };

    const handleCheckOut = async () => {
        setLoading(true);
        // try {
        //     // POST to your backend to mark check-out time
        //     const response = await fetch('http://localhost:8080/api/checkout', {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ userId }),
        //     });
        //     if (response.ok) {
        //         setCheckedIn(false); // back to CheckIn
        //     } else {
        //         alert("Check-out failed");
        //     }
        // } catch (err) {
        //     alert("Server error during check-out");
        // }
        setCheckedIn(false);
        setLoading(false);
    };

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // reset after 1.5s
        });
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-200 text-yellow-800";
            case "ongoing":
                return "bg-green-200 text-green-800";
            case "cancelled":
                return "bg-red-200 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    return (
        <div className='text-black'>
            <div className="grid grid-cols-3 gap-10 m-5 max-width-[100vw]">
                <div className="col-span-1 bg-gray-100 shadow-md rounded-lg h-[400px]" >
                    <img src="./src/assets/profile_placeholder.png" alt="profile" className="relative relative top-4 border-4 border-gray-400 w-[250px] h-[250px] rounded-full m-auto" />

                    <div className="text-center text-3xl font-bold relative top-5">
                        {details["First Name"]} {details["Middle Name"]} {details["Last Name"]}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="text-center text-sm relative top-5 font-semibold" id="empId"
                        >
                            {details["Employee ID"]}
                        </div>

                        <button
                            onClick={() => handleCopy(details["Employee ID"])}
                            className="relative top-5 flex items-center space-x-2 bg-gray-100 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded-md shadow-sm active:scale-95 transition"
                        >
                            <FaRegCopy />
                        </button>
                    </div>
                    <button
                        onClick={checkedIn ? handleCheckOut : handleCheckIn}
                        disabled={loading}
                        className={`px-3 py-2 rounded-10 font-bold text-white transition relative top-5 flex items-center m-auto
        ${checkedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
        focus:outline-none`}
                    >
                        {loading ? "Processing..." : checkedIn ? "CheckOut" : "CheckIn"}
                    </button>
                </div>
                <div className="col-span-2 bg-footer rounded-lg h-[400px] overflow-x-hidden overflow-y-auto">
                    <div className="text-center text-2xl font-bold m-5 underline text-footerfollowElem">EMPLOYEE DETAILS</div>
                    {/* <ul className="relative left-10 flex flex-wrap gap-10">
                        {displayDetails()}
                    </ul> */}
                    <div className="p-6 rounded-lg space-y-8">

                        {/* EMPLOYEE ID */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Employee ID</h2>
                            <div className="flex items-center justify-between bg-blue-50 p-3 rounded shadow">
                                <span className="font-medium">Employee ID</span>
                                <div className="flex items-center gap-2">
                                    <span>{details["Employee ID"]}</span>
                                    <button onClick={() => handleCopy(details["Employee ID"])} className="text-gray-600 hover:text-black bg-transparent">
                                        <FaRegCopy />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PERSONAL INFORMATION SECTION */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["First Name", "Middle Name", "Last Name", "Date Of Birth"].map((key) => (
                                    <div key={key} className="flex items-center justify-between bg-blue-50 p-3 rounded shadow">
                                        <span className="font-medium">{key}</span>
                                        <div className="flex items-center gap-2">
                                            <span>{details[key]}</span>
                                            <button onClick={() => handleCopy(details[key])} className="text-gray-600 hover:text-black bg-transparent">
                                                <FaRegCopy />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CONTACT INFORMATION SECTION */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["E-Mail", "Phone No."].map((key) => (
                                    <div key={key} className="flex items-center justify-between bg-blue-50 p-3 rounded shadow">
                                        <span className="font-medium">{key}</span>
                                        <div className="flex items-center gap-2">
                                            <span>{details[key]}</span>
                                            <button onClick={() => handleCopy(details[key])} className="text-gray-600 hover:text-black bg-transparent">
                                                <FaRegCopy />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WORK DETAILS SECTION */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Work Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {["Department", "Designation", "Join Date"].map((key) => (
                                    <div key={key} className="flex items-center justify-between bg-blue-50 p-3 rounded shadow">
                                        <span className="font-medium">{key}</span>
                                        <div className="flex items-center gap-2">
                                            <span>{details[key]}</span>
                                            <button onClick={() => handleCopy(details[key])} className="text-gray-600 hover:text-black bg-transparent">
                                                <FaRegCopy />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ADDRESS SECTION */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Address Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Street", key: "Street" },
                                    { label: "City", key: "City" },
                                    { label: "ZIP Code", key: "ZIP Code" },
                                    { label: "State", key: "State" }
                                ].map(({ label, key }) => (
                                    <div key={key} className="flex items-center justify-between bg-blue-50 p-3 rounded shadow">
                                        <span className="font-medium">{label}</span>
                                        <div className="flex items-center gap-2">
                                            <span>{details[key]}</span>
                                            <button onClick={() => handleCopy(details[key])} className="text-gray-600 hover:text-black bg-transparent">
                                                <FaRegCopy />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-[30px]">
                <h1 className="text-2xl font-bold mb-4 underline text-footerfollowElem">ASSIGNMENTS LIST</h1>
                <h5 className="text-gray-500 mb-4">(Shows 10 latest assignments only*)</h5>
                <div className="grid grid-cols-5 font-semibold text-gray-700 border-b pb-2">
                    <div>Job ID</div>
                    <div>Job Description</div>
                    <div>Assignment Date</div>
                    <div className="text-red-600">Deadline</div>
                    <div>Status</div>
                </div>

                {/* Table Rows */}
                {jobList.map((job) => (
                    <div key={job.jobId} className="grid grid-cols-5 py-3 border-b items-center text-sm">
                        <div>{job.jobId}</div>
                        <div>{job.description}</div>
                        <div>{job.assignmentDate}</div>
                        <div className="text-red-500 font-medium">{job.deadline}</div>
                        <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(job.status)}`}>
                                {job.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;