import React from 'react'
import bell from '../../../assets/Navbar/notification.png'
import { FONTS } from '../../../constants/uiconstants'
const TotalsCard: React.FC = ({ title }) => {
    return (
        <div className='w-full h-full bg-[#9b9c9670] shadow-[0px_0px_15px_0px_#9b9c9670] flex flex-col justify-evenly p-2 rounded-xl'>
            <div className="flex flex-row gap-5 items-center">
                <div className="bg-[#4A7079] w-max h-max p-2 rounded-[50%]">
                    <img src={bell} alt="" className='w-10 h-10' />
                </div>
                <div className="">
                    <p style={{ ...FONTS.table_data }}>{title}</p>
                    <p style={{ ...FONTS.table_head }}>345</p>
                </div>
            </div>
            <div className='flex justify-end '>
                <p>View Details</p>
            </div>
        </div>
    )
}

export default TotalsCard