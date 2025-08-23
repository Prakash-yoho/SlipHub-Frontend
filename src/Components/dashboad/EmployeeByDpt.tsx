import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FONTS } from '../../constants/uiconstants';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const labels = ['Software Developer', 'Project Manager', 'Designer', 'QA Engineer'];
const employeeCounts = [65, 25, 40, 15];

// const heightPerBar = 400;
// const chartHeight = labels.length * heightPerBar;

const data: ChartData<'bar'> = {
    labels,
    datasets: [
        {
            label: 'Number of Employees',
            data: employeeCounts,
            backgroundColor: '#4A7079',
            borderRadius: 10,
            barThickness: 10,
            categoryPercentage: 0.8,
            barPercentage: 0.9,
        },
    ],
};

const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                color: '#333',
                font: {
                    size: 14,
                    weight: 'bold',
                    family: FONTS?.card_name?.fontFamily || 'sans-serif',
                },
            },
        },
        title: {
            display: false,
            text: 'Employees by Department',
            color: '#111',
            font: {
                size: 20,
                weight: 'bold',
                family: FONTS?.card_name?.fontFamily || 'sans-serif',
            },
            padding: {
                top: 10,
                bottom: 20,
            },
        },
        tooltip: {
            callbacks: {
                label: (context) => ` ${context.raw} employees`,
            },
        },
    },
    scales: {
        x: {
            beginAtZero: true,
            ticks: {
                color: '#444',
                font: {
                    size: 12,
                    family: FONTS?.card_name?.fontFamily || 'sans-serif',
                },
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                color: '#444',
                font: {
                    size: 14,
                    weight: 'bold',
                    family: FONTS?.card_name?.fontFamily || 'sans-serif',
                },
            },
            grid: {
                display: false,
            },
        },
    },
};

const EmployeeByDpt: React.FC = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '300px',
            }}
        >
            <Bar data={data} options={options} />
        </div>
    );
};

export default EmployeeByDpt;
