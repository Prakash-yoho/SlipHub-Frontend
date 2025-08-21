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
import faker from 'faker';
import { FONTS } from '../../constants/uiconstants';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['Software Developer', 'Project Manager', 'Designer', 'QA Engineer'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [100, 200, 300, 400, 500],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [50, 100, 200, 300, 400],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export function SalaryDetailCard() {
    return <div className="w-full border border-[#4A7079] p-4 rounded-lg">
        <h1 style={{ ...FONTS.table_head }} className='text-center m-2'>Salaries by Department</h1>
        <Bar options={options} data={data} />
    </div>

}
