/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { COLORS, FONTS } from '../../constants/uiconstants'
import { handleDownload } from '../../features/common/service'
import { MobileResponsive } from '../../hooks/MobileResponsive'

interface props {
    payslip: any
}

const EmployerPrevSlip: React.FC<props> = ({ payslip }) => {

    const { MobileView } = MobileResponsive()

    return (
        <div className='w-full h-full p-4 flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }} className={`${MobileView && '!text-[12px]'}`}>Current month Slip</h1>
                <div className={`bg-[#7697A0] font-bold text-white text-md p-2 rounded-lg cursor-pointer ${MobileView && '!text-[10px]'}`} onClick={() => handleDownload(payslip?.uuid)}>Download</div>
            </div>
            <div className='grid grid-cols-3 gap-x-10 gap-y-5'>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>Worked Days</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>{payslip?.worked_days}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>Loss of Pay</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>{payslip?.loss_of_pay}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>Paid Days</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>{payslip?.paid_days}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>PF</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>{payslip?.pf_employee}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>No Of Arrear Days</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>{payslip?.arrear_days}</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>salary</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView && '!text-[8px]'}`}>{payslip?.net_salary}</p>
                </section>
            </div>
        </div>
    )
}

export default EmployerPrevSlip