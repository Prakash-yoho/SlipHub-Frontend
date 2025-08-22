import React from 'react'
import { FONTS } from '../../../constants/uiconstants'

interface props {
    title: { name: string, value: number, image: string }
}

const TotalsCard: React.FC<props> = ({ title }) => {
    return (
        <div className='w-full h-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] flex flex-col justify-evenly p-2 rounded-xl'>
            <div className="flex flex-col gap-5">
                <div className='flex flex-row items-center gap-5 px-2'>
                    <div className="bg-[#4A7079] w-max h-max p-2 rounded-[50%]">
                        <img src={title?.image} alt="" className='w-10 h-10' />
                    </div>
                    <p style={{ ...FONTS.table_data }} className='text-[#4A7079] !font-bold'>{title?.name}</p>
                </div>
                <p style={{ ...FONTS.table_head }} className='text-end -mt-5 px-4 !text-[26px] text-[#4A7079] font-bold'>{title?.value}</p>
            </div>
        </div>
    )
}

export default TotalsCard