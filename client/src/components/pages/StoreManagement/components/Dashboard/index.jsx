import React, { useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import styles from './styles.module.scss';


ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);



const Dashboard = () => {

    // Dummy Data
    /////////////////////
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Revenue',
                data: [85, 72, 90, 95, 60, 65],
                borderColor: 'rgba(153, 102, 255, 0.6)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Data',
            },
        },
    };
    //////////////////////

    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <div className={styles.container}>
                <div className={styles.chartWrapper}>
                    <div className={styles.chartContainer}>
                        <Bar data={barData} options={options} />
                    </div>
                    <div className={styles.chartContainer}>
                        <Line data={lineData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
