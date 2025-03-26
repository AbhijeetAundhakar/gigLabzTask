import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestAPI = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTestMessage = async () => {
            try {
                // Retrieve JWT token from localStorage
                const token = localStorage.getItem('jwtToken');

                // Make a request to the secured API with Authorization header
                const response = await axios.get('http://localhost:8080/employees/test', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching test message:', error);
                setMessage('Error fetching test message.');
            }
        };

        fetchTestMessage();
    }, []);


    return (
        <div>
            <h2>Test API Response</h2>
            <p>{message}</p>
        </div>
    );
};

export default TestAPI;
