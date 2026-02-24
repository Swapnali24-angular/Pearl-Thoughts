"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [inputValue, setInputValue] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        setError("");

        // Basic validation
        if (!inputValue.trim()) {
            setError("Please enter your Mobile or Email");
            return;
        }

        if (!password) {
            setError("Please enter your password");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(inputValue) && !mobileRegex.test(inputValue)) {
            setError("Please enter a valid Email or 10-digit Mobile Number");
            return;
        }

        // Stricter password check (matches signup)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Incorrect password format. Please check and try again.");
            return;
        }

        console.log("Logging in with:", { inputValue, password });
        router.push("/otp");
    };

    const handleGoogleLogin = () => {
        console.log("Opening Google Login popup...");

        // Define popup dimensions and position
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        // Official Google OAuth 2.0 URL
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com&` +
            `redirect_uri=${window.location.origin}/login&` +
            `response_type=token&` +
            `scope=email%20profile&` +
            `prompt=select_account`;

        // Open the Google account picker popup
        window.open(
            googleAuthUrl,
            "GoogleLogin",
            `width=${width},height=${height},left=${left},top=${top}`
        );

    };


    return (
        <div className="login-wrapper">
            <div className="login-card">
                {/* Logo */}
                <div className="logo-box">
                    <img src="/assets/images/logo.png" alt="" />
                </div>

                <label className="label">Mobile / Email</label>
                <input
                    type="text"
                    placeholder="Login with Mobile or Email"
                    className="input"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        if (error) setError("");
                    }}
                    autoComplete="off"
                    {...{ "data-nordpass-ignore": "true" }}
                />

                <label className="label">Password</label>
                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="input"
                        value={password}
                        autoComplete="off"
                        {...{ "data-nordpass-ignore": "true" }}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError("");
                        }}
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


                {error && <p className="error-message">{error}</p>}

                <div className="row">
                    <label className="remember">
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <span className="forgot">Forgot Password</span>
                </div>

                <button
                    className="login-btn"
                    onClick={handleLogin}
                    {...{ "data-nordpass-ignore": "true" }}
                >
                    Login
                </button>

                <div className="divider">
                    <span>Or login with</span>
                </div>

                <button className="google-btn" onClick={handleGoogleLogin}>
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                    />
                    Continue with Google
                </button>

                <p className="signup">
                    Don’t have an account?{" "}
                    <span
                        className="signup-link"
                        onClick={() => router.push("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}
