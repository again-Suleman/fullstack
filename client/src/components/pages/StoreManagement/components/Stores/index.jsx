import React, { useEffect } from 'react'
import styles from './styles.module.scss'

// RTK
import { useDispatch, useSelector } from 'react-redux'
import { fetchStores } from '../../../../store/slices/storeSlice';

// Components
import StoreCard from '../Stores/components/index'




function index() {

    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores.stores);
    const storeStatus = useSelector((state) => state.stores.status);
    const error = useSelector((state) => state.stores.error);

    useEffect(() => {
        if (storeStatus === 'idle') {
            dispatch(fetchStores())
        }
    }, [storeStatus, dispatch])


    return (
        <div className={styles.storeList}>
            <h2>Stores</h2>
            {storeStatus === 'loading' && <p>Loading...</p>}
            {storeStatus === 'failed' && <p>{error}</p>}
            {storeStatus === 'succeeded' &&
                (
                    stores.map((store, index) => (
                        <StoreCard key={index} store={store} />
                    ))

                )}
        </div>
    )
}

export default index
