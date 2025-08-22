import React from 'react'
import { COLORS, FONTS } from '../../constants/uiconstants'

const EmployerPrevSlip: React.FC = () => {
    return (
        <div className='w-full h-full p-4 flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Current month Slip</h1>
                <div className='bg-[#7697A0] font-bold text-white text-md p-2 rounded-lg'>Download</div>
            </div>
            <div className='grid grid-cols-3 gap-x-10 gap-y-5'>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Worked Days</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Loss of Pay</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Causal Leave</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Late Hours</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>permission Hours</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                </section>
                <section className='bg-[#ffffff77] px-3 py-2 rounded-lg flex justify-between w-full'>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>salary</p>
                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                </section>
            </div>
        </div>
    )
}

export default EmployerPrevSlip