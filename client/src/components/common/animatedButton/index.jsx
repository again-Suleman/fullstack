import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const AnimatedButton = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{children}</span>
        </button>
    );
};

AnimatedButton.propTypes = {
    onClick: PropTypes.func,            
    children: PropTypes.node.isRequired, 
};

export default AnimatedButton;
