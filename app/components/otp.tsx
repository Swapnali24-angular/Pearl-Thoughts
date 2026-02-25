"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OTP() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState("");
    const router = useRouter();
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs[index + 1].current?.focus();
        }

        if (error) setError("");
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleVerify = () => {
        const otpValue = otp.join("");
        if (otpValue.length < 6) {
            setError("Please enter the complete 6-digit OTP");
            return;
        }

        if (otpValue === "123456") {
            const pendingUser = localStorage.getItem("pending_user");
            if (pendingUser) {
                localStorage.setItem("active_user", pendingUser);
            }
            alert("Verification Successful!");
            router.push("/home");
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    const handleResend = () => {
        if (timer === 0) {
            setTimer(30);
            setOtp(["", "", "", "", "", ""]);
            inputRefs[0].current?.focus();
            setError("");
            alert("OTP Resent!");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="back-btn" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    Back
                </div>

                <div className="logo-box">
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>

                <h2 className="otp-title">Verify OTP</h2>
                <p className="otp-subtitle">We've sent a 6-digit code to your registered Mobile/Email</p>

                <div className="otp-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            maxLength={1}
                            className="otp-input"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>

                {error && <p className="error-message centered">{error}</p>}

                <div className="resend-box">
                    {timer > 0 ? (
                        <span>Resend OTP in <b>{timer}s</b></span>
                    ) : (
                        <span className="resend-link" onClick={handleResend}>Resend OTP</span>
                    )}
                </div>

                <button className="login-btn" onClick={handleVerify}>
                    Verify & Proceed
                </button>
            </div>
        </div>
    );
}
