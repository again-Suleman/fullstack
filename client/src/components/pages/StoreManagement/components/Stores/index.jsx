import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { motion, AnimatePresence } from 'framer-motion';

// RTK
import { useDispatch, useSelector } from 'react-redux'
import { fetchStores } from '../../../../store/slices/storeSlice';


// Components
import StoreCard from './components/StoreCard/index'
import AnimatedButton from '../../../../common/animatedButton';
import AddStoreForm from './components/AddStoreForm/index'
import Loader from '../../../../common/loader';



const StoreList = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores.stores);
    const storeStatus = useSelector((state) => state.stores.status);
    const error = useSelector((state) => state.stores.error);

    const [showAddStore, setShowAddStore] = useState(false);


    useEffect(() => {

        dispatch(fetchStores())
    }, [])

    const toggleAddStore = () => {
        setShowAddStore(!showAddStore);
    };

    const transition = {
        type: "spring",
        stiffness: 250,
        damping: 20
    }

    return (
        <motion.div className={styles.layout} layout transition={transition}>
            <motion.div className={styles.storeList} layout transition={transition}>
                <div className={styles.upper}>
                    <h2>Stores</h2>
                    <AnimatedButton onClick={toggleAddStore}>+ Add Store</AnimatedButton>
                </div>
                {storeStatus === 'loading' && <Loader />}
                {storeStatus === 'failed' && <p>{error}</p>}
                {storeStatus === 'succeeded' && (
                    <motion.div className={styles.storeCards} layout transition={transition}>
                        {stores.map((store, index) => (
                            <StoreCard key={index} store={store} />
                        ))}
                    </motion.div>
                )}
            </motion.div>

            {/* Animate Presensce is here as to smooth the alter of DOM components */}
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
    )
}

export default StoreList;
