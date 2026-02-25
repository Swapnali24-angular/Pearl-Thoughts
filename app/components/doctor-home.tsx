"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const doctors = [
    {
        id: 1,
        name: "Dr. Arjun Mehta",
        specialty: "Cardiologist",
        experience: "14 Years",
        patients: "3.2k+",
        rating: 4.9,
        available: true
    },
    {
        id: 2,
        name: "Dr. Priya Sharma",
        specialty: "Neurologist",
        experience: "11 Years",
        patients: "2.4k+",
        rating: 4.8,
        available: true
    },
    {
        id: 3,
        name: "Dr. Rajesh Khanna",
        specialty: "Dermatologist",
        experience: "16 Years",
        patients: "4.1k+",
        rating: 4.7,
        available: true
    },
    {
        id: 4,
        name: "Dr. Ananya Iyer",
        specialty: "Pediatrician",
        experience: "7 Years",
        patients: "1.5k+",
        rating: 5.0,
        available: true
    },
    {
        id: 5,
        name: "Dr. Vikram Singh",
        specialty: "Orthopedic",
        experience: "19 Years",
        patients: "5.0k+",
        rating: 4.9,
        available: true
    },
    {
        id: 6,
        name: "Dr. Neha Kapoor",
        specialty: "Dentist",
        experience: "10 Years",
        patients: "2.2k+",
        rating: 4.6,
        available: true
    },
    {
        id: 7,
        name: "Dr. Rohan Malhotra",
        specialty: "Endocrinologist",
        experience: "13 Years",
        patients: "2.8k+",
        rating: 4.8,
        available: true
    },
    {
        id: 8,
        name: "Dr. Kavita Reddy",
        specialty: "Gynecologist",
        experience: "15 Years",
        patients: "3.5k+",
        rating: 4.9,
        available: true
    },
    {
        id: 9,
        name: "Dr. Aditya Joshi",
        specialty: "Ophthalmologist",
        experience: "12 Years",
        patients: "2.1k+",
        rating: 4.7,
        available: true
    },
    {
        id: 10,
        name: "Dr. Shweta Patil",
        specialty: "Psychiatrist",
        experience: "9 Years",
        patients: "1.9k+",
        rating: 4.8,
        available: true
    }
];

export default function DoctorHome() {
    const [searchQuery, setSearchQuery] = useState("");
    const [bookedDoctors, setBookedDoctors] = useState<number[]>([]);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'info' } | null>(null);
    const router = useRouter();

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBookAppointment = (doctor: any) => {
        if (bookedDoctors.includes(doctor.id)) {
            setNotification({ message: `Appointment with ${doctor.name} is already booked!`, type: 'info' });
        } else {
            setBookedDoctors([...bookedDoctors, doctor.id]);

            const savedApts = localStorage.getItem("doctor_appointments_v1");
            const appointments = savedApts ? JSON.parse(savedApts) : [];

            const activeUser = localStorage.getItem("active_user");
            const userData = activeUser ? JSON.parse(activeUser) : null;

            const newApt = {
                id: Date.now(),
                patient: userData ? userData.fullName : "Guest Patient",
                time: "10:30 AM",
                status: "Confirmed",
                type: "Consultation",
                category: "upcoming",
                doctorName: doctor.name
            };

            const updatedApts = [...appointments, newApt];
            localStorage.setItem("doctor_appointments_v1", JSON.stringify(updatedApts));

            const doctorProfile = {
                name: doctor.name,
                initials: doctor.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
                experience: doctor.experience
            };
            localStorage.setItem("doctor_profile", JSON.stringify(doctorProfile));

            setNotification({ message: `Appointment with ${doctor.name} booked successfully!`, type: 'success' });
        }

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <div className="home-container">

            {notification && (
                <div className={`notification-toast ${notification.type}`} style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    backgroundColor: notification.type === 'success' ? '#10b981' : '#3b82f6',
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: '600',
                    fontSize: '14px'
                }}>
                    {notification.type === 'success' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    )}
                    {notification.message}
                </div>
            )}

            <header className="home-header">
                <div className="logo-box" style={{ margin: 0, width: '45px', height: '45px', borderRadius: '12px', padding: '8px' }}>
                    <img src="/assets/images/logo.png" alt="" />
                </div>

                <div className="header-search">
                    <span className="search-icon-pos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search doctors, specialties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button
                        className="nav-btn"
                        onClick={() => router.push("/dashboard")}
                        style={{
                            background: '#f0f7ff',
                            color: '#0072ff',
                            border: '1px solid #cce3ff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '14px',
                            fontWeight: '700'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        Dashboard
                    </button>
                    <button className="nav-btn" style={{
                        background: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 114, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        borderRadius: '14px',
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span style={{ fontWeight: '700', letterSpacing: '0.2px' }}>My Appointments</span>
                        {bookedDoctors.length > 0 && (
                            <span className="badge-count" style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(4px)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                marginLeft: '6px'
                            }}>
                                {bookedDoctors.length}
                            </span>
                        )}
                    </button>
                    <div
                        className="header-action-trigger"
                        style={{
                            position: 'static',
                            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                            border: '1px solid #fca5a5',
                            padding: '10px',
                            borderRadius: '12px',
                            color: '#ef4444',
                            boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.1)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        title="Sign Out"
                        onClick={() => router.push("/login")}
                        {...{ "data-nordpass-ignore": "true" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    </div>
                </div>

            </header>

            <section className="hero-section">
                <h1>Find Your Best Doctor</h1>
                <p>Health is wealth. Book an appointment with top specialists.</p>
            </section>


            <main className="doctors-grid">
                {filteredDoctors.map((doctor) => (
                    <div className="doctor-card" key={doctor.id} style={{ position: 'relative' }}>
                        {doctor.available && <span className="badge-available">Available</span>}
                        {bookedDoctors.includes(doctor.id) && (
                            <span className="badge-available" style={{ right: 'auto', left: '24px', backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>
                                Booked
                            </span>
                        )}

                        <div className="doctor-avatar" style={{
                            background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(0, 114, 255, 0.1)'
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#0072ff" fillOpacity="0.1" />
                                <path d="M12 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4 4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1h8v-1z" fill="#0072ff" />
                                <circle cx="12" cy="11" r="3" stroke="#0072ff" strokeWidth="1.5" />
                                <path d="M7 16c0-2.209 1.791-4 4-4h2c2.209 0 4 1.791 4 4" stroke="#0072ff" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div className="doctor-info">
                            <h3>{doctor.name}</h3>
                            <div className="doctor-specialty">{doctor.specialty}</div>

                            <div className="doctor-stats">
                                <div className="stat-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    <span>{doctor.experience}</span> exp.
                                </div>
                                <div className="stat-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    <span>{doctor.patients}</span> patients
                                </div>
                            </div>
                        </div>

                        <div className="doctor-footer">
                            <div className="doctor-rating">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></polygon></svg>
                            {doctor.rating}
                        </div>
                        <button
                            className={`booking-btn ${bookedDoctors.includes(doctor.id) ? 'booked' : ''}`}
                            onClick={() => handleBookAppointment(doctor)}
                            style={{
                                backgroundColor: bookedDoctors.includes(doctor.id) ? '#10b981' : '#1e293b',
                            }}
                        >
                            {bookedDoctors.includes(doctor.id) ? 'Appointment Booked' : 'Book Appointment'}
                        </button>
                    </div>
                    </div>
    ))
}
            </main >
        </div >
    );
}
