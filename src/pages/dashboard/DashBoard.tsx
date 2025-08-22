import CompanyInfo from "../../Components/dashboad/CompanyInfo"
import DashBoardView from "../../Components/dashboad/DashBoardView"
import EmployeeByDpt from "../../Components/dashboad/EmployeeByDpt"
import { SalaryDetailCard } from "../../Components/dashboad/SalaryDetailCard"
import { FONTS } from "../../constants/uiconstants"

const DashBoard = () => {
  return (
    <div className="flex flex-col w-full p-4 h-[95vh]">
      <h1 style={{ ...FONTS.Main }}>Home</h1>

      <div className="flex flex-col h-[90vh] gap-5 w-full">
        <div className="grid w-full grid-cols-3 gap-5">
          <div className="w-full h-full col-span-2 bg-[#DDDED980] rounded-2xl shadow-[0px_0px_15px_0px_#4A707966]">
            <CompanyInfo />
          </div>
          <div className="w-full h-full col-start-3">
            <DashBoardView />
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-5">
          <div className="w-full h-[350px] p-6 flex flex-col justify-center items-center bg-[#DDDED980] shadow-[0px_0px_15px_0px_#4A707966] rounded-2xl">
            <h1 className="!text-[#4A7079] !font-semibold w-full text-start p-2 -mt-5" style={{ ...FONTS.table_head }}>Salaries By Department</h1>
            <SalaryDetailCard
              roles={['Developer', 'Manager', 'Designer', 'QA']}
              actualSalaries={[1200, 1500, 800, 600]}
              totalSalaries={[2500, 2000, 1000, 600]}
            />

          </div>
          <div className="w-full h-[350px] p-6 flex flex-col bg-[#DDDED980] shadow-[0px_0px_15px_0px_#4A707966] gap-5 rounded-2xl">
            <h1 className="!text-[#4A7079] !font-semibold w-full h-full -mt-5" style={{ ...FONTS.table_head }}>Employeis By Department</h1>
            <EmployeeByDpt />
          </div>
        </div>
      </div>


    </div>
  )
}

export default DashBoard