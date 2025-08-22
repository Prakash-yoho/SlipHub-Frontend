import React from 'react'
import TotalsCard from './ui/TotalsCard'
import { DashboardImage } from '../../assets/dashboard/image'

const DashBoardView: React.FC = () => {

    const data = [
        { name: "Employees", value: 230, image: DashboardImage.empImg },
        { name: "Salary", value: 450000, image: DashboardImage.salaryImg },
        { name: "Hr", value: 5, image: DashboardImage.hrImage },
        { name: "Departments", value: 4, image: DashboardImage.dptImage },
        { name: "WFO Employees", value: 60, image: DashboardImage.empImg },
        { name: "WFH Employees", value: 190, image: DashboardImage.empImg },
    ]

    return (
        <div className='grid grid-cols-2 gap-5 h-full bg-[#E3E4E0] shadow-[0px_0px_15px_0px_#4A707966] p-4'>
            {
                data.map((title, index) => (
                    <div key={index}>
                        <TotalsCard title={title} />
                    </div>
                ))
            }
        </div>
    )
}

export default DashBoardView