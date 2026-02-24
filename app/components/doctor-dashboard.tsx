"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [appointments, setAppointments] = useState<any[]>([]);
    const [docInfo, setDocInfo] = useState({
        name: "Dr. Arjun",
        initials: "AM",
        experience: "14 Yrs"
    });
    const [stats, setStats] = useState({
        scheduledToday: 0,
        newPatients: 0,
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load content
        const savedApts = localStorage.getItem("doctor_appointments_v1");
        const savedInfo = localStorage.getItem("doctor_profile");

        if (savedApts) {
            setAppointments(JSON.parse(savedApts));
        } else {
            const defaults = [
                { id: 1, patient: "Rahul Sharma", time: "09:30 AM", status: "Confirmed", type: "First Visit" },
                { id: 2, patient: "Sneha Kapoor", time: "10:15 AM", status: "Pending", type: "Follow up" },
                { id: 3, patient: "Amit Verma", time: "11:00 AM", status: "Confirmed", type: "Consultation" },
            ];
            setAppointments(defaults);
            localStorage.setItem("doctor_appointments_v1", JSON.stringify(defaults));
        }

        if (savedInfo) {
            setDocInfo(JSON.parse(savedInfo));
        } else {
            const defaultInfo = { name: "Dr. Arjun Mehta", initials: "AM", experience: "14 Yrs" };
            setDocInfo(defaultInfo);
            localStorage.setItem("doctor_profile", JSON.stringify(defaultInfo));
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setStats({
                scheduledToday: appointments.length,
                newPatients: appointments.filter(a => a.type === "First Visit").length,
            });
            localStorage.setItem("doctor_appointments_v1", JSON.stringify(appointments));
        }
    }, [appointments, isLoaded]);

    const handleComplete = (id: number) => {
        setAppointments(appointments.filter(a => a.id !== id));
    };

    if (!isLoaded) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Dashboard...</div>;

    return (
        <div className="simple-dashboard-v2">
            {/* Soft Sidebar */}
            <aside className="simple-sidebar">
                <div className="sidebar-brand">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0072ff" />
                        <path d="M2 17L12 22L22 17" stroke="#0072ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="#0072ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Sheduala</span>
                </div>

                <nav className="side-links">
                    <button className={`side-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        Overview
                    </button>
                    <button className={`side-link ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Appointments
                    </button>
                    <button className="side-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                        Patients
                    </button>
                    <button className="side-link" onClick={() => router.push("/home")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        View Home
                    </button>
                </nav>

                <div
                    className="side-action-btn"
                    onClick={() => router.push("/login")}
                    role="button"
                    title="Sign Out"
                    {...{ "data-nordpass-ignore": "true" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    <span>Sign Out</span>
                </div>
            </aside>


            <main className="main-content">
                <header className="content-header">
                    <div className="header-info">
                        <h1>Hello, {docInfo.name.split(' ')[0] + ' ' + (docInfo.name.split(' ')[1] || '')}</h1>
                        <p>Track your schedule and patient visits</p>
                    </div>
                    <div className="header-meta">
                        <span className="current-date">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <div className="user-avatar">{docInfo.initials}</div>
                    </div>
                </header>

                <div className="content-body">

                    <div className="metrics-row">
                        <div className="metric-box bg-blue">
                            <span className="m-label">Scheduled today</span>
                            <span className="m-value">{stats.scheduledToday}</span>
                        </div>
                        <div className="metric-box bg-cyan">
                            <span className="m-label">New Patients</span>
                            <span className="m-value">{stats.newPatients}</span>
                        </div>
                        <div className="metric-box bg-green">
                            <span className="m-label">Experience</span>
                            <span className="m-value">{docInfo.experience}</span>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="list-section">
                        <div className="list-header">
                            <h2>Today's Appointments</h2>
                            <button className="text-btn">View full schedule</button>
                        </div>
                        <div className="modern-table">
                            {appointments.length > 0 ? appointments.map(apt => (
                                <div key={apt.id} className="modern-row">
                                    <div className="row-patient">
                                        <div className="p-icon">{apt.patient.charAt(0)}</div>
                                        <div className="p-name">
                                            <span>{apt.patient}</span>
                                            <small>{apt.type}</small>
                                        </div>
                                    </div>
                                    <div className="row-time">{apt.time}</div>
                                    <div className="row-status">
                                        <span className={`status-pill ${apt.status.toLowerCase()}`}>{apt.status}</span>
                                    </div>
                                    <div className="row-actions">
                                        <button className="icon-btn" title="Mark as Complete" onClick={() => handleComplete(apt.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                                    No appointments scheduled for today.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main >

            <style jsx>{`
                .simple-dashboard-v2 {
                    display: flex;
                    min-height: 100vh;
                    background: #f8fafc;
                    color: #1e293b;
                    font-family: 'Inter', sans-serif;
                }
                .simple-sidebar {
                    width: 260px;
                    background: white;
                    border-right: 1px solid #e2e8f0;
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                }
                .sidebar-brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 20px;
                    font-weight: 800;
                    color: #0072ff;
                    margin-bottom: 40px;
                }
                .side-links {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                }
                .side-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 10px;
                    background: transparent;
                    border: none;
                    color: #64748b;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    text-align: left;
                }
                .side-link:hover {
                    background: #f1f5f9;
                    color: #1e293b;
                }
                .side-link.active {
                    background: #f0f7ff;
                    color: #0072ff;
                }
                .side-action-btn {
                    margin-top: auto;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 10px;
                    background: #fff5f5;
                    border: 1px solid #fee2e2;
                    color: #ef4444;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                }
                .main-content {
                    flex: 1;
                    padding: 40px;
                }
                .content-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                }
                .header-info h1 {
                    font-size: 26px;
                    font-weight: 800;
                    margin-bottom: 4px;
                }
                .header-info p {
                    color: #64748b;
                    font-size: 15px;
                }
                .header-meta {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
                .current-date {
                    font-weight: 600;
                    color: #64748b;
                    font-size: 14px;
                }
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #0072ff 0%, #00c6ff 100%);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                }
                .metrics-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .metric-box {
                    padding: 24px;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    color: white;
                }
                .bg-blue { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
                .bg-cyan { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }
                .bg-green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
                .m-label { font-size: 13px; font-weight: 600; opacity: 0.9; }
                .m-value { font-size: 28px; font-weight: 800; }
                .list-section {
                    background: white;
                    padding: 25px;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                }
                .list-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .list-header h2 { font-size: 18px; font-weight: 800; }
                .text-btn { background: none; border: none; color: #0072ff; font-weight: 700; font-size: 14px; cursor: pointer; }
                .modern-table { display: flex; flex-direction: column; gap: 10px; }
                .modern-row {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1.2fr 40px;
                    align-items: center;
                    padding: 16px;
                    background: #f8fafc;
                    border-radius: 12px;
                    border: 1px solid transparent;
                }
                .row-patient { display: flex; align-items: center; gap: 12px; }
                .p-icon {
                    width: 32px;
                    height: 32px;
                    background: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #0072ff;
                    font-weight: 800;
                    font-size: 14px;
                    border: 1px solid #e2e8f0;
                }
                .p-name { display: flex; flex-direction: column; }
                .p-name span { font-weight: 700; font-size: 14px; }
                .p-name small { color: #64748b; font-size: 11px; font-weight: 600; }
                .row-time { font-size: 14px; font-weight: 600; color: #1e293b; }
                .status-pill {
                    padding: 4px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 700;
                    display: inline-block;
                }
                .status-pill.confirmed { background: #dcfce7; color: #15803d; }
                .status-pill.pending { background: #fef9c3; color: #a16207; }
                .icon-btn {
                    background: white;
                    border: 1px solid #e2e8f0;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                    cursor: pointer;
                }
                .icon-btn:hover { color: #0072ff; border-color: #0072ff; }
            `}</style>
        </div >
    );
}
