"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { COLORS, FONTS } from "../../constants/uiconstants"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import { CreateHrThunks, UpdateHrThunks } from "../../features/HrProfile/redux/thunks"
import type { HrProfileType } from "../../Type/HrProfiles/Type"
import type { EmployeeProfile } from "../../Type/Emp_profile/Type"
import { CreateEmployeeThunks } from "../../features/EmployeeProfile/redux/thunks"
import { GetFormDepartmentThunks } from "../../features/common/redux/thunks"
import toast from "react-hot-toast"

interface FormProps {
  isOpen: boolean
  onClose: () => void
  EmplopyEdit?: EmployeeProfile | null
  HrEdit?: HrProfileType | null
  formType: "hr" | "employee"
}

interface ValidationErrors {
  [key: string]: string
}

const Form: React.FC<FormProps> = ({ isOpen, onClose, EmplopyEdit, HrEdit, formType }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [preview, setPreview] = useState<string | null>(null)

  const departmentData = useSelector((state: RootState) => state.common.department)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [empDpt, setempDpt] = useState<string>("Select")
  const [dptDate, setdptDate] = useState<string[]>([])
  const [isOpenDpt, setIsOpenDpt] = useState(false)

  const [errors, setErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    dispatch(GetFormDepartmentThunks())
  }, [dispatch])

  const [HrDetails, setHrDetails] = useState<HrProfileType>({
    emp_id: HrEdit?.emp_id || "",
    first_name: HrEdit?.first_name || "",
    last_name: HrEdit?.last_name || "",
    department: HrEdit?.department || [],
    contact_info: {
      email: HrEdit?.contact_info?.email || "",
      phone: HrEdit?.contact_info?.phone || "",
      address: HrEdit?.contact_info?.address || "",
    },
    join_date: HrEdit?.join_date || "",
    experience: HrEdit?.experience || "",
    ctc: HrEdit?.ctc || 0,
    dob: HrEdit?.dob || "",
    emg_contact: HrEdit?.emg_contact || "",
    father_name: HrEdit?.father_name || "",
    qualification: {
      degree: HrEdit?.qualification?.degree || "",
      specialization: HrEdit?.qualification?.specialization || "",
      year_of_completion: HrEdit?.qualification?.year_of_completion || "",
      percentage: HrEdit?.qualification?.percentage || "",
    },
    image: HrEdit?.image || "",
  })
  const [EmployeeDetails, setEmployeeDetails] = useState<EmployeeProfile>({
    emp_id: EmplopyEdit?.emp_id || "",
    first_name: EmplopyEdit?.first_name || "",
    last_name: EmplopyEdit?.last_name || "",
    department: EmplopyEdit?.department || "",
    contact_info: {
      email: EmplopyEdit?.contact_info?.email || "",
      phone: EmplopyEdit?.contact_info?.phone || "",
      address: EmplopyEdit?.contact_info?.address || "",
    },
    join_date: EmplopyEdit?.join_date || "",
    experience: EmplopyEdit?.experience || "",
    ctc: EmplopyEdit?.ctc || 0,
    dob: EmplopyEdit?.dob || "",
    emg_contact: EmplopyEdit?.emg_contact || "",
    father_name: EmplopyEdit?.father_name || "",
    qualification: {
      degree: EmplopyEdit?.qualification?.degree || "",
      specialization: EmplopyEdit?.qualification?.specialization || "",
      year_of_completion: EmplopyEdit?.qualification?.year_of_completion || "",
      percentage: EmplopyEdit?.qualification?.percentage || "",
    },
    image: EmplopyEdit?.image || "",
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone.replace(/\D/g, ""))
  }

  const validateRequired = (value: string | number | undefined): boolean => {
    return value !== undefined && value !== null && String(value).trim() !== ""
  }

  const validatePercentage = (percentage: string): boolean => {
    const num = Number.parseFloat(percentage)
    return !isNaN(num) && num >= 0 && num <= 100
  }

  const validateYear = (year: string): boolean => {
    const currentYear = new Date().getFullYear()
    const yearNum = Number.parseInt(year)
    return !isNaN(yearNum) && yearNum >= 1950 && yearNum <= currentYear
  }

  const validateCTC = (ctc: string | number): boolean => {
    const num = Number.parseFloat(String(ctc))
    return !isNaN(num) && num >= 0
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    const currentData = formType === "hr" ? HrDetails : EmployeeDetails

    // Personal Information Validations
    if (!validateRequired(currentData.first_name)) {
      newErrors.first_name = "First name is required"
    }

    if (!validateRequired(currentData.last_name)) {
      newErrors.last_name = "Last name is required"
    }

    if (!validateRequired(currentData.emp_id)) {
      newErrors.emp_id = "Employee ID is required"
    }

    if (!validateRequired(currentData.contact_info?.email)) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(currentData.contact_info?.email ?? "")) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!validateRequired(currentData.contact_info?.phone)) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(currentData.contact_info?.phone ?? "")) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!validateRequired(currentData.contact_info?.address)) {
      newErrors.address = "Address is required"
    }

    // Department validation
    if (formType === "hr") {
      if (dptDate.length === 0) {
        newErrors.department = "At least one department must be selected"
      }
    } else {
      if (!validateRequired(currentData.department)) {
        newErrors.department = "Department is required"
      }
    }

    // Basic Info Validations
    if (!validateRequired(currentData.join_date)) {
      newErrors.join_date = "Join date is required"
    }

    if (!validateRequired(currentData.experience)) {
      newErrors.experience = "Experience is required"
    }

    if (!validateRequired(String(currentData.ctc))) {
      newErrors.ctc = "CTC is required"
    } else if (!validateCTC(currentData.ctc ?? "")) {
      newErrors.ctc = "Please enter a valid CTC amount"
    }

    if (!validateRequired(currentData.dob)) {
      newErrors.dob = "Date of birth is required"
    }

    if (!validateRequired(currentData.emg_contact)) {
      newErrors.emg_contact = "Emergency contact is required"
    } else if (!validatePhone(currentData.emg_contact ?? "")) {
      newErrors.emg_contact = "Please enter a valid 10-digit emergency contact"
    }

    if (!validateRequired(currentData.father_name)) {
      newErrors.father_name = "Father's name is required"
    }

    // Qualification Validations
    if (!currentData.qualification || !validateRequired(currentData.qualification.degree)) {
      newErrors.degree = "Degree is required"
    }

    if (!currentData.qualification || !validateRequired(currentData.qualification.specialization)) {
      newErrors.specialization = "Specialization is required"
    }

    if (!currentData.qualification || !validateRequired(currentData.qualification.year_of_completion)) {
      newErrors.year_of_completion = "Year of completion is required"
    } else if (!currentData.qualification || !validateYear(currentData.qualification.year_of_completion ?? "")) {
      newErrors.year_of_completion = "Please enter a valid year"
    }

    if (!currentData.qualification || !validateRequired(currentData.qualification.percentage)) {
      newErrors.percentage = "Percentage is required"
    } else if (!currentData.qualification || !validatePercentage(currentData.qualification.percentage ?? "")) {
      newErrors.percentage = "Please enter a valid percentage (0-100)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  if (!isOpen) return null
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

      if (!validateForm()) {
        toast.error("Please fix all validation errors before submitting")
        return
      }

      if (formType === "hr") {
        HrDetails.department = dptDate
        if (HrEdit) {
          dispatch(UpdateHrThunks(HrDetails, HrDetails?.uuid || ""))
        } else {
          dispatch(CreateHrThunks(HrDetails))
        }
        setSelectedDepartments([])
        onClose()
      } else if (formType === "employee") {
        if (EmplopyEdit) {
          console.log("under developement")
        } else {
          dispatch(CreateEmployeeThunks(EmployeeDetails))
          onClose()
        }
      } else {
        console.log("mention form type")
      }
    } catch (error) {
      console.log(error, "error on hr added")
      toast.error("Error")
    }
  }

  const handleChangeInput = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault()
      const value = e.target.value

      clearFieldError(key)

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

      clearFieldError(key)

      if (formType === "hr") {
        setHrDetails((prev: HrProfileType) => ({ ...prev, contact_info: { ...prev?.contact_info, [key]: value } }))
      } else if (formType === "employee") {
        setEmployeeDetails((prev: EmployeeProfile) => ({
          ...prev,
          contact_info: { ...prev?.contact_info, [key]: value },
        }))
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

      clearFieldError(key)

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
    clearFieldError("department")

    if (selectedDepartments.includes(name)) {
      const find = selectedDepartments.findIndex((item: any) => item == name)
      return selectedDepartments.splice(find, 1)
    }
    if (selectedDepartments.includes(data)) {
      const find = selectedDepartments.findIndex((item: any) => item == data)
      return dptDate.splice(find, 1)
    }
    const vls = [...dptDate, data]
    const values = [...selectedDepartments, name]
    setSelectedDepartments(values)
    setdptDate(vls)
    setIsOpenDpt(false)
  }

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null
    return (
      <p className="text-red-500 text-sm mt-1" style={{ ...FONTS.Nav }}>
        {error}
      </p>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-[#EAEBE8] rounded-xl shadow-lg w-[65%] h-[90vh] overflow-y-scroll scrollbar-hide p-6 ">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-center" style={{ ...FONTS.Main, color: COLORS.primary }}>
            {formType === "hr" ? "Add Hr" : "Add Employee"}
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
                <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
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
            <p className="mb-3" style={{ ...FONTS.view_btn, color: COLORS.primary }}>
              Personal Informations
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  First Name
                </p>
                <input
                  type="text"
                  name="FirstName"
                  value={EmplopyEdit?.first_name || HrEdit?.first_name || undefined}
                  placeholder="Enter Your Name"
                  className={`border ${errors.first_name ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleChangeInput("first_name", e)}
                />
                <ErrorMessage error={errors.first_name} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Last Name
                </p>
                <input
                  type="text"
                  name="LastName"
                  value={EmplopyEdit?.last_name || HrEdit?.last_name || undefined}
                  placeholder="Enter Your Name"
                  className={`border ${errors.last_name ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleChangeInput("last_name", e)}
                />
                <ErrorMessage error={errors.last_name} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  EmployeeID
                </p>
                <input
                  type="text"
                  name="EmployeeID"
                  value={EmplopyEdit?.emp_id || HrEdit?.emp_id || undefined}
                  placeholder="Enter EmployeeID"
                  className={`border ${errors.emp_id ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleChangeInput("emp_id", e)}
                />
                <ErrorMessage error={errors.emp_id} />
              </div>

              {formType === "hr" && (
                <div className="w-full">
                  <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                    Department
                  </p>

                  <div className="relative">
                    <div
                      onClick={() => setIsOpenDpt(!isOpenDpt)}
                      className={`border ${errors.department ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full flex justify-between items-center`}
                    >
                      <span className="font-medium">{selectedDepartments.map((item) => `${item}`).join(", ")}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isOpenDpt ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {isOpenDpt && (
                      <div className="absolute top-full h-[40vh] overflow-scroll scrollbar-hide left-0 right-0 mt-2 bg-gray-100 rounded-lg p-2 shadow-lg z-10">
                        {departmentData.map((option: any, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => {
                              handleDepartmentChange(option?._id, option?.dpt_name)
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
                  <ErrorMessage error={errors.department} />
                </div>
              )}

              {formType === "employee" && (
                <div className="w-full">
                  <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                    Department
                  </p>

                  <div className="relative">
                    <div
                      onClick={() => setIsOpenDpt(!isOpenDpt)}
                      className={`border ${errors.department ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full flex justify-between items-center`}
                    >
                      <span className="font-medium">{empDpt ? empDpt : "select Department"}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isOpenDpt ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                              clearFieldError("department")
                            }}
                            className="w-full text-left px-4 py-3 mb-2 last:mb-0 bg-gray-200 hover:bg-gray-300 rounded-lg border border-gray-300 text-gray-700 transition-colors"
                          >
                            {option?.dpt_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <ErrorMessage error={errors.department} />
                </div>
              )}

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Email
                </p>
                <input
                  type="text"
                  name="Email"
                  value={EmplopyEdit?.contact_info?.email || HrEdit?.contact_info?.email || undefined}
                  placeholder="Enter Email"
                  className={`border ${errors.email ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleContactInput("email", e)}
                />
                <ErrorMessage error={errors.email} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Password
                </p>
                <input
                  type="text"
                  name="Password"
                  value={EmplopyEdit?.password || HrEdit?.password || undefined}
                  placeholder="Enter Password"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  // required
                  onChange={(e) => handleChangeInput("password", e)}
                />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Role
                </p>
                <input
                  type="text"
                  name="Role"
                  placeholder="Enter Role"
                  value={EmplopyEdit?.emp_role || (HrEdit ? "HR" : undefined) || undefined}
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  // required
                  onChange={(e) => handleChangeInput("emp_role", e)}
                />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Contact
                </p>
                <input
                  type="text"
                  name="Contact"
                  value={EmplopyEdit?.contact_info?.phone || HrEdit?.contact_info?.phone || undefined}
                  placeholder="Enter Contact"
                  className={`border ${errors.phone ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleContactInput("phone", e)}
                />
                <ErrorMessage error={errors.phone} />
              </div>
            </div>
          </section>
          <div className="h-[1px] w-full my-6 bg-[#7697A066]"></div>

          <section>
            <p className="mb-3" style={{ ...FONTS.view_btn, color: COLORS.primary }}>
              Basic Info
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Join Date
                </p>
                <input
                  type="date"
                  name="JoinDate"
                  value={EmplopyEdit?.join_date || HrEdit?.join_date || undefined}
                  placeholder="Date of Joining"
                  className={`border ${errors.join_date ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  style={{ color: COLORS.primary }}
                  onChange={(e) => handleChangeInput("join_date", e)}
                />
                <ErrorMessage error={errors.join_date} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Experience
                </p>
                <input
                  type="text"
                  name="Experience"
                  placeholder="Total Experience"
                  value={EmplopyEdit?.experience || HrEdit?.experience || undefined}
                  className={`border ${errors.experience ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleChangeInput("experience", e)}
                />
                <ErrorMessage error={errors.experience} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  CTC(Monthly)
                </p>
                <input
                  type="text"
                  name="CTC"
                  placeholder="Enter CTC"
                  value={EmplopyEdit?.ctc || HrEdit?.ctc || undefined}
                  className={`border ${errors.ctc ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleChangeInput("ctc", e)}
                />
                <ErrorMessage error={errors.ctc} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  DOB
                </p>
                <input
                  type="date"
                  name="DOB"
                  placeholder="Enter DOB"
                  value={EmplopyEdit?.dob || HrEdit?.dob || undefined}
                  className={`border ${errors.dob ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  style={{ color: COLORS.primary }}
                  onChange={(e) => handleChangeInput("dob", e)}
                />
                <ErrorMessage error={errors.dob} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Emergency Contact
                </p>
                <input
                  type="text"
                  name="Emergency Contact"
                  placeholder="Enter Emergency Contact"
                  value={EmplopyEdit?.emg_contact || HrEdit?.emg_contact || undefined}
                  className={`border ${errors.emg_contact ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleChangeInput("emg_contact", e)}
                />
                <ErrorMessage error={errors.emg_contact} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Father's Name
                </p>
                <input
                  type="text"
                  name="Father's Name"
                  placeholder="Enter Father's Name"
                  value={EmplopyEdit?.father_name || HrEdit?.father_name || undefined}
                  className={`border ${errors.father_name ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleChangeInput("father_name", e)}
                />
                <ErrorMessage error={errors.father_name} />
              </div>
            </div>
            <div className="mt-4">
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                Address
              </p>
              <textarea
                name="Address"
                placeholder="Enter Address"
                value={EmplopyEdit?.contact_info?.address || HrEdit?.contact_info?.address || undefined}
                className={`border ${errors.address ? "border-red-500" : "border-[#4A7079]"} h-20 rounded-md px-3 py-2 outline-0 w-full resize-none`}
                // required
                onChange={(e) => handleContactInput("address", e)}
              />
              <ErrorMessage error={errors.address} />
            </div>
          </section>

          <div className="h-[1px] w-full my-6 bg-[#7697A066]"></div>

          <section>
            <p className="mb-3" style={{ ...FONTS.view_btn, color: COLORS.primary }}>
              Qualification
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Degree
                </p>
                <input
                  type="text"
                  name="Degree"
                  placeholder="Enter Degree"
                  value={EmplopyEdit?.qualification?.degree || HrEdit?.qualification?.degree || undefined}
                  className={`border ${errors.degree ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleQualificationInput("degree", e)}
                />
                <ErrorMessage error={errors.degree} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Specialization
                </p>
                <input
                  type="text"
                  name="Specialization"
                  placeholder="Total Specialization"
                  value={
                    EmplopyEdit?.qualification?.specialization || HrDetails?.qualification?.specialization || undefined
                  }
                  className={`border ${errors.specialization ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleQualificationInput("specialization", e)}
                />
                <ErrorMessage error={errors.specialization} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Year Of Completion
                </p>
                <input
                  type="text"
                  name="Year Of Completion"
                  placeholder="Enter Year Of Completion"
                  value={
                    EmplopyEdit?.qualification?.year_of_completion ||
                    HrEdit?.qualification?.year_of_completion ||
                    undefined
                  }
                  className={`border ${errors.year_of_completion ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleQualificationInput("year_of_completion", e)}
                />
                <ErrorMessage error={errors.year_of_completion} />
              </div>

              <div className="">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }} className="pb-1">
                  Percentage
                </p>
                <input
                  type="text"
                  name="Percentage"
                  placeholder="Enter Percentage"
                  value={EmplopyEdit?.qualification?.percentage || HrEdit?.qualification?.percentage || undefined}
                  className={`border ${errors.percentage ? "border-red-500" : "border-[#4A7079]"} rounded-md px-3 py-2 outline-0 w-full`}
                  // required
                  onChange={(e) => handleQualificationInput("percentage", e)}
                />
                <ErrorMessage error={errors.percentage} />
              </div>
            </div>
          </section>

          <div className="  rounded-lg flex gap-3 justify-end items-center mt-4">
            <button
              type="button"
              className="bg-[#4A70790D] border border-[#4A7079] px-6 py-1 rounded-md cursor-pointer"
              onClick={onClose}
              style={{ ...FONTS.view_btn, color: COLORS.primary }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4A7079] border border-[#4A7079] text-[#FFFFFF] px-6 py-1 rounded-md cursor-pointer"
              style={{ ...FONTS.view_btn }}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
