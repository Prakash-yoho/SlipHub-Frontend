// DrawerForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, FONTS } from '../../constants/uiconstants';
import edit from '../../assets/edit.png'

interface props {
    isOpen: boolean;
    setIsOpen: (data: boolean) => void;
}

export const DrawerForm: React.FC<props> = ({ isOpen, setIsOpen }) => {

    // const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => setIsOpen(false);

    return (
        <>
            {/* <button
                onClick={openDrawer}
                className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 transition"
            >
                View
            </button> */}

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDrawer}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 w-full max-w-md h-full bg-[#EAEBE8] shadow-xl z-50 flex flex-col p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-4xl font-semibold text-teal-700">Profile</h2>
                                <div
                                    onClick={closeDrawer}
                                    className="transition bg-[#4A7079] rounded-[50%] text-xl px-3 text-white p-2"
                                >
                                    ✕
                                </div>
                            </div>
                            <div className='w-full rounded-2xl overflow-scroll scrollbar-hide h-ful shadow-[0px_0px_15px_0px_#C3C7C64D]'>
                                <section className='flex gap-4 items-center mb-4'>
                                    <div className='bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center' style={{ ...FONTS.card_initial }}>K</div>
                                    <div className='grid gap-1'>
                                        <h1 style={{ ...FONTS.payroll_profileHead, color: COLORS.primary }} className='!font-bold !text-2xl'>Kamal</h1>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Software Delopment HR</p>
                                    </div>
                                    <div className='flex flex-row bg-[#7697A0] py-2  w-max gap-2 h-10 text-xl items-center rounded-lg text-white px-3'>
                                        <img src={edit} alt="" className='w-5 h-5' />
                                        <p>Edit</p>
                                    </div>
                                </section>

                                <div className='border border-[#C3C7C6] mb-4'></div>

                                <section className='my-4'>
                                    <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }} className='!text-2xl'>Basic Info</h1>
                                    <div className='flex justify-between gap-4 mt-2'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Emp ID</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>yt2505</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Designation</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>HR</p>
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
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Email</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Kamal@endhiran.com</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Mobile</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>98765544322</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Work Mode</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>WFO</p>
                                    </div>
                                </section>

                                <div className='border border-[#C3C7C6]'></div>


                                <section className='my-4'>
                                    <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }} className='!text-2xl'>Qualification</h1>
                                    <div className='flex justify-between gap-4 mt-2'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Degree</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>B. Tech</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Specialzation</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Computer Science</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Computer Science</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>2024</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Percentage</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>85%</p>
                                    </div>
                                </section>

                                <div className='border border-[#C3C7C6]'></div>


                                <section className='my-4'>
                                    <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }} className='!text-2xl'>Personal Information</h1>
                                    <div className='flex justify-between gap-4 mt-2'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Date of Birth</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>30-2-2026</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Father's Name</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Rasini Endhiran</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Address</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Chennai</p>
                                    </div>
                                </section>
                            </div>




                            {/*             
                            <form className="flex flex-col gap-4 flex-grow">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <input
                                        type="text"
                                        placeholder="Enter role"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Actual Salary</label>
                                    <input
                                        type="number"
                                        placeholder="Enter actual salary"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Total Salary</label>
                                    <input
                                        type="number"
                                        placeholder="Enter total salary"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="mt-auto">
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form> */}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
