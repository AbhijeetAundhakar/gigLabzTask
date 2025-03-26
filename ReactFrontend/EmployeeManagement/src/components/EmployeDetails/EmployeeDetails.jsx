import React, { useEffect, useState } from 'react';
import styles from './EmployeeDetails.module.css'; // Import CSS Module

const EmployeeDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage
            if (!token) {
                setError('No token found. Please login again.');
                return;
            }

            const response = await fetch('http://localhost:8080/employees/getData', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Include credentials
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Parse JSON response
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Failed to fetch employee data. Please try again.');
        }
    };

    const handleUpdate = (id) => {
        // Redirect to update page or open a modal for updating employee details
        console.log('Update employee with ID:', id);
    };

    return (
        <div className={styles.container}>
            <h1>Employee Details</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.employeeGrid}>
                {employees.map((employee) => {
                    const salary = employee.salary || {}; // Handle missing salary object
                    return (
                        <div key={employee.id} className={styles.card}>
                            <h2>{employee.name}</h2>
                            <p><strong>Designation:</strong> {employee.designation}</p>
                            <p><strong>Role:</strong> {employee.role}</p>
                            <p><strong>Basic Salary:</strong> ${employee.basicSalary}</p>
                            <p><strong>Gross Salary:</strong> ${salary.grossSalary ?? 'N/A'}</p>
                            <p><strong>Tax Deduction:</strong> ${salary.taxDeduction ?? 'N/A'}</p>
                            <p><strong>Net Salary:</strong> ${salary.netSalary ?? 'N/A'}</p>
                            <button
                                className={styles.updateButton}
                                onClick={() => handleUpdate(employee.id)}
                            >
                                Update
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EmployeeDetails;