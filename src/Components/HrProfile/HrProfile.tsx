// DrawerForm.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, FONTS } from '../../constants/uiconstants';
import edit from '../../assets/edit.png'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { GetHrUUIDThunks } from '../../features/HrProfile/redux/thunks';
import type { HrProfileType } from '../../Type/HrProfiles/Type';
import dayjs from 'dayjs';
// import { clearHr } from '../../features/HrProfile/redux/slice';

interface props {
    isOpen: boolean;
    setIsOpen: (data: boolean) => void;
    setIsModalOpen?: (data: boolean) => void;
    hrUUID: string;
    seletedHrData: (data: HrProfileType) => void;
}

export const DrawerForm: React.FC<props> = ({ isOpen, setIsOpen, setIsModalOpen, hrUUID, seletedHrData }) => {


    const dispatch = useDispatch<AppDispatch>()

    const closeDrawer = () => { setIsOpen(false) };

    const selectedHr = useSelector((state: RootState) => state.hrstore.selectedHr)


    useEffect(() => {
        dispatch(GetHrUUIDThunks(hrUUID))
    }, [dispatch, hrUUID]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
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
                                    className="transition bg-[#4A7079] rounded-[50%] text-xl px-3 text-white p-2 cursor-pointer"
                                >
                                    ✕
                                </div>
                            </div>
                            <div className='w-full rounded-2xl overflow-scroll scrollbar-hide h-ful shadow-[0px_0px_15px_0px_#C3C7C64D] p-2'>
                                <section className='flex gap-4 items-center mb-4'>
                                    <div className='bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center' style={{ ...FONTS.card_initial }}>{selectedHr?.first_name?.[0]}</div>
                                    <div className='grid gap-1'>
                                        <h1 style={{ ...FONTS.payroll_profileHead, color: COLORS.primary }} className='!font-bold !text-2xl'>{selectedHr?.first_name + ' ' + selectedHr?.last_name}</h1>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>HR</p>
                                    </div>
                                    <div className='flex flex-row bg-[#7697A0] py-2  w-max gap-2 h-10 text-xl items-center rounded-lg text-white px-3 cursor-pointer' onClick={() => {
                                        setIsModalOpen?.(true);
                                        seletedHrData(selectedHr)
                                    }
                                    }>
                                        <img src={edit} alt="" className='w-5 h-5 ' />
                                        <p>Edit</p>
                                    </div>
                                </section>

                                <div className='border border-[#C3C7C6] mb-4'></div>

                                <section className='my-4'>
                                    <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }} className='!text-2xl'>Basic Info</h1>
                                    <div className='flex justify-between gap-4 mt-2'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Emp ID</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>{selectedHr?.emp_id}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Designation</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>HR</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>CTC</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.ctc}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Department</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.department?.[0]?.dpt_name}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Email</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.contact_info?.email}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Mobile</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.contact_info?.phone}</p>
                                    </div>
                                    {/* <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Work Mode</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>WFO??</p>
                                    </div> */}
                                </section>

                                <div className='border border-[#C3C7C6]'></div>


                                <section className='my-4'>
                                    <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }} className='!text-2xl'>Qualification</h1>
                                    <div className='flex justify-between gap-4 mt-2'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Degree</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>{selectedHr?.qualification?.degree}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Specialzation</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.qualification?.specialization}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>year of completion</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.qualification?.year_of_completion}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Percentage</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.qualification?.percentage}</p>
                                    </div>
                                </section>

                                <div className='border border-[#C3C7C6]'></div>


                                <section className='my-4'>
                                    <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }} className='!text-2xl'>Personal Information</h1>
                                    <div className='flex justify-between gap-4 mt-2'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Date of Birth</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>{dayjs(selectedHr?.dob).format("DD-MMM-YYYY")}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Father's Name</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.father_name}</p>
                                    </div>
                                    <div className='flex justify-between gap-4 mt-1'>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Address</p>
                                        <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedHr?.contact_info?.address}</p>
                                    </div>
                                </section>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
