import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

            const response = await axios.get('http://localhost:8080/employees', {
                headers: {
                    Authorization: `Bearer ${token}`, // Include JWT token in the request
                    'Access-Control-Allow-Origin': '*' 
                },
                withCredentials: true // Include credentials
            });

            setEmployees(response.data); // Set employee data
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
                {employees.map((employee) => (
                    <div key={employee.id} className={styles.card}>
                        <h2>{employee.name}</h2>
                        <p><strong>Designation:</strong> {employee.designation}</p>
                        <p><strong>Role:</strong> {employee.role}</p>
                        <p><strong>Basic Salary:</strong> ${employee.basicSalary}</p>
                        <p><strong>Gross Salary:</strong> ${employee.salary.grossSalary}</p>
                        <p><strong>Tax Deduction:</strong> ${employee.salary.taxDeduction}</p>
                        <p><strong>Net Salary:</strong> ${employee.salary.netSalary}</p>
                        <button
                            className={styles.updateButton}
                            onClick={() => handleUpdate(employee.id)}
                        >
                            Update
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeDetails;