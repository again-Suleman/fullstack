import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStores } from '../../../../store/slices/storeSlice/storeSlice';
import StoreCard from './components/StoreCard';
import AnimatedButton from '../../../../common/animatedButton';
import AddStoreForm from './components/AddStoreForm';
import Loader from '../../../../common/loader';

const StoreList = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores.stores);
    const storeStatus = useSelector((state) => state.stores.status);
    const error = useSelector((state) => state.stores.error);
    const [showAddStore, setShowAddStore] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    useEffect(() => {
        if (storeStatus === 'idle') {
            dispatch(fetchStores());
        }
    }, [stores]);

    const toggleAddStore = () => {
        setShowAddStore(!showAddStore);
    };

    const toggleDeleteMode = () => {
        setDeleteMode(!deleteMode);
    };

    const transition = {
        type: "spring",
        stiffness: 250,
        damping: 20
    };

    return (
        <motion.div className={styles.layout} layout transition={transition}>
            <motion.div className={styles.storeList} layout transition={transition}>
                <div className={styles.upper}>
                    <h2>Stores</h2>
                    <div>
                        <AnimatedButton onClick={toggleAddStore}>+ Add Store</AnimatedButton>
                        <AnimatedButton onClick={toggleDeleteMode}>{deleteMode ? 'Cancel' : '- Delete'}</AnimatedButton>
                    </div>
                </div>
                {storeStatus === 'loading' && <Loader />}
                {storeStatus === 'failed' && <p>{error}</p>}
                {storeStatus === 'succeeded' && (
                    <motion.div className={styles.storeCards} layout transition={transition}>
                        {stores.map((store, index) => (
                            <StoreCard key={index} store={store} deleteMode={deleteMode} />
                        ))}
                    </motion.div>
                )}
            </motion.div>

            <AnimatePresence>
                {showAddStore && (
                    <motion.div
                        className={styles.addStore}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <AddStoreForm />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default StoreList;
