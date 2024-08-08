import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStore } from '../../../../../../store/slices/storeSlice';
import styles from './styles.module.scss';
import AnimatedButton from '../../../../../../common/animatedButton';

const AddStoreForm = () => {
    const dispatch = useDispatch();
    const [storeData, setStoreData] = useState({
        stName: '',
        description: '',
        logo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreData({
            ...storeData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setStoreData({
            ...storeData,
            logo: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('stName', storeData.stName);
        formData.append('description', storeData.description);
        formData.append('logo', storeData.logo);

        // Log FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        dispatch(addStore(formData));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Store Name:</label>
                <input
                    type="text"
                    name="stName"
                    value={storeData.stName}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Description:</label>
                <textarea
                    name="description"
                    value={storeData.description}
                    onChange={handleChange}
                    className={styles.textarea}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Logo:</label>
                <input
                    type="file"
                    name="logo"
                    onChange={handleFileChange}
                    className={styles.input}
                    required
                />
            </div>
            <AnimatedButton type="submit">Add Store</AnimatedButton>
        </form>
    );
};

export default AddStoreForm;
