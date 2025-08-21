import CompanyInfo from "../../Components/dashboad/CompanyInfo"
import DashBoardView from "../../Components/dashboad/DashBoardView"
import EmployeeByDpt from "../../Components/dashboad/EmployeeByDpt"
import { SalaryDetailCard } from "../../Components/dashboad/SalaryDetailCard"
import { FONTS } from "../../constants/uiconstants"

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <h1 style={{ ...FONTS.Main }}>Home</h1>
      <div className="w-full h-max shadow-[0px_0px_15px_0px_#4A707966] rounded-xl p-2">
        <h1 style={{ ...FONTS.card_name }}>Company Info:</h1>
        <CompanyInfo />
      </div>

      <div className="flex flex-col gap-5 p-2 rounded-xl shadow-[0px_0px_15px_0px_#4A707966]">
        <h1 style={{ ...FONTS.card_name }}>Overview</h1>
        <div className="grid grid-cols-3 w-full h-full gap-5">
          <div>
            <SalaryDetailCard />
          </div>
          <div className="">
            <DashBoardView />
          </div>
          <div className="col-span-1 col-start-3">
            <EmployeeByDpt />
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashBoard