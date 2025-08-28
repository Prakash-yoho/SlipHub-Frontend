/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../constants/uiconstants'
import Form from '../../Components/form/Form';
import { DrawerForm } from '../../Components/HrProfile/HrProfile';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { GetAllHrThunks } from '../../features/HrProfile/redux/thunks';
import type { HrProfileType } from '../../Type/HrProfiles/Type';
import { GetFormDepartmentThunks } from '../../features/common/redux/thunks';

const HrProfiles = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setisOpen] = useState(false);
    const [selectedHr, setselectedHr] = useState("");

    const AllHrProfile = useSelector((state: RootState) => state.hrstore.data)
    const departmentData = useSelector((state: RootState) => state.common.department)

    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [isOpenDpt, setIsOpenDpt] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectHrData, setselectHrData] = useState<HrProfileType | null>(null);

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(GetAllHrThunks())
        dispatch(GetFormDepartmentThunks())
    }, [dispatch]);

    const handleDepartmentChange = (name: string) => {
        setSelectedDepartment(name);
        setIsOpenDpt(false);
    };

    const filteredProfiles = AllHrProfile?.filter((hrdata: HrProfileType) => {
        // Department filter
        const matchesDepartment = !selectedDepartment || hrdata?.department?.[0]?.dpt_name === selectedDepartment;

        // Search filter (by name or emp_id)
        const fullName = (hrdata?.first_name + " " + hrdata?.last_name).toLowerCase();
        const empId = hrdata?.emp_id?.toLowerCase() || "";
        const matchesSearch =
            fullName.includes(searchQuery.toLowerCase()) ||
            empId.includes(searchQuery.toLowerCase());

        return matchesDepartment && matchesSearch;
    });

    return (
        <div className='py-6 '>
            <div className='flex justify-between items-center'>
                <h1 style={{ ...FONTS.Main, color: COLORS.primary }}>Hr Profiles</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ ...FONTS.Main_btn, background: COLORS.primary }}
                    className='text-[#FFFFFF] px-3 py-[4px] rounded-md'
                >
                    Add HR
                </button>
            </div>

            <DrawerForm isOpen={isOpen} setIsOpen={setisOpen} hrUUID={selectedHr} seletedHrData={setselectHrData} setIsModalOpen={setIsModalOpen} />

            <div className='flex justify-between items-center mt-6'>
                <section className='flex gap-4'>
                    {/* Department Dropdown */}
                    <div className="relative">
                        <div
                            onClick={() => setIsOpenDpt(!isOpenDpt)}
                            style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }}
                            className="text-[#FFFFFF] px-3 min-w-[170px] py-[4px] flex justify-between items-center cursor-pointer gap-5 rounded-md"
                        >
                            <span style={{ ...FONTS.Main_btn }}>
                                {selectedDepartment ?? "Departments"}
                            </span>
                            <svg
                                className={`w-4 h-4 transition-transform ${isOpenDpt ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>

                        {isOpenDpt && (
                            <div className="absolute top-full h-[40vh] overflow-scroll scrollbar-hide left-0 right-0 mt-2 bg-gray-100 rounded-lg p-2 shadow-lg z-10">
                                {departmentData.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4">No Departments Found</p>
                                ) : (
                                    departmentData.map((option: any, index) => (
                                        <button
                                            type="button"
                                            key={index}
                                            onClick={() => handleDepartmentChange(option?.dpt_name)}
                                            className="w-full text-left px-4 py-3 mb-2 last:mb-0 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300 text-gray-700 transition-colors"
                                        >
                                            {option?.dpt_name}
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }}
                        className='text-[#FFFFFF] px-3 py-[4px] rounded-md'
                    >
                        Experience
                    </button>
                </section>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='bg-[#4A70790D] text-[#4A7079] font-bold border border-[#4A7079] rounded-md px-3 py-[6px] outline-0 w-[400px]'
                    placeholder='Search by name or employee ID'
                />
            </div>


            {/* HR Profiles List */}
            <div className='mt-10 grid grid-cols-3 gap-6 lg:h-[57vh] xl:h-[62vh] 2xl:h-[70vh] p-2 overflow-y-scroll scrollbar-hide'>
                {filteredProfiles && filteredProfiles.length > 0 ? (
                    filteredProfiles.map((hrdata: HrProfileType, index) => (
                        <section
                            key={index}
                            className='shadow-[0px_0px_15px_0px_#4A707966] p-4 rounded-xl h-max w-full'
                            style={{ background: COLORS.card_bg }}
                        >
                            <div className='flex justify-between items-center'>
                                <section className='flex gap-4 items-center mb-4'>
                                    <div
                                        className='bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center'
                                        style={{ ...FONTS.card_initial }}
                                    >
                                        {hrdata?.first_name?.[0]}
                                    </div>
                                    <div className='grid gap-1'>
                                        <h1 style={{ ...FONTS.card_name, color: COLORS.primary }}>
                                            {hrdata?.first_name + ' ' + hrdata?.last_name}
                                        </h1>
                                        <p style={{ ...FONTS.Nav }} className='uppercase text-[#5A5A5A]'>
                                            {hrdata?.emp_id}
                                        </p>
                                    </div>
                                </section>
                                <button
                                    style={{ ...FONTS.view_btn, background: COLORS.primary }}
                                    onClick={() => { setisOpen(true); setselectedHr(hrdata?.uuid ?? "") }}
                                    className='text-[#FFFFFF] px-3 py-[4px] rounded-md'
                                >
                                    View
                                </button>
                            </div>

                            <div className='text-[#7697A0] flex justify-between'>
                                <p style={{ ...FONTS.card_role }}>{hrdata?.department?.[0]?.dpt_name}</p>
                                <span className='w-[2px] bg-[#C3C7C6]'></span>
                                <p style={{ ...FONTS.card_role }}>{hrdata?.contact_info?.email}</p>
                            </div>

                            <div className=' grid grid-cols-3 gap-2 mt-5'>
                                <p className='bg-[#E0E0E0] p-2 rounded-lg font-semibold' style={{ ...FONTS.card_detail, color: COLORS.primary }}>
                                    Join Date : {hrdata?.join_date}
                                </p>
                                <p className='bg-[#E0E0E0] p-2 rounded-lg font-semibold' style={{ ...FONTS.card_detail, color: COLORS.primary }}>
                                    Experience : {hrdata?.experience}
                                </p>
                                <p className='bg-[#E0E0E0] p-2 rounded-lg font-semibold' style={{ ...FONTS.card_detail, color: COLORS.primary }}>
                                    Current CTC : {hrdata?.ctc}
                                </p>
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="col-span-3 flex justify-center items-center h-full">
                        <p style={{ ...FONTS.Main, color: COLORS.primary }} className="text-lg">
                            No Data Found
                        </p>
                    </div>
                )}
            </div>

            <Form isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} formType='hr' HrEdit={selectHrData} />
        </div>
    )
}

export default HrProfiles
