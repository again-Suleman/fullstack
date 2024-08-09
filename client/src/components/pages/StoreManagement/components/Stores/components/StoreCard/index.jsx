import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { deleteStore, fetchStores } from '../../../../../../store/slices/storeSlice/storeSlice';

const StoreCard = ({ store, deleteMode }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this store?")) {
            dispatch(deleteStore({ stName: store.st_name }));
            setTimeout(() => {
                dispatch(fetchStores());
            }, 500);
        }
    };

    const imageUrl = store.logo ? `http://localhost:3001/uploads/${store.logo.split('\\').pop()}` : null;

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                {deleteMode && (
                    <button className={styles.deleteButton} onClick={handleDelete}>×</button>
                )}
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
                </div>
            </div>
        </div>
    );
};

StoreCard.propTypes = {
    store: PropTypes.shape({
        st_name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        description: PropTypes.string,
    }).isRequired,  
    deleteMode: PropTypes.bool.isRequired,  
};

export default StoreCard;
