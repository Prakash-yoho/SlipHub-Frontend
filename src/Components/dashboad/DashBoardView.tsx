import React from 'react'
import TotalsCard from './ui/TotalsCard'

const DashBoardView: React.FC = () => {

    const data = [
        "Total Hr",
        "Total Departments",
        "Total Employees",
        "Total Payroll Slip",

        "Total WFO Employees",
        "Total WFH Employees",
        "Total Salary",
        "Crited Salary"
    ]

    return (
        <div className='grid grid-cols-4 gap-8 h-36'>
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