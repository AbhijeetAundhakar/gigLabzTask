import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Login/LoginForm.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:8080/employees/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const token = response.data;
            console.log('✅ Received JWT Token:', token);

            localStorage.setItem('jwtToken', token);

            // Fetch employee role
            const roleResponse = await axios.get(
                `http://localhost:8080/employees/role/${username}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const role = roleResponse.data;
            console.log('✅ User Role:', role);

            localStorage.setItem('userRole', role);

            if (role === 'ADMIN') {
                navigate('/home');
            } else {
                setError('❌ You are not authorized to access the admin panel.');
                localStorage.removeItem('jwtToken'); // Remove invalid token
                localStorage.removeItem('userRole');
            }
        } catch (error) {
            console.error('❌ Login Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 401) {
                setError('❌ Invalid username or password.');
            } else {
                setError('❌ Login failed. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <form id="loginForm" onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <label>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
