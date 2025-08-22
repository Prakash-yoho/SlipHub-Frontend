import React from 'react'
import bg from '../../assets/Rectangle.png'
import DownloadIcon from '../../assets/Comman/Download.png'
import { COLORS, FONTS } from '../../constants/uiconstants'
import CalendarPicker from '../../Components/ui/CalendarPicker'
import EmployerPrevSlip from '../../Components/employer/employerPrevSlip'

const EmployerProfile = () => {
    return (
        <div className="w-full h-full mt-5">
            <h1 style={{ ...FONTS.Main }}>Employer</h1>
            <div
                className="w-full h-[82vh] bg-cover rounded-4xl"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="flex flex-row w-full gap-5">
                    <div className="flex flex-col w-8/12 gap-8">
                        <div className="w-full h-20 flex flex-row rounded-4xl items-baseline gap-5 p-4">
                            <CalendarPicker />
                            <div className="bg-[#7697A0] w-max p-2 px-6 h-max rounded-lg font-bold text-white text-md">Generated</div>
                        </div>
                        <div className="flex flex-col w-full h-[68vh] mx-4 rounded-3xl gap-5 p-4">
                            <div className="w-full h-52 bg-[#EAEBE8] rounded-2xl">
                                <EmployerPrevSlip />
                            </div>

                            <div className="w-full h-96 bg-[#EAEBE8] rounded-2xl p-4 overflow-hidden">
                                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Previous PaySlips</h1>

                                <div className="flex justify-between gap-6">
                                    <div className="w-full max-h-80  overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                                        <table className="w-full border-separate border-spacing-y-4" >
                                            <thead className="sticky top-0">
                                                <tr style={{ background: COLORS.primary }} className="text-left text-white rounded-lg">
                                                    <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-l-lg">Date</th>
                                                    <th style={{ ...FONTS.table_head }} className="px-4 py-3">Wrk Days</th>
                                                    <th style={{ ...FONTS.table_head }} className="px-4 py-3">Credited Amt</th>
                                                    <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-r-lg">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {Array(20).fill(null).map((_, index) => (
                                                    <tr key={index} style={{ color: COLORS.primary }} className="bg-[#EAEBE8] rounded-lg">
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg">21-08-2025</td>
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3">28</td>
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3">20000</td>
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-r-lg">
                                                            <img src={DownloadIcon} alt="" className="w-[25px] h-[25px]" />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="bg-[#EAEBE8] w-3/10 h-[78vh] m-4 rounded-3xl">
                        <div className='w-full rounded-2xl p-3 overflow-scroll scrollbar-hide h-ful shadow-[0px_0px_15px_0px_#C3C7C64D]'>
                            <section className='flex gap-4 items-center mb-4'>
                                <div className='bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center' style={{ ...FONTS.card_initial }}>K</div>
                                <div className='grid gap-1'>
                                    <h1 style={{ ...FONTS.payroll_profileHead, color: COLORS.primary }}>Name : Kamal</h1>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Software Delopment</p>
                                </div>
                            </section>

                            <div className='border border-[#C3C7C6] mb-4'></div>

                            <section className='my-4'>
                                <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }}>Basic Info</h1>
                                <div className='flex justify-between gap-4 mt-2'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Emp ID</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>yt2505</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Designation</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>UI Developer</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>CTC</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>12,000</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Department</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Designer</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Work Mode</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>WFO</p>
                                </div>
                            </section>

                            <div className='border border-[#C3C7C6]'></div>


                            <section className='my-4'>
                                <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }}>Personal Information</h1>
                                <div className='flex justify-between gap-4 mt-2'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Date of Birth</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>30-2-2026</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Father's Name</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Rasini Endhiran</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Email</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Kamal@endhiran.com</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Mobile</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>98765544322</p>
                                </div>
                                <div className='flex justify-between gap-4 mt-1'>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Address</p>
                                    <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Chennai</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployerProfile