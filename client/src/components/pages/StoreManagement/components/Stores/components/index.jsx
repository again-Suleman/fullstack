import React from 'react';
import styles from './styles.module.scss'; // Ensure this path is correct

const StoreCard = ({ store }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{store.st_name}</h2>
                <p className={styles.cardDescription}>{store.description}</p>
                {/* Add more store details here as needed */}
            </div>
        </div>
    );
};

export default StoreCard;
