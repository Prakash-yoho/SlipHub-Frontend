import { useDispatch, useSelector } from 'react-redux'
import { COLORS, FONTS } from '../../constants/uiconstants'
import type { AppDispatch, RootState } from '../../store/store'
import { useEffect, useState } from 'react'
import { GetAllEmployeeThunks } from '../../features/EmployeeProfile/redux/thunks'
import type { EmployeeProfile } from '../../Type/Emp_profile/Type'
import Form from '../../Components/form/Form'
import { useNavigate } from 'react-router-dom'

const Employee = () => {

  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const employies: EmployeeProfile[] = useSelector((state: RootState) => state.empolyee.data)

  useEffect(() => {
    dispatch(GetAllEmployeeThunks())
  }, [dispatch]);

  function onclose() {
    setisOpen(false)
  }
  return (
    <div className='py-6 px-8 h-screen'>
      <div className='flex justify-between items-center'>
        <h1 style={{ ...FONTS.Main, color: COLORS.primary }}>Employee Profiles</h1>
        <button onClick={() => setisOpen(true)} style={{ ...FONTS.Main_btn, background: COLORS.primary }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Add Employee</button>
      </div>

      <Form isOpen={isOpen} onClose={onclose} formType='employee' />

      <div className='flex justify-between items-center mt-6'>
        <section className='flex gap-4'>
          <button style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Department</button>
          <button style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Experience</button>
        </section>
        <input type="text" className='bg-[#4A70790D] text-[#4A7079] font-bold border border-[#4A7079] rounded-md px-3 py-[6px] outline-0 w-[400px]' placeholder='Search' />
      </div>

      <div className='rounded-lg mt-6 md:h-[55vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[70vh] overflow-y-scroll scrollbar-hide'>
        <table className="w-full -mt-5 border-separate border-spacing-y-4 overflow-auto">
          <thead className="sticky top-0">
            <tr style={{ background: COLORS.primary }} className='text-left text-white rounded-lg'>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-l-lg">S.No</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Name</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Employee ID</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Join Date</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Designation</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Email</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">CTC</th>
              {/* <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-r-lg">Action</th> */}
            </tr>
          </thead>

          <tbody className='overflow-y-scroll'>

            {employies.map((items: EmployeeProfile, index) => (
              <tr style={{ color: COLORS.primary }} className='bg-[#DDDED980] rounded-lg cursor-pointer' onClick={() => navigate(`/employee/${items?.uuid}`)}>
                <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg">{index + 1}</td>
                <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.first_name + ' ' + items?.last_name}</td>
                <td style={{ ...FONTS.table_data }} className="px-4 py-3 uppercase">{items?.emp_id}</td>
                <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.join_date}</td>
                <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.emp_role}</td>
                <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.contact_info?.email}</td>
                <td style={{ ...FONTS.table_data }} className="px-4 py-3">{items?.ctc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee