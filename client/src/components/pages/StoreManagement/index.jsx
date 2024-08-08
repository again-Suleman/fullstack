import React, { useState} from 'react';
import styles from './styles.module.scss';

// Components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Products from './components/Products'
import Stores from './components/Stores/index'

const StoreManagement = () => {

  const [selectedSection, setSelectedSection] = useState('Dashboard');

  const handleNavClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <>
      <div className={styles.storeManagement}>
        <Header onNavClick={handleNavClick} selectedNav={selectedSection} />
        <div className={styles.container}>
          {selectedSection === 'Dashboard' && <Dashboard />}
          {selectedSection === 'Stores' && <Stores />}
          {selectedSection === 'Products' && <Products />}
        </div>


      </div>
    </>
  );
};

export default StoreManagement;
