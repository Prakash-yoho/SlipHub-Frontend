/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const EmployeeByDpt = () => {
    const data = {
        labels: ['Software Developer', 'Project Manager', 'Designer', 'QA Engineer'],
        datasets: [
            {
                label: 'Number of Employees',
                data: [65, 25, 40, 15],
                backgroundColor: "#4A7079",
                borderRadius: 10,
                barThickness: 10,
            },
        ],
    };

    const options: any = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: 'Employees by Department',
                color: '#111',
                font: {
                    size: 20,
                    weight: 'bold',
                },
                padding: {
                    top: 10,
                    bottom: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: { raw: unknown; }) {
                        return ` ${context.raw} employees`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#444',
                    font: {
                        size: 12,
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
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className='w-full border border-[#4A7079] p-4'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default EmployeeByDpt;
