import React from 'react'
import { COLORS, FONTS } from '../../constants/uiconstants'
import DownloadIcon from '../../assets/Comman/Download.png'
import { MoreVertical } from 'lucide-react'

const Payroll = () => {



    return (
        <div className='p-4'>
            <h1 style={{ ...FONTS.payroll_mainhead }}>Payroll</h1>
            <div className=" bg-[#F8F8F8] flex items-start justify-center pt-4">
                <div className="curved-notch-div h-full"> <div className='moon'></div> <div className='moonleft'></div></div>
                <div className='absolute flex justify-between w-full px-8 py-4'>

                    <div className='bg-[#E2E2DE] w-[22%] rounded-2xl p-3 shadow-[0px_0px_15px_0px_#C3C7C64D] h-[72vh] overflow-hidden'>
                        <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary, padding: "10px 0" }}>Employee List</h1>
                        <div className=' grid gap-4 h-full pb-12 pt-1 scrollbar-hide overflow-auto '>
                            {Array(10)
                                .fill(null)
                                .map((_, index) => (
                                    <section className='bg-[#EAEBE8] w-full rounded-lg p-3 grid gap-3'>
                                        <p style={{ ...FONTS.table_data, color: COLORS.primary }}>Name : Kamal</p>
                                        <p style={{ ...FONTS.table_data, color: COLORS.primary }}>Designation : UI Designer</p>
                                    </section>
                                ))}
                        </div>
                    </div>





                    <div className=' relative w-[47%] rounded-2xl p-3 overflow-visible scrollbar-hide h-[72vh] pt-11'>
                        <input type="text" style={{ ...FONTS.Nav, color: COLORS.primary }} placeholder='Search' className='bg-[#4A70790D] absolute w-[95.5%] m-auto z-99 -top-5 p-2 px-4 border border-[#4A7079] outline-0 rounded-3xl' />

                        <div className=' h-[65vh] rounded-lg overflow-y-scroll scrollbar-hide'>
                            <div className='bg-[#E2E2DE] shadow-0px_0px_15px_0px_[#C3C7C64D] rounded-2xl p-3'>
                                <div className='flex justify-between'>
                                    <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Current Month Slip</h1>
                                    <img src={DownloadIcon} alt="" className='w-[25px] h-[25px]' />
                                </div>

                                <div className='mt-4 flex justify-between gap-6'>
                                    <section className='bg-[#EAEBE8] px-3 py-2 rounded-lg flex justify-between w-full'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Absent</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                                    </section>
                                    <section className='bg-[#EAEBE8] px-3 py-2 rounded-lg flex justify-between w-full'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Absent</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>10</p>
                                    </section>
                                </div>
                            </div>



                            <div className='bg-[#E2E2DE] shadow-0px_0px_15px_0px_[#C3C7C64D] rounded-2xl p-3 mt-4'>
                                {/* <div className='flex justify-between'> */}
                                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Generate Slip</h1>
                                {/* <img src={DownloadIcon} alt="" className='w-[25px] h-[25px]'/> */}
                                {/* </div> */}

                                <div className='mt-4 grid grid-cols-2 justify-between gap-4'>

                                    <input
                                        style={{ ...FONTS.Nav, color: COLORS.primary }}
                                        type="number"
                                        min="0"
                                        className="bg-[#EAEBE8] px-3 py-2 rounded-lg w-full border border-[#4A7079] outline-0
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="No of Worked Days"
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />
                                    <input
                                        style={{ ...FONTS.Nav, color: COLORS.primary }}
                                        type="number"
                                        min="0"
                                        className="bg-[#EAEBE8] px-3 py-2 rounded-lg w-full border border-[#4A7079] outline-0
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="No of Absent"
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />
                                    <input
                                        style={{ ...FONTS.Nav, color: COLORS.primary }}
                                        type="number"
                                        min="0"
                                        className="bg-[#EAEBE8] px-3 py-2 rounded-lg w-full border border-[#4A7079] outline-0
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="No of Absent"
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />
                                    <input
                                        style={{ ...FONTS.Nav, color: COLORS.primary }}
                                        type="number"
                                        min="0"
                                        className="bg-[#EAEBE8] px-3 py-2 rounded-lg w-full border border-[#4A7079] outline-0
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="No of Absent"
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />

                                </div>

                                <div className='  rounded-lg flex gap-3 justify-end items-center mt-4'>
                                    <button className='bg-[#4A70790D] border border-[#4A7079] px-6 py-1 rounded-md' style={{ ...FONTS.view_btn, color: COLORS.primary }}>Reset</button>
                                    <button className='bg-[#4A7079] border border-[#4A7079] text-[#FFFFFF] px-6 py-1 rounded-md' style={{ ...FONTS.view_btn }}>Generate</button>
                                </div>
                            </div>

                            <div className='bg-[#E2E2DE] shadow-0px_0px_15px_0px_[#C3C7C64D] rounded-2xl p-3 mt-4'>
                                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Previous PaySlips</h1>

                                <div className='mt-4 flex justify-between gap-6'>
                                    <table className="w-full -mt-5 border-separate border-spacing-y-4 overflow-auto">
                                        <thead className="sticky top-0">
                                            <tr style={{ background: COLORS.primary }} className='text-left text-white rounded-lg'>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-l-lg">Date</th>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Wrk Days</th>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Credited Amt</th>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-r-lg">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody className='overflow-y-scroll'>

                                            {Array(10)
                                                .fill(null)
                                                .map((_, index) => (
                                                    <tr style={{ color: COLORS.primary }} className='bg-[#EAEBE8]  rounded-lg'>
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg">21-08-2025</td>
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3">28</td>
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3">20000</td>
                                                        <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-r-lg"><img src={DownloadIcon} alt="" className='w-[25px] h-[25px]' /></td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>





                    <div className='bg-[#EAEBE8] w-[30%] rounded-2xl p-3 overflow-scroll scrollbar-hide h-[72vh] shadow-[0px_0px_15px_0px_#C3C7C64D]'>
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

            <h1></h1>
        </div>
    )
}

export default Payroll
