/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import TotalsCard from './ui/TotalsCard'
import { DashboardImage } from '../../assets/dashboard/image'

interface props {
    dashboard: any
}

const DashBoardView: React.FC<props> = ({ dashboard }) => {

    const data = [
        { name: "Employees", value: dashboard?.no_of_employee, image: DashboardImage.empImg },
        { name: "Salary", value: dashboard?.total_salary, image: DashboardImage.salaryImg },
        { name: "Hr", value: dashboard?.no_of_hr, image: DashboardImage.hrImage },
        { name: "Department", value: dashboard?.no_of_department, image: DashboardImage.dptImage },
        { name: "WFO ", value: dashboard?.wfo, image: DashboardImage.empImg },
        { name: "WFH ", value: dashboard?.wfh, image: DashboardImage.empImg },
    ]

    return (
        <div className='grid xl:grid-cols-2 lg:grid-cols-1 gap-5 h-full bg-[#E3E4E0] shadow-[0px_0px_15px_0px_#4A707966] p-3'>
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