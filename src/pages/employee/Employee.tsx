/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, FONTS } from '../../constants/uiconstants'
import type { AppDispatch, RootState } from '../../store/store'
import { useEffect, useState, useMemo } from 'react'
import { GetAllEmployeeThunks } from '../../features/EmployeeProfile/redux/thunks'
import { GetAllDepartmentThunks } from '../../features/Department/redux/thunks'
import type { EmployeeProfile } from '../../Type/Emp_profile/Type'
import Form from '../../Components/form/Form'
import { useNavigate } from 'react-router-dom'
import { GetLocalStorage } from '../../utils/localstorage'
import dayjs from 'dayjs'

const Employee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>("Departments");
  const [selectedExp, setSelectedExp] = useState<string>("Experience");
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const employees: EmployeeProfile[] = useSelector((state: RootState) => state.empolyee.data)
  const departments = useSelector((state: RootState) => state.department.data)

  useEffect(() => {
    dispatch(GetAllEmployeeThunks())
    dispatch(GetAllDepartmentThunks())
  }, [dispatch]);

  function onclose() {
    setIsOpen(false)
  }

  const filteredEmployees = useMemo(() => {
    return employees
      ?.filter(emp =>
        selectedDept === "Departments" || emp?.department?.dpt_name === selectedDept
      )
      ?.filter(emp => {
        if (selectedExp === "All Experience") return true;
        if (selectedExp === "0-1 Years") {
          const exp = typeof emp?.experience === "number" ? emp.experience : Number(emp?.experience);
          return exp !== undefined && !isNaN(exp) && exp <= 1;
        }
        if (selectedExp === "1-3 Years") {
          const exp = typeof emp?.experience === "number" ? emp.experience : Number(emp?.experience);
          return exp > 1 && exp <= 3;
        }
        if (selectedExp === "3+ Years") {
          const exp = typeof emp?.experience === "number" ? emp.experience : Number(emp?.experience);
          return exp !== undefined && !isNaN(exp) && exp > 3;
        }
        return true;
      })
      ?.filter(emp =>
        emp?.first_name?.toLowerCase().includes(search.toLowerCase()) ||
        emp?.last_name?.toLowerCase().includes(search.toLowerCase()) ||
        emp?.emp_id?.toLowerCase().includes(search.toLowerCase()) ||
        emp?.contact_info?.email?.toLowerCase().includes(search.toLowerCase())
      );
  }, [employees, selectedDept, selectedExp, search]);
  const role = GetLocalStorage('role')

  return (
    <div className='py-6 px-4 sm:px-6 md:px-8 h-screen overflow-hidden'>

      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <h1 style={{ ...FONTS.Main, color: COLORS.primary }}>Employee Profiles</h1>

        {role === "hr" && (
          <button
            onClick={() => setIsOpen(true)}
            style={{ ...FONTS.Main_btn, background: COLORS.primary }}
            className='text-[#FFFFFF] px-4 py-[6px] rounded-md cursor-pointer w-full sm:w-auto'
          >
            Add Employee
          </button>
        )}
      </div>

      <Form isOpen={isOpen} onClose={onclose} formType='employee' />

      {/* Filters Section */}
      <div className='flex flex-col md:flex-row justify-between gap-4 mt-6'>

        {/* Dropdown Section */}
        <section className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>

          {/* Department Dropdown */}
          <div className="relative w-full sm:w-[200px]">
            <div
              onClick={() => setDeptOpen(!deptOpen)}
              style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }}
              className="text-[#FFFFFF] px-3 py-[6px] flex justify-between items-center cursor-pointer gap-5 rounded-md w-full"
            >
              {selectedDept}
              <svg
                className={`w-4 h-4 transition-transform ${deptOpen ? "rotate-180" : ""}`}
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

            {deptOpen && (
              <div className="absolute top-full max-h-[40vh] left-0 right-0 overflow-scroll scrollbar-hide mt-2 bg-gray-100 rounded-lg p-2 shadow-lg z-10">
                <button
                  onClick={() => { setSelectedDept("Departments"); setDeptOpen(false); }}
                  className="w-full text-left px-4 py-3 mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300"
                >
                  Departments
                </button>

                {departments?.map((dept: any) => (
                  <button
                    key={dept?.uuid}
                    onClick={() => { setSelectedDept(dept?.dpt_name); setDeptOpen(false); }}
                    className="w-full text-left px-4 py-3 mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300"
                  >
                    {dept?.dpt_name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Experience Dropdown */}
          <div className="relative w-full sm:w-[200px]">
            <div
              onClick={() => setExpOpen(!expOpen)}
              style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }}
              className="text-[#FFFFFF] px-3 py-[6px] flex justify-between items-center cursor-pointer gap-5 rounded-md w-full"
            >
              {selectedExp}
              <svg
                className={`w-4 h-4 transition-transform ${deptOpen ? "rotate-180" : ""}`}
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

            {expOpen && (
              <div className="absolute top-full max-h-[40vh] left-0 right-0 overflow-scroll scrollbar-hide mt-2 bg-gray-100 rounded-lg p-2 shadow-lg z-10">
                {["All Experience", "0-1 Years", "1-3 Years", "3+ Years"].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => { setSelectedExp(exp); setExpOpen(false); }}
                    className="w-full text-left px-4 py-3 mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300"
                  >
                    {exp}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SEARCH */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-[#4A70790D] text-[#4A7079] font-bold border border-[#4A7079] rounded-md px-3 py-[6px] outline-0 w-full md:w-[350px] lg:w-[400px]'
          placeholder='Search by name, ID, email...'
        />
      </div>

      {/* TABLE CONTAINER */}
      <div className='rounded-lg mt-6 h-[55vh] sm:h-[60vh] md:h-[62vh] lg:h-[65vh] xl:h-[67vh] 2xl:h-[70vh] 
          overflow-y-scroll overflow-x-auto scrollbar-hide'>

        <div className="min-w-[900px]">
          <table className="w-full border-separate border-spacing-y-4">
            <thead className="sticky top-0">
              <tr style={{ background: COLORS.primary }} className='text-left text-white'>
                <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-l-lg">S.No</th>
                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Name</th>
                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Employee ID</th>
                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Join Date</th>
                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Designation</th>
                <th style={{ ...FONTS.table_head }} className="px-4 py-3">Email</th>
                <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-r-lg">CTC(Monthly)</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((items: EmployeeProfile, index) => (
                  <tr
                    key={items?.uuid}
                    style={{ color: COLORS.primary }}
                    className='bg-[#DDDED980] cursor-pointer'
                    onClick={() => navigate(`/employee/${items?.uuid}`)}
                  >
                    <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg">{index + 1}</td>
                    <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.first_name + ' ' + items?.last_name}</td>
                    <td style={{ ...FONTS.table_data }} className="px-4 py-3 uppercase">{items?.emp_id}</td>
                    <td style={{ ...FONTS.table_data }} className="px-4 py-3">{dayjs(items?.join_date).format("DD-MMM-YYYY")}</td>
                    <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.emp_role}</td>
                    <td style={{ ...FONTS.table_data }} className="px-4 py-3">
                      {items?.contact_info?.email
                        ? items.contact_info.email.length > 20
                          ? items.contact_info.email.slice(0, 20) + "...."
                          : items.contact_info.email
                        : ""}
                    </td>
                    <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-r-lg">{items?.ctc}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-[#4A7079] font-semibold">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default Employee
