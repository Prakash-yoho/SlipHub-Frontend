/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import yoho from '../../assets/Navbar/yohologo.png'
import { FONTS } from '../../constants/uiconstants'

interface props {
    company_details?: any
}

const CompanyInfo: React.FC<props> = ({ company_details }) => {
    return (
        <div className='w-full p-4 flex flex-col items-center gap-5' >
            <div className="flex flex-row w-full gap-10">
                <div className='w-80 p-2 flex items-center'>
                    <img src={yoho} alt="" className=' object-cover w-full' />
                </div>
                <div className="grid grid-cols-2 gap-5 w-full">
                    <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] p-4 flex flex-col gap-5 rounded-xl">
                        <h1 style={{ ...FONTS.table_head }} className='text-[#4A7079] !font-bold'>Organsation Name:</h1>
                        <h1 style={{ ...FONTS.table_data }} className='text-[#4A7079] !font-medium break-words'>{company_details?.company_name}</h1>
                    </div>
                    <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] p-4 flex flex-col gap-5 rounded-xl">
                        <h1 style={{ ...FONTS.table_head }} className='text-[#4A7079] !font-bold'>Organsation Mail:</h1>
                        <h1 style={{ ...FONTS.table_data }} className='text-[#4A7079] !font-medium break-words'>{company_details?.contact_info?.email}</h1>
                    </div>
                    <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] p-4 flex flex-col gap-5 rounded-xl">
                        <h1 style={{ ...FONTS.table_head }} className='text-[#4A7079] !font-bold'>Organsation Phone:</h1>
                        <h1 style={{ ...FONTS.table_data }} className='text-[#4A7079] !font-medium break-words'>{company_details?.contact_info?.phone}</h1>
                    </div>
                    <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] p-4 flex flex-col gap-5 rounded-xl">
                        <h1 style={{ ...FONTS.table_head }} className='text-[#4A7079] !font-bold'>website:</h1>
                        <h1 style={{ ...FONTS.table_data }} className='text-[#4A7079] !font-medium break-words'>{company_details?.website}</h1>
                    </div>
                </div>

            </div>
            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] p-4 flex flex-col gap-5 rounded-xl">
                <h1 style={{ ...FONTS.table_head }} className='text-[#4A7079] !font-bold'>Organsation Address:</h1>
                <h1 style={{ ...FONTS.table_data }} className='text-[#4A7079] !font-medium break-words'>{company_details?.contact_info?.address}</h1>
            </div>
        </div>
    )
}

export default CompanyInfo