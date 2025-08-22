import CompanyInfo from "../../Components/dashboad/CompanyInfo"
import DashBoardView from "../../Components/dashboad/DashBoardView"
import EmployeeByDpt from "../../Components/dashboad/EmployeeByDpt"
import { SalaryDetailCard } from "../../Components/dashboad/SalaryDetailCard"
import { FONTS } from "../../constants/uiconstants"

const DashBoard = () => {
  return (
    <div className="flex flex-col w-full p-4 h-[95vh]">
      <h1 style={{ ...FONTS.Main }}>Home</h1>

      <div className="flex flex-col gap-5 w-full overflow-y-scroll">
        <div className="grid w-full grid-cols-3 gap-5 overflow-hidden">
          <div className="w-full col-span-2">
            <CompanyInfo />
          </div>
          <div className="w-full col-start-3">
            <DashBoardView />
          </div>
        </div>


        <div className="grid grid-cols-2 w-full h-full gap-5 overflow-hidden">
          <div>
            <SalaryDetailCard />
          </div>
          <div className="">
            <EmployeeByDpt />
          </div>
        </div>
      </div>


    </div>
  )
}

export default DashBoard