export default function Login() {
    return (
        <div className="login-wrapper">
            <div className="login-card">
                {/* Logo */}
                <div className="logo-box">
                    <img src="/assets/images/logo.png" />
                </div>

                <label className="label">Mobile / Email</label>
                <input
                    type="text"
                    placeholder="Login with Mobile or Email"
                    className="input"
                />

                <div className="row">
                    <label className="remember">
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <span className="forgot">Forgot Password</span>
                </div>

                <button className="login-btn">Login</button>

                <div className="divider">
                    <span>Or login with</span>
                </div>

                <button className="google-btn">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                    />
                    Continue with Google
                </button>

                <p className="signup">
                    Don’t have an account? <span>Sign Up</span>
                </p>
            </div>
        </div>
    );
}