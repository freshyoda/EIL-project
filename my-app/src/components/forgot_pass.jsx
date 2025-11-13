import React, { useState, useEffect } from "react";

// const BASE_URL = "http://localhost:8080"; // Update with real backend URL

function ForgotPassword() {
    useEffect(() => {
        document.title = "EIL-Forgot Password-Login";
    }, []);

    const [step, setStep] = useState(1); // 1=enter, 2=reset
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userVerified, setUserVerified] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle verifying username/email with backend
    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        // try {
        //     const response = await fetch(`${BASE_URL}/verify-user`, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ username: username || email, email }),
        //     });
        //     if (response.ok) {
        //         setUserVerified(true);
        //         setStep(2);
        //         setSuccess("User verified. Please set a new password.");
        //     } else {
        //         const data = await response.json();
        //         setError(data.error || "User not found.");
        //     }
        // } catch {
        //     setError("Server error. Please try again.");
        // } finally {
        //     setLoading(false);
        // }
        setUserVerified(true);
        setStep(2);
        setSuccess("User verified. Please set a new password.");
    };

    // Handle resetting password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username || email,
                    email,
                    newPassword,
                }),
            });
            if (response.ok) {
                setSuccess("Password reset successful! You can now login.");
                setStep(3);
            } else {
                const data = await response.json();
                setError(data.error || "Reset failed.");
            }
        } catch {
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: "url(./src/assets/EILPHOTO.jpg)" }}>
            <div className="flex items-center justify-center min-h-screen min-w-full backdrop-blur-sm">
                <div className="bg-white/80 p-8 rounded-lg shadow-xl w-full max-w-sm text-center shadow-[8px_8px_20px_rgba(0,0,0,0.25)]">
                    <img
                        src="./src/assets/EILPHOTO2.png"
                        alt="Company Logo"
                        className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg"
                    />
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Forgot Password</h2>

                    {/* Step 1: User identification */}
                    {step === 1 && (
                        <form onSubmit={handleVerify}>
                            <div className="mb-4 text-left">
                                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                                    Username or Email
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    required
                                    value={username}
                                    placeholder="Enter username or email"
                                    onChange={(e) => {
                                        setError(""); setUsername(e.target.value);
                                    }}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
                            >
                                {loading ? "Verifying..." : "Verify"}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        </form>
                    )}

                    {/* Step 2: Reset password */}
                    {step === 2 && (
                        <form onSubmit={handleResetPassword}>
                            <div className="mb-4 text-left">
                                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    required
                                    value={newPassword}
                                    minLength={6}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                            </div>
                            <div className="mb-4 text-left">
                                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    minLength={6}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                            {success && <p className="text-green-600 text-sm mt-4">{success}</p>}
                        </form>
                    )}

                    {/* Step 3: Done */}
                    {step === 3 && (
                        <div>
                            <p className="text-green-600 font-semibold mb-4">{success}</p>
                            <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
                                Back to Login
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
