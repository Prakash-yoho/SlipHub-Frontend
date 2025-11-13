/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import bg from '../../assets/Rectangle.png'
import DownloadIcon from '../../assets/Comman/Download.png'
import { COLORS, FONTS } from '../../constants/uiconstants'
import CalendarPicker from '../../Components/ui/CalendarPicker'
import EmployerPrevSlip from '../../Components/employer/EmployerPrevSlip'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { getOneemployeeThunks } from '../../features/EmployeeProfile/redux/thunks'
import CompanyInfo from '../../Components/dashboad/CompanyInfo'
import { GetLocalStorage } from '../../utils/localstorage'
import dayjs from "dayjs";
import { handleDownload, handleDownloadMonth } from '../../features/common/service'
import { MobileResponsive } from '../../hooks/MobileResponsive'
import type { EmployeeProfile } from '../../Type/Emp_profile/Type'
import edit from '../../assets/edit.png'
import Form from '../../Components/form/Form'
import { IoMdArrowRoundBack } from "react-icons/io";


const EmployerProfile: React.FC = () => {

    const { uuid } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Edits, setEdits] = useState<EmployeeProfile | null>(null);

    const navigate = useNavigate()


    const employer: EmployeeProfile = useSelector((state: RootState) => state.empolyee.selectedEmployee)

    const [choseDate, setchoseDate] = useState<Date | null>(null);

    const len = employer?.payroll_slip?.length

    const { MobileView } = MobileResponsive()

    const role = GetLocalStorage("role")


    useEffect(() => {
        if (role == "employee") {
            const EmpUUID: any = GetLocalStorage("uuid")
            dispatch(getOneemployeeThunks(EmpUUID))
        } else {
            dispatch(getOneemployeeThunks(uuid ?? ""))
        }
    }, [dispatch, role, uuid]);

    return (
        <div className={`overflow-y-scroll h-full scrollbar-hide ${MobileView && 'overflow-x-hidden'}`}>

            {role === "employee" && <CompanyInfo company_details={employer?.company_id} />}


            <div className="w-full h-full mt-5">
                <div
                    className="w-full h-[87vh] bg-cover rounded-4xl"
                    style={{ backgroundImage: `url(${bg})` }}
                >
                    <div className="flex flex-row w-full gap-5">
                        <div className={MobileView ? 'flex flex-col w-full' : "flex flex-col w-8/12"}>
                            <div className="w-full h-20 flex rounded-4xl items-baseline ml-5">
                                {
                                    role !== "employee" && <div>
                                        <div className='bg-[#7697A0] p-2 h-10 w-10 rounded-[50%]' onClick={() => navigate(-1)}>
                                            <IoMdArrowRoundBack className='text-white h-5 w-5' />
                                        </div>
                                    </div>
                                }
                                <CalendarPicker setselecteDate={setchoseDate} />
                                <div className="bg-[#7697A0] w-max p-2 px-6 h-max rounded-lg font-bold text-white text-md cursor-pointer" onClick={() => handleDownloadMonth(choseDate, employer?.uuid)}>Generate</div>
                            </div>
                            <div className="flex flex-col w-full h-[75vh] mx-4 rounded-3xl gap-5 py-4">
                                <div className={`w-full ${MobileView ? 'h-42 -ml-2' : 'h-52'}  bg-[#EAEBE8] rounded-2xl`}>
                                    <EmployerPrevSlip payslip={len ? employer?.payroll_slip?.[len - 1] : undefined} />
                                </div>

                                <div className={`w-full h-96 bg-[#EAEBE8] rounded-2xl px-4 overflow-y-scroll scrollbar-hide ${MobileView && '-ml-2'}`}>
                                    <h1 style={{ ...FONTS.payroll_head, color: COLORS.primary }} className={`${MobileView && '!text-[14px]'} pt-4`}>Previous PaySlips</h1>

                                    <div className="flex justify-between gap-6">
                                        <div className="w-full max-h-80 " style={{ scrollbarWidth: 'none' }}>
                                            <table className="w-full border-separate border-spacing-y-4" >
                                                <thead className="sticky top-0">
                                                    <tr style={{ background: COLORS.primary }} className={`text-left text-white rounded-lg ${MobileView && '**:!text-[12px]'}`}>
                                                        <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-l-lg">Month</th>
                                                        <th style={{ ...FONTS.table_head }} className="px-4 py-3">Wrk Days</th>
                                                        <th style={{ ...FONTS.table_head }} className="px-4 py-3">Credited Amt</th>
                                                        <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-r-lg">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {employer?.payroll_slip && employer?.payroll_slip?.length > 0 ? employer?.payroll_slip?.map((items: any, index: any) => (
                                                        <tr key={index} style={{ color: COLORS.primary }} className={`bg-[#F8F8F8] rounded-lg ${MobileView && '**:!text-[10px]'}`}>
                                                            <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg"> {dayjs(items?.created_month).format("MMMM-YYYY")}</td>
                                                            <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.paid_days}</td>
                                                            <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.net_salary}</td>
                                                            <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-r-lg">
                                                                <img src={DownloadIcon} alt="" className="w-[25px] h-[25px] cursor-pointer" onClick={() => handleDownload(items?.uuid)} />
                                                            </td>
                                                        </tr>
                                                    )) :
                                                        <tr style={{ color: COLORS.primary }} className="bg-[#F8F8F8] rounded-lg">

                                                            <td style={{ ...FONTS.table_data }} className="px-4 py-3 text-center rounded-lg" colSpan={4}>No Slip Founded</td>

                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {
                            !MobileView &&
                            <div className="bg-[#EAEBE8] w-3/10 h-[82.3vh] m-4 rounded-3xl overflow-scroll scrollbar-hide">
                                <div className='w-full rounded-2xl p-3  h-ful shadow-[0px_0px_15px_0px_#C3C7C64D]'>
                                    <section className='flex justify-between items-center mb-4'>
                                        <div className='flex gap-4'>
                                            <div className='bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center' style={{ ...FONTS.card_initial }}>{employer?.first_name?.[0].toLocaleUpperCase()}</div>
                                            <div className='grid gap-1'>
                                                <h1 style={{ ...FONTS.payroll_profileHead, color: COLORS.primary }}>Name : {employer?.first_name + ' ' + employer?.last_name}</h1>
                                                <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.department?.dpt_name}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row bg-[#7697A0] py-2  w-max gap-2 h-10 text-xl items-center rounded-lg text-white px-3 cursor-pointer' onClick={() => {
                                            setIsModalOpen?.(true);
                                            setEdits(employer)
                                        }
                                        }>
                                            <img src={edit} alt="" className='w-5 h-5 ' />
                                        </div>
                                    </section>

                                    <div className='border border-[#C3C7C6] mb-4'></div>

                                    <section className='my-4'>
                                        <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }}>Basic Info</h1>
                                        <div className='flex justify-between gap-4 mt-2'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Emp ID</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }} className='uppercase'>{employer?.emp_id}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Designation</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.emp_role}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>CTC(Monthly)</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.ctc}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>UAN No</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.pf_acc}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Department</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.department?.dpt_name}</p>
                                        </div>
                                        {/* <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Work Mode</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.work_mode}</p>
                                        </div> */}
                                    </section>

                                    <div className='border border-[#C3C7C6]'></div>


                                    <section className='my-4'>
                                        <h1 style={{ ...FONTS.payroll_Head, color: COLORS.primary }}>Personal Information</h1>
                                        <div className='flex justify-between gap-4 mt-2'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Date of Birth</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{dayjs(employer?.dob).format("DD-MMM-YYYY")}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Father's Name</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.father_name}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Email</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.contact_info?.email
                                                ? employer.contact_info.email.length > 20
                                                    ? employer.contact_info.email.slice(0, 20) + "...."
                                                    : employer.contact_info.email
                                                : ""}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Mobile</p>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.contact_info?.phone}</p>
                                        </div>
                                        <div className='flex justify-between gap-4 mt-1'>
                                            <p style={{ ...FONTS.Nav, color: COLORS.primary }}>Address</p>
                                            <p className='break-words' style={{ ...FONTS.Nav, color: COLORS.primary }}>{employer?.contact_info?.address}</p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <Form isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} formType='employee' EmplopyEdit={Edits} />

        </div>
    )
}

export default EmployerProfile