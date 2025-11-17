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
            <div className='flex flex-row justify-between items-center pb-2'>
                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }} className={`${MobileView ? '!text-[18px]' : ''}`}>
                    Current month Slip
                </h1>
                <div 
                    className={`bg-[#7697A0] font-bold text-white text-md p-2 rounded-lg cursor-pointer ${MobileView ? '!text-[14px] p-1 px-3' : ''}`} 
                    onClick={() => handleDownload(payslip?.uuid)}
                >
                    Download
                </div>
            </div>

            <div className={`grid ${MobileView ? 'grid-cols-1 gap-y-3' : 'grid-cols-3 gap-x-10 gap-y-5'}`}>
                {[
                    { label: 'Worked Days', value: payslip?.worked_days },
                    { label: 'Loss of Pay', value: payslip?.loss_of_pay },
                    { label: 'Paid Days', value: payslip?.paid_days },
                    { label: 'PF', value: payslip?.pf_employee },
                    { label: 'No Of Arrear Days', value: payslip?.arrear_days },
                    { label: 'salary', value: payslip?.net_salary },
                ].map((item, index) => (
                    <section 
                        key={index} 
                        className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'
                    >
                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView ? '!text-[14px]' : ''}`}>
                            {item.label}
                        </p>
                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className={`${MobileView ? '!text-[14px]' : ''}`}>
                            {item.value}
                        </p>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default EmployerPrevSlip
