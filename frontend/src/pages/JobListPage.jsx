import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Zap, AlertCircle, CheckCircle } from "lucide-react";

const JobListPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [matchingJobId, setMatchingJobId] = useState(null);
    const [matchResult, setMatchResult] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get("/job/alljobs");
            setJobs(response.data.data);
        } catch (err) {
            toast.error("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    const handleMatch = async (jobId) => {
        setMatchingJobId(jobId);
        setMatchResult(null);
        const loadingToast = toast.loading("Analyzing compatibility...");
        try {
            const response = await api.post("/user/match", { job_id: jobId });
            setMatchResult(response.data.data);
            toast.success("Match analysis complete!", { id: loadingToast });
        } catch (err) {
            toast.error(err.message || "Match calculation failed", { id: loadingToast });
            setMatchingJobId(null);
        }
    };

    if (loading) return <div className="page-center"><Zap className="animate-pulse" size={48} color="var(--primary)" /></div>;

    return (
        <div style={{ padding: '40px 0' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 className="gradient-text">Available Opportunities</h1>
                <p>Discover roles that align with your skills and aspirations.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                {jobs.map((job) => (
                    <motion.div
                        key={job.job_id}
                        layoutId={job.job_id}
                        className="glass"
                        style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}
                        whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{job.title}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{job.company}</p>
                            </div>
                            <div style={{ background: 'var(--surface)', padding: '8px', borderRadius: '8px', color: 'var(--text-muted)' }}>
                                {job.job_id}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                <MapPin size={16} /> {job.location}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                <Briefcase size={16} /> {job.experience_required.min}-{job.experience_required.max} years
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                <DollarSign size={16} /> ₹{job.salary_range[0].toLocaleString()} - ₹{job.salary_range[1].toLocaleString()}
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: 'var(--text-muted)' }}>Required Skills</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {job.required_skills.map(skill => (
                                    <span key={skill} style={{ padding: '4px 12px', background: 'var(--surface-hover)', borderRadius: '20px', fontSize: '0.85rem' }}>{skill}</span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => handleMatch(job.job_id)}
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            disabled={matchingJobId === job.job_id}
                        >
                            {matchingJobId === job.job_id ? "Analyzing..." : "Check Match Score"}
                        </button>

                        <AnimatePresence>
                            {matchResult && matchingJobId === job.job_id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 600 }}>Match Score</span>
                                        <span style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 800,
                                            color: matchResult.match_score > 70 ? 'var(--success)' : 'var(--primary)'
                                        }}>
                                            {matchResult.match_score}%
                                        </span>
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{matchResult.recommendation_reason}</p>
                                        {matchResult.missing_skills?.length > 0 && (
                                            <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', display: 'flex', gap: '8px' }}>
                                                <AlertCircle size={16} color="var(--error)" style={{ flexShrink: 0 }} />
                                                <span style={{ fontSize: '0.8rem', color: 'var(--error)' }}>
                                                    Missing: {matchResult.missing_skills.join(", ")}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="breakdown" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {Object.entries(matchResult.breakdown).map(([key, val]) => (
                                            <div key={key} style={{ fontSize: '0.8rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ textTransform: 'capitalize' }}>{key.replace('_', ' ')}</span>
                                                    <span>{val}%</span>
                                                </div>
                                                <div style={{ width: '100%', height: '4px', background: 'var(--surface)', borderRadius: '2px' }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${val}%` }}
                                                        style={{ height: '100%', background: val > 50 ? 'var(--primary)' : 'var(--text-muted)', borderRadius: '2px' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default JobListPage;
