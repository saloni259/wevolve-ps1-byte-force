import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Logging in...");
        try {
            await login(email, password);
            toast.success("Welcome back!", { id: loadingToast });
            navigate("/jobs");
        } catch (err) {
            toast.error(err.message || "Failed to login", { id: loadingToast });
        }
    };

    return (
        <div className="page-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{ padding: '40px', width: '100%', maxWidth: '400px' }}
            >
                <h2 style={{ marginBottom: '30px', textAlign: 'center' }} className="gradient-text">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                            required
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                        <LogIn size={20} /> Sign In
                    </button>
                </form>
                <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
