/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import CompanyInfo from "../../Components/dashboad/CompanyInfo"
import DashBoardView from "../../Components/dashboad/DashBoardView"
import EmployeeByDpt from "../../Components/dashboad/EmployeeByDpt"
import { SalaryDetailCard } from "../../Components/dashboad/SalaryDetailCard"
import { COLORS, FONTS } from "../../constants/uiconstants"
import { GetLocalStorage } from "../../utils/localstorage"
import { dashboadService } from "../../features/Auth/service"

const DashBoard = () => {

  const company = GetLocalStorage("company")
  const [DashBoard, setDashBoard] = useState<any>({});

  useEffect(() => {
    (async () => {
      const data = await dashboadService(company)
      setDashBoard(data)
    })()
  }, [company]);

  return (
    <div
  className={`flex flex-col w-full p-4 overflow-y-auto`}
  style={{
    scrollbarWidth: "none",
  }}
>
      <h1 style={{ ...FONTS.Main, color: COLORS.primary }}>Home</h1>

      <div className="flex flex-col h-full gap-5 w-full">
        
        {/* TOP GRID */}
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="w-full h-full md:col-span-2 bg-[#DDDED980] rounded-2xl shadow-[0px_0px_15px_0px_#4A707966]">
            <CompanyInfo company_details={DashBoard?.company} />
          </div>
          
          <div className="w-full h-full md:col-start-3">
            <DashBoardView dashboard={DashBoard} />
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 pb-6">
          
          <div className="w-full h-auto md:h-[350px] p-6 flex flex-col justify-center items-center bg-[#DDDED980] shadow-[0px_0px_15px_0px_#4A707966] rounded-2xl">
            <h1 
              className="!text-[#4A7079] !font-semibold w-full text-start p-2 -mt-5"
              style={{ ...FONTS.table_head }}
            >
              Salaries By Department
            </h1>
            <SalaryDetailCard
              roles={DashBoard?.salary_chts?.roles ?? []}
              actualSalaries={DashBoard?.salary_chts?.actualSalaries ?? []}
              totalSalaries={DashBoard?.salary_chts?.totalSalaries ?? []}
            />
          </div>

          <div className="w-full h-auto md:h-[350px] p-6 flex flex-col bg-[#DDDED980] shadow-[0px_0px_15px_0px_#4A707966] gap-5 rounded-2xl">
            <h1 
              className="!text-[#4A7079] !font-semibold w-full -mt-5"
              style={{ ...FONTS.table_head }}
            >
              Employees By Department
            </h1>
            <EmployeeByDpt employeeData={DashBoard?.department_chart} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashBoard
