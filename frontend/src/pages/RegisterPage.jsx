import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight, ArrowLeft, Check } from "lucide-react";

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        skills: "",
        experience_years: 0,
        degree: "",
        field: "",
        cgpa: "",
        preferred_locations: "",
        preferred_roles: "",
        expected_salary: "",
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Creating account...");
        try {
            await register(formData);
            toast.success("Account created successfully!", { id: loadingToast });
            navigate("/jobs");
        } catch (err) {
            toast.error(err.message || "Registration failed", { id: loadingToast });
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="page-center" style={{ padding: '40px 0' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '40px', width: '100%', maxWidth: '600px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 className="gradient-text">Join Wevolve</h2>
                    <p>Step {step} of 3</p>
                    <div style={{ width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px', marginTop: '10px' }}>
                        <motion.div
                            animate={{ width: `${(step / 3) * 100}%` }}
                            style={{ height: '100%', background: 'var(--primary)', borderRadius: '2px' }}
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <div className="input-group">
                                <label className="input-label">Full Name</label>
                                <input name="fullname" className="input-field" value={formData.fullname} onChange={handleChange} required placeholder="John Doe" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Email Address</label>
                                <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <input type="password" name="password" className="input-field" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
                            </div>
                            <button type="button" onClick={nextStep} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Next <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <div className="input-group">
                                <label className="input-label">Degree (e.g. B.Tech)</label>
                                <input name="degree" className="input-field" value={formData.degree} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Field of Study (e.g. Computer Science)</label>
                                <input name="field" className="input-field" value={formData.field} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">CGPA</label>
                                <input type="number" step="0.1" name="cgpa" className="input-field" value={formData.cgpa} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Experience (Years)</label>
                                <input type="number" name="experience_years" className="input-field" value={formData.experience_years} onChange={handleChange} required />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" onClick={prevStep} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <button type="button" onClick={nextStep} className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                                    Next <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <div className="input-group">
                                <label className="input-label">Skills (Comma separated)</label>
                                <input name="skills" className="input-field" value={formData.skills} onChange={handleChange} required placeholder="Python, React, Docker" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Preferred Locations (Comma separated)</label>
                                <input name="preferred_locations" className="input-field" value={formData.preferred_locations} onChange={handleChange} required placeholder="Bangalore, remote" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Preferred Roles (Comma separated)</label>
                                <input name="preferred_roles" className="input-field" value={formData.preferred_roles} onChange={handleChange} required placeholder="Backend Developer, SDE" />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Expected Salary (Annual)</label>
                                <input type="number" name="expected_salary" className="input-field" value={formData.expected_salary} onChange={handleChange} required placeholder="800000" />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="button" onClick={prevStep} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                                    <ArrowLeft size={18} /> Back
                                </button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                                    <Check size={18} /> Complete Registration
                                </button>
                            </div>
                        </motion.div>
                    )}
                </form>

                <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
