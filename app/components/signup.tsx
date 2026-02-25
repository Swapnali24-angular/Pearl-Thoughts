"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.fullName || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (formData.mobile.length !== 10 || isNaN(Number(formData.mobile))) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("Password must be 8+ chars with uppercase, lowercase, number & special char");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        console.log("Signing up with:", formData);
        localStorage.setItem("pending_user", JSON.stringify(formData));
        router.push("/otp");
    };

    return (
        <div className="login-wrapper">
            <div className="compact-card">
                <div className="back-btn" onClick={() => router.push("/login")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    <span>Back to Login</span>
                </div>

                <div className="logo-box">
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>

                <h2 className="otp-title">Create Account</h2>
                <p className="otp-subtitle">Join us today! It only takes a minute.</p>

                <form onSubmit={handleSignup}>
                    <label className="label">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        className="input"
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <label className="label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label className="label">Mobile Number</label>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Enter 10-digit mobile number"
                        className="input"
                        value={formData.mobile}
                        onChange={handleChange}
                    />

                    <label className="label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a password"
                            className="input"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" /><circle cx="12" cy="12" r="3" /></svg>
                            )}
                        </button>
                    </div>

                    <label className="label">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        className="input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-btn">
                        Create Account
                    </button>
                </form>

                <p className="signup">
                    Already have an account?
                    <span
                        className="signup-link"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
