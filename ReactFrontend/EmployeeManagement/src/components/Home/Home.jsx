import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import styles from './Home.module.css'; // Import CSS Module

const Home = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        // Clear localStorage and redirect to login page
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        window.location.href = '/Login';
    };

    return (
        <div>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.logo}>GigLabs</div>
                <ul className={styles.navLinks}>
                    <li>
                        <Link to="/employee-details">All Employees</Link>
                    </li>
                    <li><a href="#">Add Employee</a></li>
                    <li><a href="#">Get Employee by ID</a></li>
                    <li><a href="#">Update Employee</a></li>
                    <li><a href="#">Fire Employee</a></li>
                    <li><Link to="/test">Test</Link></li> {/* Added Test link */}
                    <li><a href="#" id="logoutBtn" onClick={() => setShowLogoutModal(true)}>Logout</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className={styles.mainContainer}>
                <h1>Welcome to Employee Management Room</h1>
                <div className={styles.button}>
                    <button id="employeesBtn">Employees</button>
                </div>
            </div>




            {/* Features Section */}
            <div className={styles.features}>
                <div className={styles.featureCard}>
                    <h2 className={styles.h2}>Hire & Manage</h2>
                    <p>Add and update employee details efficiently.</p>
                </div>
                <div className={styles.featureCard}>
                    <h2>Track Performance</h2>
                    <p>Monitor employee records and manage their roles.</p>
                </div>
                <div className={styles.featureCard}>
                    <h2>Secure Access</h2>
                    <p>Only authorized admins can manage employees.</p>
                </div>
            </div>
            



            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>Do you really want to logout?</p>
                        <button id="confirmLogout" onClick={handleLogout}>Yes</button>
                        <button id="cancelLogout" onClick={() => setShowLogoutModal(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
