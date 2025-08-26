/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { COLORS, FONTS } from '../../constants/uiconstants'
import { handleDownload } from '../../features/common/service'

interface props {
    payslip: any
}

const EmployerPrevSlip: React.FC<props> = ({ payslip }) => {
    return (
        <div className='w-full h-full p-4 flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Current month Slip</h1>
                <div className='bg-[#7697A0] font-bold text-white text-md p-2 rounded-lg cursor-pointer' onClick={()=>handleDownload(payslip?.uuid)}>Download</div>
            </div>
            <div className='grid grid-cols-3 gap-x-10 gap-y-5'>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Worked Days</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{payslip?.worked_days}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Loss of Pay</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{payslip?.loss_of_pay}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Paid Days</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{payslip?.paid_days}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>PF</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{payslip?.pf_employee}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>No Of Arrear Days</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{payslip?.arrear_days}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>salary</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{payslip?.gross_total}</p>
                </section>
            </div>
        </div>
    )
}

export default EmployerPrevSlip