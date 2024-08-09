import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import logo from '../../../assets/logo/white.png'

export default function Home() {

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} alt="Store Logo" className={styles.logo} />
                </div>
                <nav className={styles.nav}>
                    <Link to="/signup" className={styles.link}>Sign Up</Link>
                    <Link to="/login" className={styles.link}>Login</Link>
                </nav>
            </header>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to onyX</h1>
                <p className={styles.description}>Dial in Style, with Prices that Make You Smile!</p>
                <section className={styles.productsSection}>
                    <h2 className={styles.sectionTitle}>Our Products</h2>
                    <div className={styles.productsContainer}>
                        <div className={styles.productCard}>Product 1</div>
                        <div className={styles.productCard}>Product 2</div>
                        <div className={styles.productCard}>Product 3</div>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} onyX. All rights reserved.</p>
            </footer>
        </div>
    );
}
