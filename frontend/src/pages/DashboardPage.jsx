import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Code, Briefcase, MapPin, Save, Edit2 } from "lucide-react";

const DashboardPage = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: user.fullname,
        skills: user.requirment.skills.join(", "),
        experience_years: user.requirment.experience_years,
        degree: user.requirment.education.degree,
        field: user.requirment.education.field,
        cgpa: user.requirment.education.cgpa,
        preferred_locations: user.requirment.preferred_locations.join(", "),
        preferred_roles: user.requirment.preferred_roles.join(", "),
        expected_salary: user.requirment.expected_salary
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Updating profile...");
        try {
            const response = await api.post("/user/update", formData);
            updateUser(response.data.data);
            toast.success("Profile updated!", { id: loadingToast });
            setIsEditing(false);
        } catch (err) {
            toast.error(err.message || "Update failed", { id: loadingToast });
        }
    };

    const InfoRow = ({ icon: Icon, label, value }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ color: 'var(--primary)' }}><Icon size={20} /></div>
            <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</p>
                <p style={{ fontWeight: 500 }}>{value}</p>
            </div>
        </div>
    );

    return (
        <div style={{ padding: '40px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 className="gradient-text">Your Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={isEditing ? "btn btn-outline" : "btn btn-primary"}
                >
                    {isEditing ? "Cancel" : <><Edit2 size={18} /> Edit Profile</>}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isEditing ? '1fr' : '1fr 1fr', gap: '30px' }}>
                {!isEditing ? (
                    <>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px' }}>Personal & Education</h3>
                            <InfoRow icon={User} label="Full Name" value={user.fullname} />
                            <InfoRow icon={Mail} label="Email Address" value={user.email} />
                            <InfoRow icon={GraduationCap} label="Education" value={`${user.requirment.education.degree} in ${user.requirment.education.field}`} />
                            <InfoRow icon={CheckCircle} label="CGPA" value={`${user.requirment.education.cgpa} / 10`} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass" style={{ padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px' }}>Career Preferences</h3>
                            <InfoRow icon={Code} label="Skills" value={user.requirment.skills.join(", ")} />
                            <InfoRow icon={Briefcase} label="Experience" value={`${user.requirment.experience_years} Years`} />
                            <InfoRow icon={MapPin} label="Preferred Locations" value={user.requirment.preferred_locations.join(", ")} />
                            <InfoRow icon={Edit2} label="Preferred Roles" value={user.requirment.preferred_roles.join(", ")} />
                            <InfoRow icon={DollarSign} label="Expected Salary" value={`₹${user.requirment.expected_salary.toLocaleString()} / year`} />
                        </motion.div>
                    </>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: '30px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label className="input-label">Full Name</label>
                                <input name="fullname" className="input-field" value={formData.fullname} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Skills</label>
                                <input name="skills" className="input-field" value={formData.skills} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Experience (Years)</label>
                                <input type="number" name="experience_years" className="input-field" value={formData.experience_years} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Degree</label>
                                <input name="degree" className="input-field" value={formData.degree} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Field</label>
                                <input name="field" className="input-field" value={formData.field} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">CGPA</label>
                                <input name="cgpa" className="input-field" value={formData.cgpa} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Expected Salary</label>
                                <input name="expected_salary" className="input-field" value={formData.expected_salary} onChange={handleChange} required />
                            </div>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label className="input-label">Preferred Locations</label>
                                <input name="preferred_locations" className="input-field" value={formData.preferred_locations} onChange={handleChange} required />
                            </div>
                            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                                <label className="input-label">Preferred Roles</label>
                                <input name="preferred_roles" className="input-field" value={formData.preferred_roles} onChange={handleChange} required />
                            </div>
                            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const CheckCircle = ({ size, color }) => <Zap size={size} color={color} />; // Fallback

export default DashboardPage;
