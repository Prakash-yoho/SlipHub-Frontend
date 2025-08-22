import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    type ChartOptions,
    type ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

type SalaryDetailCardProps = {
    roles: string[];
    actualSalaries: number[];
    totalSalaries: number[];
};

export const SalaryDetailCard: React.FC<SalaryDetailCardProps> = ({
    roles,
    actualSalaries,
    totalSalaries,
}) => {
    const remainingSalaries = totalSalaries.map((total, index) => {
        const actual = actualSalaries[index];
        return Math.max(total - actual, 0);
    });

    const data: ChartData<'bar'> = {
        labels: roles,
        datasets: [
            {
                label: 'Actual Salary',
                data: actualSalaries,
                backgroundColor: '#4A7079', // Dark color
                stack: 'salary',
                borderRadius: {
                    topLeft: 10,
                    topRight: 10,
                },
                barThickness: 40,
            },
            {
                label: 'Remaining Budget',
                data: remainingSalaries,
                backgroundColor: '#4A707933', // Light color
                stack: 'salary',
                borderRadius: {
                    bottomLeft: 0,
                    bottomRight: 0,
                },
                barThickness: 40,
            },
        ],
    };

    // Calculate highest total salary for scaling y-axis
    const suggestedMaxY = Math.max(...totalSalaries) * 1.1;

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw as number;
                        return `${label}: $${value}`;
                    },
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: {
                    color: '#4A7079',
                    font: {
                        family: 'sans-serif',
                        size: 12,
                    },
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                suggestedMax: suggestedMaxY,
                grid: { color: '#ccc' },
                ticks: {
                    color: '#4A7079',
                    font: {
                        family: 'sans-serif',
                        size: 12,
                    },
                    callback: function (value) {
                        return `$${value}`;
                    },
                },
            },
        },
    };

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
