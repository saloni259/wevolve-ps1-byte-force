import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Briefcase, User, LogOut, Search } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav className="glass" style={{ margin: '20px', padding: '10px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 100 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px' }}>
                    <Briefcase size={20} color="white" />
                </div>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '1px' }}>WEVOLVE</span>
            </Link>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                <Link to="/jobs" className="nav-link" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Search size={18} /> Jobs
                </Link>
                <Link to="/dashboard" className="nav-link" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} /> Profile
                </Link>
                <button onClick={handleLogout} className="btn-outline" style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <style>{`
        .nav-link:hover { color: var(--text) !important; }
      `}</style>
        </nav>
    );
};

export default Navbar;
