import React from 'react'
import bell from '../../../assets/Navbar/notification.png'
const TotalsCard: React.FC = ({ title }) => {
    return (
        <div className='w-full h-full border-1 border-amber-900 flex flex-col justify-evenly p-2'>
            <div className="bg-[#4A7079] w-max h-max p-2 rounded-[50%]">
                <img src={bell} alt="" className='w-10 h-10' />
            </div>
            <p>{title}</p>
            <p>345</p>
            <p>View Details</p>
        </div>
    )
}

export default TotalsCard