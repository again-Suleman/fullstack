import React from 'react';
import styles from './styles.module.scss';

const AnimatedButton = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{children}</span>
        </button>
    );
};

export default AnimatedButton;
