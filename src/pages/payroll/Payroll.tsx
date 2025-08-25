import BgImg from '../../assets/Comman/Rectangle 1.png'
import { COLORS, FONTS } from '../../constants/uiconstants';
import DownloadIcon from '../../assets/Comman/Download.png'
import CalendarPicker from '../../Components/ui/CalendarPicker';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { GeneratePayrollThunks, GetPayrollEmpThunks, PayrollSelectedEmpThunks } from '../../features/payroll/redux/thunks';
import type { EmployeeProfile } from '../../Type/Emp_profile/Type';
import type { PayRollType } from '../../Type/payroll/type';
import { handleDownload } from '../../features/common/service';


const Payroll = () => {

    const dispatch = useDispatch<AppDispatch>()

    const employies = useSelector((state: RootState) => state.payroll.employee)

    const selectedEmp: EmployeeProfile = useSelector((state: RootState) => state.payroll.selectedEmp)

    const [EmpUUID, setEmpUUID] = useState<string | undefined>(undefined);

    const [selecteDate, setselecteDate] = useState<Date | null>(null);

    const [PayRollInput, setPayRollInput] = useState<PayRollType>({
        worked_days: 0,
        loss_of_pay: 0,
        arrear_days: 0,
        paid_days: 0,
        created_month: "",
        employee_uuid: "",
    });

    useEffect(() => {
        dispatch(GetPayrollEmpThunks())
    }, [dispatch]);

    useEffect(() => {
        if (EmpUUID) {
            dispatch(PayrollSelectedEmpThunks(EmpUUID ?? ""))
        }
    }, [EmpUUID, dispatch]);


    const handelInputChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPayRollInput((prev) => ({ ...prev, [key]: value }))
    }

    const handelGenerateSlip = async (params: string) => {
        try {
            setPayRollInput((prev) => ({ ...prev, created_month: selecteDate ?? "", employee_uuid: params }))
            dispatch(GeneratePayrollThunks(PayRollInput))
        } catch (error) {
            console.log(error, "payroll")
        }
    }

    return (
        <div>
            <h1 style={{ ...FONTS.Main, color: COLORS.primary }} className='p-2'>Payroll</h1>

            <div
                className="h-[78vh] w-full bg-cover rounded-2xl"
                style={{ backgroundImage: `url(${BgImg})` }}
            >
                <div className=' flex justify-between w-full px-4 py-4'>

                    <div className='bg-[#E2E2DE] w-[24%] rounded-3xl p-3 shadow-[0px_0px_15px_0px_#C3C7C64D] h-[73vh] overflow-hidden' >
                        <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary, padding: "10px 0" }}>Employee List</h1>
                        <div className='flex flex-col gap-4 h-full pb-12 pt-1 scrollbar-hide overflow-auto '>
                            {employies.map((items: EmployeeProfile, index) => (
                                <section key={index} className='bg-[#EAEBE8] w-full h-min rounded-lg p-3 grid gap-3' onClick={() => setEmpUUID(items?.uuid)}>
                                    <p style={{ ...FONTS.table_data, color: COLORS.primary }}>Name : {items?.first_name + ' ' + items?.last_name}</p>
                                    <p style={{ ...FONTS.table_data, color: COLORS.primary }}>Designation : {items?.emp_role}r</p>
                                </section>
                            ))}
                        </div>
                    </div>





                    <div className=' relative w-[43.5%] rounded-2xl p-3 overflow-visible scrollbar-hide h-[68vh] pt-18'>
                        <input type="text" style={{ ...FONTS.Nav, color: COLORS.primary }} placeholder='Search' className='bg-[#4A70790D] absolute w-[94%] m-auto z-99 -top-3 p-3 px-4 border border-[#4A7079] outline-0 rounded-3xl' />

                        <div className=' h-[62vh] rounded-lg overflow-y-scroll scrollbar-hide'>
                            {/* <div className='bg-[#E2E2DE] shadow-0px_0px_15px_0px_[#C3C7C64D] rounded-2xl p-3'>
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
                            </div> */}



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
                                        onChange={(e) => handelInputChange('worked_days', e)}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />
                                    <input
                                        style={{ ...FONTS.Nav, color: COLORS.primary }}
                                        type="number"
                                        min="0"
                                        className="bg-[#EAEBE8] px-3 py-2 rounded-lg w-full border border-[#4A7079] outline-0
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Loss Of Pay"
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => handelInputChange('loss_of_pay', e)}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />
                                    <input
                                        style={{ ...FONTS.Nav, color: COLORS.primary }}
                                        type="number"
                                        min="0"
                                        className="bg-[#EAEBE8] px-3 py-2 rounded-lg w-full border border-[#4A7079] outline-0
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="No of Arrear Day"
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => handelInputChange('arrear_days', e)}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />
                                    <input
                                        style={{ ...FONTS.Nav, color: COLORS.primary }}
                                        type="number"
                                        min="0"
                                        className="bg-[#EAEBE8] px-3 py-2 rounded-lg w-full border border-[#4A7079] outline-0
                                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        placeholder="Paid Days"
                                        onKeyDown={(e) => {
                                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => handelInputChange('paid_days', e)}
                                        onWheel={(e) => e.currentTarget.blur()} // prevents scroll changing value
                                    />

                                </div>
                                <div className='grid grid-cols-2'>
                                    <CalendarPicker setselecteDate={setselecteDate} />

                                    <div className='  rounded-lg flex gap-3 justify-end items-center mt-4'>
                                        <button className='bg-[#4A70790D] border border-[#4A7079] px-6 py-1 rounded-md' style={{ ...FONTS.view_btn, color: COLORS.primary }}>Reset</button>
                                        <button onClick={() => handelGenerateSlip(selectedEmp?.uuid ?? "")} className='bg-[#4A7079] border border-[#4A7079] text-[#FFFFFF] px-6 py-1 rounded-md' style={{ ...FONTS.view_btn }}>Generate</button>
                                    </div>

                                </div>

                            </div>

                            <div className='bg-[#E2E2DE] shadow-0px_0px_15px_0px_[#C3C7C64D] rounded-2xl p-3 mt-4'>
                                <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Previous PaySlips</h1>

                                <div className='mt-4 flex justify-between gap-6'>
                                    <table className="w-full -mt-5 border-separate border-spacing-y-4 overflow-auto">
                                        <thead className="sticky top-0">
                                            <tr style={{ background: COLORS.primary }} className='text-left text-white rounded-lg'>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-l-lg">Date</th>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3">paid Days</th>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Credited Amt</th>
                                                <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-r-lg">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody className='overflow-y-scroll'>

                                            {selectedEmp?.payroll_slip && selectedEmp?.payroll_slip?.length ? selectedEmp?.payroll_slip?.map((items, index) => (
                                                <tr key={index} style={{ color: COLORS.primary }} className='bg-[#EAEBE8]  rounded-lg'>
                                                    <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg">{items?.created_month}</td>
                                                    <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.paid_days}</td>
                                                    <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.gross_total}</td>
                                                    <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-r-lg"><img src={DownloadIcon} alt="" className='w-[25px] h-[25px] cursor-pointer' onClick={() => handleDownload(items?.uuid)} /></td>
                                                </tr>
                                            )) :
                                                <tr style={{ color: COLORS.primary }} className='bg-[#EAEBE8]  rounded-lg'>
                                                    <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg"></td>
                                                    <td style={{ ...FONTS.table_data }} className="px-4 py-3">No Slip Founed</td>
                                                    <td style={{ ...FONTS.table_data }} className="px-4 py-3"></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>





                    <div className='bg-[#EAEBE8] w-[31%] rounded-3xl p-3 overflow-scroll scrollbar-hide h-[73vh] shadow-[0px_0px_15px_0px_#C3C7C64D]'>
                        <section className='flex gap-4 items-center mb-4'>
                            <div className='bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center' style={{ ...FONTS.card_initial }}>K</div>
                            <div className='grid gap-1'>
                                <h1 style={{ ...FONTS.payroll_profileHead, color: COLORS.primary }}>Name : {selectedEmp?.first_name + ' ' + selectedEmp?.last_name}</h1>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.department?.dpt_name}</p>
                            </div>
                        </section>

                        <div className='border border-[#C3C7C6] mb-4'></div>

                        <section className='my-4'>
                            <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }}>Basic Info</h1>
                            <div className='flex justify-between gap-4 mt-2'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Emp ID</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>{selectedEmp?.emp_id}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Designation</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.emp_role}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>CTC</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.ctc}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Department</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.department?.dpt_name}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Work Mode</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.work_mode}</p>
                            </div>
                        </section>

                        <div className='border border-[#C3C7C6]'></div>


                        <section className='my-4'>
                            <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }}>Personal Information</h1>
                            <div className='flex justify-between gap-4 mt-2'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Date of Birth</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>{selectedEmp?.dob}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Father's Name</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.father_name}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Email</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.contact_info?.email}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Mobile</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.contact_info?.phone}</p>
                            </div>
                            <div className='flex justify-between gap-4 mt-1'>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Address</p>
                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{selectedEmp?.contact_info?.address}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payroll
