/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { COLORS, FONTS } from "../../constants/uiconstants";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { CreateHrThunks } from "../../features/HrProfile/redux/thunks";
import type { HrProfileType } from "../../Type/HrProfiles/Type";
import type { EmployeeProfile } from "../../Type/Emp_profile/Type";
import { CreateEmployeeThunks } from "../../features/EmployeeProfile/redux/thunks";
import { GetFormDepartmentThunks } from "../../features/common/redux/thunks";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
  EmplopyEdit?: EmployeeProfile,
  HrEdit?: HrProfileType;
  formType: "hr" | "employee";
}

const Form: React.FC<FormProps> = ({ isOpen, onClose, EmplopyEdit, HrEdit, formType }) => {

  const dispatch = useDispatch<AppDispatch>()
  const [preview, setPreview] = useState<string | null>(null)

  const departmentData = useSelector((state: RootState) => state.common.department)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [empDpt, setempDpt] = useState<string | undefined>(undefined);
  const [dptDate, setdptDate] = useState<string[]>([]);
  const [isOpenDpt, setIsOpenDpt] = useState(false);

  useEffect(() => {
    dispatch(GetFormDepartmentThunks())
  }, [dispatch]);


  const [HrDetails, setHrDetails] = useState<HrProfileType>({
    emp_id: "",
    first_name: "",
    last_name: "",
    department: [],
    contact_info: {
      email: "",
      phone: "",
      address: "",
    },
    join_date: "",
    experience: "",
    ctc: 0,
    dob: "",
    emg_contact: "",
    father_name: "",
    qualification: {
      degree: "",
      specialization: "",
      year_of_completion: "",
      percentage: "",
    },
    image: "",
  });
  const [EmployeeDetails, setEmployeeDetails] = useState<EmployeeProfile>({
    emp_id: "",
    first_name: "",
    last_name: "",
    department: "",
    contact_info: {
      email: "",
      phone: "",
      address: "",
    },
    join_date: "",
    experience: "",
    ctc: 0,
    dob: "",
    emg_contact: "",
    father_name: "",
    qualification: {
      degree: "",
      specialization: "",
      year_of_completion: "",
      percentage: "",
    },
    image: "",
  });

  if (!isOpen) return null;
  const handleImageChange = (e: any) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handelsubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (formType === 'hr') {
        HrDetails.department = dptDate
        dispatch(CreateHrThunks(HrDetails))
        setSelectedDepartments([])
      } else if (formType === 'employee') {
        dispatch(CreateEmployeeThunks(EmployeeDetails))
      } else {
        console.log("mention form type")
      }
    } catch (error) {
      console.log(error, "error on hr added")
    }
  }

  const handleChangeInput = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault()
      const value = e.target.value
      if (formType === "hr") {
        setHrDetails((prev) => ({ ...prev, [key]: value }))
      } else if (formType === "employee") {
        setEmployeeDetails((prev) => ({ ...prev, [key]: value }))
      } else {
        console.log("change input error")
      }
    } catch (error) {
      console.log(error, "change input error")
    }
  }
  const handleContactInput = (key: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      e.preventDefault()
      const value = e.target.value
      if (formType === "hr") {
        setHrDetails((prev: HrProfileType) => ({ ...prev, contact_info: { ...prev?.contact_info, [key]: value } }))
      } else if (formType === "employee") {
        setEmployeeDetails((prev: EmployeeProfile) => ({ ...prev, contact_info: { ...prev?.contact_info, [key]: value } }))
      } else {
        console.log("change input error")
      }
    } catch (error) {
      console.log(error, "change input error")
    }
  }
  const handleQualificationInput = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault()
      const value = e.target.value
      if (formType === "hr") {
        setHrDetails((prev) => ({ ...prev, qualification: { ...prev.qualification, [key]: value } }))
      } else if (formType === "employee") {
        setEmployeeDetails((prev) => ({ ...prev, qualification: { ...prev.qualification, [key]: value } }))
      } else {
        console.log("change input error")
      }
    } catch (error) {
      console.log(error, "change input error")
    }
  }

  const handleDepartmentChange = (data: string, name: string) => {
    if (selectedDepartments.includes(name)) {
      const find = selectedDepartments.findIndex((item: any) => item == name)
      return selectedDepartments.splice(find, 1)
    }
    if (selectedDepartments.includes(data)) {
      const find = selectedDepartments.findIndex((item: any) => item == data)
      return dptDate.splice(find, 1)
    }
    const vls = [...dptDate, data]
    const values = [...selectedDepartments, name];
    setSelectedDepartments(values);
    setdptDate(vls)
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-[#EAEBE8] rounded-xl shadow-lg w-[65%] h-[90vh] overflow-y-scroll scrollbar-hide p-6 ">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl font-semibold text-center"
            style={{ ...FONTS.Main, color: COLORS.primary }}
          >
            Add Hr
          </h2>

          <div
            className=" h-8 w-8 flex justify-center items-center cursor-pointer text-white rounded-md"
            style={{ background: COLORS.primary }}
            onClick={onClose}
          >
            x
          </div>
        </div>

        <div className="h-[1px] w-full my-4 bg-[#7697A066]"></div>

        <form className="" onSubmit={(e) => handelsubmit(e)}>

          <section className="flex gap-4 items-center mb-4">
            <div className="bg-[#DDDED9] text-[#4A7079] h-[80px] w-[80px] rounded-xl flex justify-center items-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span style={{ ...FONTS.card_initial }}>K</span>
              )}
            </div>

            <div className="grid gap-1">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />

              {/* Label as Button */}
              <label
                htmlFor="imageUpload"
                style={{ ...FONTS.Nav, background: COLORS.primary }}
                className="uppercase text-[#FFFFFF] p-2 px-4 rounded-lg cursor-pointer"
              >
                Upload Image
              </label>
            </div>
          </section>


          <section>
            <p className="mb-3" style={{ ...FONTS.view_btn, color: COLORS.primary }}>Personal Informations</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  First Name
                </p>
                <input
                  type="text"
                  name="FirstName"
                  value={EmplopyEdit?.first_name || HrEdit?.first_name || undefined}
                  placeholder="Enter Your Name"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('first_name', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Last Name
                </p>
                <input
                  type="text"
                  name="LastName"
                  value={EmplopyEdit?.last_name || HrEdit?.last_name || undefined}
                  placeholder="Enter Your Name"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('last_name', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  EmployeeID
                </p>
                <input
                  type="text"
                  name="EmployeeID"
                  value={EmplopyEdit?.emp_id || HrEdit?.emp_id || undefined}
                  placeholder="Enter EmployeeID"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('emp_id', e)}
                />
              </div>


              {
                formType === "hr" &&
                <div className="w-full">
                  <p
                    style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                    className="pb-3"
                  >
                    Department
                  </p>

                  <div className="relative">
                    <div
                      onClick={() => setIsOpenDpt(!isOpenDpt)}
                      className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full flex justify-between items-center"                    >
                      <span className="font-medium">
                        {selectedDepartments.map((item) => `${item}`).join(', ')}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isOpenDpt ? "rotate-180" : ""
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

                    {isOpenDpt && (
                      <div className="absolute top-full h-[40vh] overflow-scroll scrollbar-hide left-0 right-0 mt-2 bg-gray-100 rounded-lg p-2 shadow-lg z-10">
                        {departmentData.map((option: any, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => handleDepartmentChange(option?._id, option?.dpt_name)}
                            className="w-full text-left px-4 py-3 mb-2 last:mb-0 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300 text-gray-700 transition-colors"
                          >
                            {option?.dpt_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              }

              {
                formType === "employee" &&
                <div className="w-full">
                  <p
                    style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                    className="pb-3"
                  >
                    Department
                  </p>

                  <div className="relative">
                    <div
                      onClick={() => setIsOpenDpt(!isOpenDpt)}
                      className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full flex justify-between items-center"                    >
                      <span className="font-medium">
                        {empDpt ? empDpt : "selecte Department"}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isOpenDpt ? "rotate-180" : ""
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

                    {isOpenDpt && (
                      <div className="absolute top-full h-[40vh] overflow-scroll scrollbar-hide left-0 right-0 mt-2 bg-gray-100 rounded-lg p-2 shadow-lg z-10">
                        {departmentData.map((option: any, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => {
                              setempDpt(option?.dpt_name)
                              setEmployeeDetails((prev) => ({ ...prev, department: option?._id }))
                              setIsOpenDpt(false)
                            }}
                            className="w-full text-left px-4 py-3 mb-2 last:mb-0 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300 text-gray-700 transition-colors"
                          >
                            {option?.dpt_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              }



              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Email
                </p>
                <input
                  type="text"
                  name="Email"
                  value={EmplopyEdit?.contact_info?.email || HrEdit?.contact_info?.email || undefined}
                  placeholder="Enter Email"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleContactInput('email', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Password
                </p>
                <input
                  type="text"
                  name="Password"
                  value={EmplopyEdit?.password || HrEdit?.password || undefined}
                  placeholder="Enter Password"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('password', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Role
                </p>
                <input
                  type="text"
                  name="Role"
                  placeholder="Enter Role"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('emp_role', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Contact
                </p>
                <input
                  type="text"
                  name="Contact"
                  value={EmplopyEdit?.contact_info?.phone || HrEdit?.contact_info?.phone || undefined}
                  placeholder="Enter Contact"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleContactInput('phone', e)}
                />
              </div>
            </div>

          </section>
          <div className="h-[1px] w-full my-6 bg-[#7697A066]"></div>


          <section>
            <p className="mb-3" style={{ ...FONTS.view_btn, color: COLORS.primary }}>Basic Info</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Join Date
                </p>
                <input
                  type="text"
                  name="JoinDate"
                  value={EmplopyEdit?.join_date}
                  placeholder="Date of Joining"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('join_date', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Experience
                </p>
                <input
                  type="text"
                  name="Experience"
                  placeholder="Total Experience"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('experience', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  CTC
                </p>
                <input
                  type="text"
                  name="CTC"
                  placeholder="Enter CTC"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('ctc', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  DOB
                </p>
                <input
                  type="text"
                  name="DOB"
                  placeholder="Enter DOB"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('dob', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Emergency COntact
                </p>
                <input
                  type="text"
                  name="Emergency COntact"
                  placeholder="Enter Emergency COntact"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('emg_contact', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Father's Name
                </p>
                <input
                  type="text"
                  name="Father's Name"
                  placeholder="Enter Father's Name"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleChangeInput('father_name', e)}
                />
              </div>


            </div>
            <div className="mt-4">
              <p
                style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                className="pb-1"
              >
                Address
              </p>
              <textarea
                name="Address"
                placeholder="Enter Address"
                className="border border-[#4A7079] h-20 rounded-md px-3 py-2 outline-0 w-full resize-none"
                required
                onChange={(e) => handleContactInput('address', e)}
              />
            </div>


          </section>


          <div className="h-[1px] w-full my-6 bg-[#7697A066]"></div>


          <section>
            <p className="mb-3" style={{ ...FONTS.view_btn, color: COLORS.primary }}>Qualification</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Degree
                </p>
                <input
                  type="text"
                  name="Degree"
                  placeholder="Enter Degree"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleQualificationInput("degree", e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Specialization
                </p>
                <input
                  type="text"
                  name="Specialization"
                  placeholder="Total Specialization"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleQualificationInput("specialization", e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Year Of Completion
                </p>
                <input
                  type="text"
                  name="Year Of Completion"
                  placeholder="Enter Year Of Completion"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleQualificationInput("year_of_completion", e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Percentage
                </p>
                <input
                  type="text"
                  name="Percentage"
                  placeholder="Enter Percentage"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                  onChange={(e) => handleQualificationInput("percentage", e)}
                />
              </div>

            </div>
          </section>

          <div className='  rounded-lg flex gap-3 justify-end items-center mt-4'>
            <button type="button" className='bg-[#4A70790D] border border-[#4A7079] px-6 py-1 rounded-md' onClick={onClose} style={{ ...FONTS.view_btn, color: COLORS.primary }}>Cancel</button>
            <button type="submit" className='bg-[#4A7079] border border-[#4A7079] text-[#FFFFFF] px-6 py-1 rounded-md' style={{ ...FONTS.view_btn }}>submit</button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Form;
