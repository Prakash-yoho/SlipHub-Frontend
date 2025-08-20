import CompanyInfo from "../../Components/dashboad/CompanyInfo"
import DashBoardView from "../../Components/dashboad/DashBoardView"
import EmployeeByDpt from "../../Components/dashboad/EmployeeByDpt"

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="w-full h-32 border">
        <CompanyInfo />
      </div>
      <div className="grid grid-cols-3 w-full gap-5">
        <div className=" col-span-2">
          <DashBoardView />
        </div>
        <div className="col-span-1 col-start-3">
          <EmployeeByDpt />
        </div>
      </div>

      <div>
        salary pie chart dpt wice
      </div>

      <div>
        activity logs
      </div>

      <div>
        recent payrolls
      </div>
    </div>
  )
}

export default DashBoard