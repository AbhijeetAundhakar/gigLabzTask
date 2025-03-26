import React, { useEffect, useState } from 'react';

const TestAPI = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTestMessage = async () => {
            try {
                // Retrieve JWT token from localStorage
                const token = localStorage.getItem('jwtToken');

                // Make a request to the secured API with Authorization header
                const response = await fetch('http://localhost:8080/employees/test', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.text(); // Assuming response is plain text
                setMessage(data);
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
