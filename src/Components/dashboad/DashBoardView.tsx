import React from 'react'
import TotalsCard from './ui/TotalsCard'

const DashBoardView: React.FC = () => {

    const data = [
        "Employees",
        "Salary",
        "Hr",
        "Departments",
        "WFO Employees",
        "WFH Employees",
    ]

    return (
        <div className='grid grid-cols-2 gap-5 h-full'>
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