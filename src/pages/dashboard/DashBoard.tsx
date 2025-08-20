import DashBoardView from "../../Components/dashboad/DashBoardView"
import EmployeeByDpt from "../../Components/dashboad/EmployeeByDpt"

const DashBoard = () => {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
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