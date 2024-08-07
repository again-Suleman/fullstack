import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/authSlice';

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Removing the credentials
    useEffect(() => {
        localStorage.removeItem('token')
    }, [])


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/supplier/login', {
                email,
                password,
            });

            if (response.status === 200) {
                setTimeout(() => {
                    navigate('/store-management');
                }, 3000);
                setProcessing(true)
                console.log(response.data);
                dispatch(setToken(response.data.result.token))
                // localStorage.setItem('token', response.data.result.token);
                setMessage(response.data.message)
            }
        } catch (error) {
            if (error.response.status) {
                setMessage(error.response.data.errMsg)
            } else{
                setMessage("An Error Occur, please try again")
            }
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
                    <button type="submit"
                        disabled={processing}
                        className={styles.button}
                        style={{ pointerEvents: processing ? 'none' : 'auto' }}
                    >Login</button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
}
