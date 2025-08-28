import { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../constants/uiconstants";
import DepartmentImg from "../../assets/Comman/airpod.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { GetAllDepartmentThunks } from "../../features/Department/redux/thunks";
import { GetAllHrThunks } from "../../features/HrProfile/redux/thunks";
import { CreateDepartmentService, DeleteDepartment } from "../../features/Department/service";

const Department = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dpt_id: "",
    dpt_name: "",
    departmentHead: "",
    HrName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // TODO: API call to save department
    const response = await CreateDepartmentService({
      ...formData,
      dpt_id: Number(formData.dpt_id),
    })

    console.log(response,"responseeeeeeeeeeeee")


    setIsModalOpen(false);
    setFormData({
      dpt_id: "",
      dpt_name: "",
      departmentHead: "",
      HrName: "",
    });
  };

  // Dropdown state
  const [isOpen, setIsOpen] = useState(false);

 

  const AllDepartment = useSelector((state: RootState) => state.department.data)
  const AllHrProfile = useSelector((state: RootState) => state.hrstore.data)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(GetAllDepartmentThunks())
    dispatch(GetAllHrThunks())
  }, [dispatch]);

  const options = AllHrProfile.map((data) => {
    return { value: data?.first_name, label: `${data?.first_name}   ${data?.last_name}`,id:data?.id }
  })
  //  [
  //   { value: AllHrProfile?.first_name, label: "Kamal" },
  //   { value: "Mugilan", label: "Mugilan" },
  //   { value: "Ram", label: "Ram" },
  //   { value: "Siva", label: "Siva" },
  //   { value: "Mathi", label: "Mathi" },
  // ];

  const handleSelect = (selectedValue: string) => {
    setFormData({ ...formData, HrName: selectedValue });
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === formData.HrName
  );


console.log(AllDepartment,AllHrProfile,"asdfgnm,./")
  return (
    <div className="p-4 h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 style={{ ...FONTS.Main, color: COLORS.primary }}>Department</h1>
        <button
          style={{ ...FONTS.Main_btn, background: COLORS.primary }}
          className="text-[#FFFFFF] px-3 py-[4px] rounded-md cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="mt-6">
        <input
          type="text"
          className="bg-[#4A70790D] text-[#4A7079] font-bold border border-[#4A7079] rounded-md px-3 py-[6px] outline-0 w-[40%]"
          placeholder="Search"
        />
      </div>

      {/* Department Cards */}
      <div className="h-[65vh] mt-6 grid grid-cols-3 gap-4 p-2 overflow-y-scroll scrollbar-hide">
        {AllDepartment?.map((data, index) => (
            <div
              key={index}
              className="bg-[#DDDED980] shadow-[0px_0px_15px_0px_#4A707966] p-3 rounded-lg grid items-center h-fit gap-3"
            >
              <section className="flex items-center gap-4">
                <img
                  src={DepartmentImg}
                  alt="dept img"
                  className="w-[25px] h-[25px]"
                />
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>
                  {data?.dpt_name}
                </p>
              </section>

              <p style={{ ...FONTS.table_data, color: COLORS.primary }}>
                HR Name : Kamal
              </p>

              <div className="flex justify-between items-center border border-[#4A7079] bg-[#4A70790D] p-2 rounded-lg">
                <p
                  style={{
                    ...FONTS.payroll_profileHead,
                    color: COLORS.primary,
                  }}
                >
                  Total Employee
                </p>
                <p
                  style={{
                    ...FONTS.payroll_profileHead,
                    color: COLORS.primary,
                  }}
                >
                    {data?.no_of_emp}
                </p>
              </div>
              <button onClick={()=>{DeleteDepartment(data?.uuid)}} className="cursor-pointer">Remove Department</button>
            </div>
          ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#EAEBE8] rounded-xl shadow-lg w-[50%] p-6 grid gap-4">
            <div className="flex items-center justify-between">
              <h2
                className="text-xl font-semibold text-center"
                style={{ ...FONTS.Main, color: COLORS.primary }}
              >
                Add Department
              </h2>

              <div
                className=" h-8 w-8 flex justify-center items-center cursor-pointer text-white rounded-md"
                style={{ background: COLORS.primary }}
                onClick={() => setIsModalOpen(false)}
              >
                x
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#7697A066]"></div>

            <form onSubmit={handleSubmit} className="grid gap-30">
              <div className="grid grid-cols-2 gap-4">
                {/* Department ID */}
                <div className="w-full">
                  <p
                    style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                    className="pb-3"
                  >
                    Department ID
                  </p>
                  <input
                    type="text"
                    name="dpt_id"
                    value={formData.dpt_id}
                    onChange={handleChange}
                    placeholder="Department ID"
                    className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                    required
                  />
                </div>

                {/* Department Name */}
                <div className="w-full">
                  <p
                    style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                    className="pb-3"
                  >
                    Department Name
                  </p>
                  <input
                    type="text"
                    name="dpt_name"
                    value={formData.dpt_name}
                    onChange={handleChange}
                    placeholder="Department Name"
                    className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                    required
                  />
                </div>

                {/* Department Head */}
                <div className="w-full">
                  <p
                    style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                    className="pb-3"
                  >
                    Department Head
                  </p>
                  <input
                    type="text"
                    name="departmentHead"
                    value={formData.departmentHead}
                    onChange={handleChange}
                    placeholder="Department Head"
                    className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                    required
                  />
                </div>

                {/* HR Dropdown */}
                <div className="w-full">
                  <p
                    style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                    className="pb-3"
                  >
                    HR
                  </p>

                  <div className="relative">
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                    className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full flex justify-between items-center"                    >
                      <span className="font-medium">
                        {selectedOption ? selectedOption.label : "Select HR"}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
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

                    {isOpen && (
                      <div className="absolute top-full h-[40vh] overflow-scroll scrollbar-hide left-0 right-0 mt-2 bg-gray-100 rounded-lg p-2 shadow-lg z-10">
                        {options.map((option) => (
                          <button
                            type="button"
                            key={option.value}
                            onClick={() => handleSelect(option.value ?? "")}
                            className="w-full text-left px-4 py-3 mb-2 last:mb-0 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300 text-gray-700 transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md border border-[#4A7079] bg-[#4A70790D]"
                  style={{
                    ...FONTS.payroll_profileHead,
                    color: COLORS.primary,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    ...FONTS.payroll_profileHead,
                    background: COLORS.primary,
                  }}
                  className="px-4 py-2 rounded-md text-[#FFFFFF] cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;
