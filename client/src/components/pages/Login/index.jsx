import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/supplier/login', {
                email,
                password,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.result.token);
            
            setTimeout(() => {
                navigate('/store-management');
            }, 3000);
        } catch (error) {
            setMessage('Error logging in.');
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.child}>
                <h2 className={styles.heading}>Login</h2>
                <form className={styles.form} onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Login</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
}
