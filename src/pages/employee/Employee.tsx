import { MoreVertical } from 'lucide-react'
import { COLORS, FONTS } from '../../constants/uiconstants'

const Employee = () => {
  return (
    <div className='py-6 px-8'>
      <div className='flex justify-between items-center'>
        <h1 style={{ ...FONTS.Main, color: COLORS.primary }}>Employee Profiles</h1>
        <button style={{ ...FONTS.Main_btn, background: COLORS.primary }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Add Employee</button>
      </div>

      <div className='flex justify-between items-center mt-6'>
        <section className='flex gap-4'>
          <button style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Department</button>
          <button style={{ ...FONTS.Main_btn, background: COLORS.sub_btn }} className='text-[#FFFFFF] px-3 py-[4px] rounded-md'>Experience</button>
        </section>
        <input
          type="text"
          className='bg-[#4A70790D] text-[#4A7079] font-bold border border-[#4A7079] rounded-md px-3 py-[6px] outline-0 w-[400px]'
          placeholder='Search'
        />
      </div>

      {/* Table wrapper */}
      <div className='rounded-lg mt-6 '>
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="sticky top-0 z-10 ">
            <tr style={{ background: COLORS.primary }} className='text-left text-white'>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-l-lg">S.No</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Name</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Employee ID</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Join Date</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Designation</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">Email</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3">CTC</th>
              <th style={{ ...FONTS.table_head }} className="px-4 py-3 rounded-r-lg">Action</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable body */}
        <div className="max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] lg:max-h-[55vh] overflow-y-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <tbody>
              {Array(20).fill(null).map((_, index) => (
                <tr key={index} style={{ color: COLORS.primary }} className='bg-[#DDDED980] **:text-center'>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-l-lg">{index + 1}</td>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3">Kamal</td>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3 uppercase">yt2505</td>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3">20-8-2025</td>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3">Developer</td>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3">kamal@gmail.com</td>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3">800000</td>
                  <td style={{ ...FONTS.table_data }} className="px-4 py-3 rounded-r-lg">
                    <MoreVertical className="w-5 h-5 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Employee
