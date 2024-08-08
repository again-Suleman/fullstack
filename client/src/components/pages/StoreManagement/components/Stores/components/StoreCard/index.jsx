import React from 'react';
import styles from './styles.module.scss';

const StoreCard = ({ store }) => {
    console.log(store);

    const imageUrl = store.logo ? `http://localhost:3001/uploads/${store.logo.split('\\').pop()}` : null;

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                {imageUrl ? (
                    <div className={styles.imageContainer}>
                        <img src={imageUrl} alt={store.st_name} className={styles.cardImage} />
                    </div>
                ) : (
                    <p>No image available</p>
                )}
                <div>

                    <h2 className={styles.cardTitle}>{store.st_name}</h2>
                    <p className={styles.cardDescription}>{store.description}</p>
                    <div className={styles.goCorner}>
                        <div className={styles.goArrow}>→</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreCard;
