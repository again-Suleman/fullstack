import React from 'react';
import styles from './styles.module.scss';


// Images
import logo from '../../../../../assets/logo/white.png';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = ({ onNavClick, selectedNav }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = ()=>{
        dispatch(clearToken())
        navigate('/')
        
    }

    return (
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="logo" />
            
            <nav className={styles.nav}>
                <a 
                    onClick={() => onNavClick('Dashboard')}
                    className={selectedNav === 'Dashboard' ? styles.active : ''}
                >
                    Dashboard
                </a>
                <a 
                    onClick={() => onNavClick('Stores')}
                    className={selectedNav === 'Stores' ? styles.active : ''}
                >
                    Stores
                </a>
                <a 
                    onClick={() => onNavClick('Products')}
                    className={selectedNav === 'Products' ? styles.active : ''}
                >
                    Products
                </a>
                <a 
                    onClick={() => onNavClick('Settings')}
                    className={selectedNav === 'Settings' ? styles.active : ''}
                >
                    Settings
                </a>
            </nav>
            <div className={styles.logout}>
                <button onClick={handleLogout}><span>Logout</span></button>
            </div>
        </header>
    );
};

export default Header;
