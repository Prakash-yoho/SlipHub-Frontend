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
import { CreateEmployeeThunks, UpdateEmployeeThunks } from "../../features/EmployeeProfile/redux/thunks"
import { GetFormDepartmentThunks } from "../../features/common/redux/thunks"
import toast from "react-hot-toast"
// import { FaFileUpload } from "react-icons/fa"

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
  // const [preview, setPreview] = useState<string | null>(null)

  const departmentData = useSelector((state: RootState) => state.common.department)
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [empDpt, setempDpt] = useState<string>("Select")
  const [dptDate, setdptDate] = useState<string[]>([])
  const [isOpenDpt, setIsOpenDpt] = useState(false)

  const [errors, setErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    dispatch(GetFormDepartmentThunks())
  }, [dispatch])

  const [HrDetails, setHrDetails] = useState<HrProfileType | any>({
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
    pf_acc: HrEdit?.pf_acc || "",
    level_grade: HrEdit?.level_grade || ""

  })

  const [EmployeeDetails, setEmployeeDetails] = useState<EmployeeProfile | any>({
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
    pf_acc: EmplopyEdit?.pf_acc || "",
    level_grade: EmplopyEdit?.level_grade || ""
  })

  useEffect(() => {
    setHrDetails(HrEdit)
  }, [HrEdit])

  useEffect(() => {
    setEmployeeDetails(EmplopyEdit)
  }, [EmplopyEdit])

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
  // const handleImageChange = (e: any) => {
  //   e.preventDefault()
  //   const file = e.target.files[0]
  //   if (file) {
  //     setPreview(URL.createObjectURL(file))
  //   }
  // }

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
          dispatch(UpdateEmployeeThunks(EmployeeDetails, EmplopyEdit?.uuid || ""))
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
        setHrDetails((prev: HrProfileType) => ({ ...prev, [key]: value }))
      } else if (formType === "employee") {
        setEmployeeDetails((prev: EmployeeProfile) => ({ ...prev, [key]: value }))
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
        setHrDetails((prev: HrProfileType) => ({ ...prev, qualification: { ...prev.qualification, [key]: value } }))
      } else if (formType === "employee") {
        setEmployeeDetails((prev: EmployeeProfile) => ({ ...prev, qualification: { ...prev.qualification, [key]: value } }))
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

  const departmentSelected = () => {

    const hrdpt: string[] | undefined = HrEdit?.department?.map((item) => `${item?.dpt_name}`)

    let dpt;

    if (selectedDepartments.length !== 0) {
      dpt = selectedDepartments.map((item) => {
        if (hrdpt?.includes(item)) {
          return hrdpt
        } else {
          hrdpt?.push(item)
          return hrdpt?.join(",")
        }
      })
    } else {
      dpt = hrdpt
    }

    return dpt
  }

 return (
  <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
    <div className="bg-[#EAEBE8] rounded-xl shadow-lg 
      w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] 
      h-[90vh] overflow-y-scroll scrollbar-hide p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg sm:text-xl font-semibold"
          style={{ ...FONTS.Main, color: COLORS.primary }}
        >
          {formType === "hr" ? `${HrEdit ? "Edit" : "Add"} Hr` : `${EmplopyEdit ? "Edit" : "Add"} Employee`}
        </h2>

        <div
          className="h-8 w-8 flex justify-center items-center cursor-pointer text-white rounded-md"
          style={{ background: COLORS.primary }}
          onClick={onClose}
        >
          x
        </div>
      </div>

      <div className="h-[1px] w-full my-4 bg-[#7697A066]"></div>

      <form className="w-full" onSubmit={(e) => handelsubmit(e)}>

        {/* ---------------- PERSONAL INFO ---------------- */}
        <section>
          <p className="mb-3 text-base sm:text-lg"
            style={{ ...FONTS.view_btn, color: COLORS.primary }}>
            Personal Informations
          </p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {/* FIRST NAME */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>First Name</p>
              <input
                type="text"
                value={EmployeeDetails?.first_name || HrDetails?.first_name || undefined}
                placeholder="Enter Your Name"
                className={`border ${errors.first_name ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("first_name", e)}
              />
              <ErrorMessage error={errors.first_name} />
            </div>

            {/* LAST NAME */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Last Name</p>
              <input
                type="text"
                value={EmployeeDetails?.last_name || HrDetails?.last_name || undefined}
                placeholder="Enter Your Name"
                className={`border ${errors.last_name ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("last_name", e)}
              />
              <ErrorMessage error={errors.last_name} />
            </div>

            {/* EMPLOYEE ID */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>EmployeeID</p>
              <input
                type="text"
                value={EmployeeDetails?.emp_id || HrDetails?.emp_id || undefined}
                placeholder="Enter EmployeeID"
                className={`border ${errors.emp_id ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("emp_id", e)}
              />
              <ErrorMessage error={errors.emp_id} />
            </div>

            {/* HR DEPARTMENT (Multi-select) */}
            {formType === "hr" && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Department</p>

                <div className="relative">
                  <div
                    onClick={() => setIsOpenDpt(!isOpenDpt)}
                    className={`border ${errors.department ? "border-red-500" : "border-[#4A7079]"}
                     rounded-md px-3 py-2 w-full flex justify-between items-center cursor-pointer`}
                  >
                    <span>{departmentSelected()}</span>

                    <svg className={`w-4 h-4 transition-transform ${isOpenDpt ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isOpenDpt && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-100 
                      rounded-lg p-2 shadow-lg z-10 max-h-[40vh] overflow-scroll scrollbar-hide">
                      {departmentData.map((option: any) => (
                        <button
                          type="button"
                          key={option._id}
                          onClick={() => {
                            handleDepartmentChange(option?._id, option?.dpt_name);
                            setIsOpenDpt(false);
                          }}
                          className="w-full text-left px-4 py-3 mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                          {option.dpt_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <ErrorMessage error={errors.department} />
              </div>
            )}

            {/* EMPLOYEE DEPARTMENT (Single-select) */}
            {formType === "employee" && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Department</p>

                <div className="relative">
                  <div
                    onClick={() => setIsOpenDpt(!isOpenDpt)}
                    className={`border ${errors.department ? "border-red-500" : "border-[#4A7079]"}
                     rounded-md px-3 py-2 w-full flex justify-between items-center cursor-pointer`}
                  >
                    <span>{empDpt || "Select Department"}</span>

                    <svg className={`w-4 h-4 transition-transform ${isOpenDpt ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isOpenDpt && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-100 
                      rounded-lg p-2 shadow-lg z-10 max-h-[40vh] overflow-scroll scrollbar-hide">
                      {departmentData.map((option: any) => (
                        <button
                          type="button"
                          key={option._id}
                          onClick={() => {
                            setempDpt(option.dpt_name);
                            setEmployeeDetails((prev: any) => ({ ...prev, department: option?._id }));
                            setIsOpenDpt(false);
                            clearFieldError("department");
                          }}
                          className="w-full text-left px-4 py-3 mb-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                        >
                          {option.dpt_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <ErrorMessage error={errors.department} />
              </div>
            )}

            {/* EMAIL */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Email</p>
              <input
                type="text"
                value={EmployeeDetails?.contact_info?.email || HrDetails?.contact_info?.email || undefined}
                placeholder="Enter Email"
                className={`border ${errors.email ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleContactInput("email", e)}
              />
              <ErrorMessage error={errors.email} />
            </div>

            {/* PASSWORD – ONLY ON CREATE */}
            {(!HrEdit && !EmplopyEdit) && (
              <div>
                <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Password</p>
                <input
                  type="text"
                  placeholder="Enter Password"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  onChange={(e) => handleChangeInput("password", e)}
                />
              </div>
            )}

            {/* ROLE */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Role</p>
              <input
                type="text"
                value={EmployeeDetails?.emp_role || (HrEdit ? "HR" : undefined) || undefined}
                placeholder="Enter Role"
                className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                onChange={(e) => handleChangeInput("emp_role", e)}
              />
            </div>

            {/* CONTACT */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Contact</p>
              <input
                type="text"
                value={EmployeeDetails?.contact_info?.phone || HrDetails?.contact_info?.phone || undefined}
                placeholder="Enter Contact"
                className={`border ${errors.phone ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleContactInput("phone", e)}
              />
              <ErrorMessage error={errors.phone} />
            </div>

          </div>
        </section>

        {/* ---------------- BASIC INFO (RESPONSIVE) ---------------- */}
        <div className="h-[1px] w-full my-6 bg-[#7697A066]"></div>

        <section>
          <p className="mb-3 text-base sm:text-lg"
            style={{ ...FONTS.view_btn, color: COLORS.primary }}>
            Basic Info
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {/* JOIN DATE */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Join Date</p>
              <input
                type="date"
                value={
                  EmployeeDetails?.join_date
                    ? new Date(EmployeeDetails.join_date).toISOString().split('T')[0]
                    : HrDetails?.join_date
                      ? new Date(HrDetails.join_date).toISOString().split('T')[0]
                      : ''
                }
                className={`border ${errors.join_date ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                style={{ color: COLORS.primary }}
                onChange={(e) => handleChangeInput("join_date", e)}
              />
              <ErrorMessage error={errors.join_date} />
            </div>

            {/* EXPERIENCE */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Experience</p>
              <input
                type="text"
                value={EmployeeDetails?.experience || HrDetails?.experience || undefined}
                placeholder="Total Experience"
                className={`border ${errors.experience ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("experience", e)}
              />
              <ErrorMessage error={errors.experience} />
            </div>

            {/* CTC */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>CTC (Monthly)</p>
              <input
                type="text"
                value={EmployeeDetails?.ctc || HrDetails?.ctc || undefined}
                placeholder="Enter CTC"
                className={`border ${errors.ctc ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("ctc", e)}
              />
              <ErrorMessage error={errors.ctc} />
            </div>

            {/* UAN */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>UAN No</p>
              <input
                type="text"
                value={EmployeeDetails?.pf_acc || HrDetails?.pf_acc || undefined}
                placeholder="Enter UAN No"
                className={`border ${errors.pf_acc ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("pf_acc", e)}
              />
              <ErrorMessage error={errors.pf_acc} />
            </div>

            {/* LEVEL / GRADE */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Level / Grade</p>
              <input
                type="text"
                value={EmployeeDetails?.level_grade || HrDetails?.level_grade || undefined}
                placeholder="Enter Level/Grade"
                className={`border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("level_grade", e)}
              />
            </div>

            {/* DOB */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>DOB</p>
              <input
                type="date"
                value={
                  EmployeeDetails?.dob
                    ? new Date(EmployeeDetails.dob).toISOString().split('T')[0]
                    : HrDetails?.dob
                      ? new Date(HrDetails.dob).toISOString().split('T')[0]
                      : ''
                }
                className={`border ${errors.dob ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                style={{ color: COLORS.primary }}
                onChange={(e) => handleChangeInput("dob", e)}
              />
              <ErrorMessage error={errors.dob} />
            </div>

            {/* EMERGENCY CONTACT */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Emergency Contact</p>
              <input
                type="text"
                value={EmployeeDetails?.emg_contact || HrDetails?.emg_contact || undefined}
                placeholder="Enter Emergency Contact"
                className={`border ${errors.emg_contact ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("emg_contact", e)}
              />
              <ErrorMessage error={errors.emg_contact} />
            </div>

            {/* FATHER'S NAME */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Father's Name</p>
              <input
                type="text"
                value={EmployeeDetails?.father_name || HrDetails?.father_name || undefined}
                placeholder="Enter Father's Name"
                className={`border ${errors.father_name ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleChangeInput("father_name", e)}
              />
              <ErrorMessage error={errors.father_name} />
            </div>

          </div>

          {/* ADDRESS */}
          <div className="mt-4">
            <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Address</p>
            <textarea
              value={EmployeeDetails?.contact_info?.address || HrDetails?.contact_info?.address || undefined}
              placeholder="Enter Address"
              className={`border ${errors.address ? "border-red-500" : "border-[#4A7079]"}
               h-20 rounded-md px-3 py-2 outline-0 w-full resize-none`}
              onChange={(e) => handleContactInput("address", e)}
            />
            <ErrorMessage error={errors.address} />
          </div>

        </section>

        {/* ---------------- QUALIFICATION ---------------- */}
        <div className="h-[1px] w-full my-6 bg-[#7697A066]"></div>

        <section>
          <p className="mb-3 text-base sm:text-lg"
            style={{ ...FONTS.view_btn, color: COLORS.primary }}>
            Qualification
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            {/* DEGREE */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Degree</p>
              <input
                type="text"
                value={EmployeeDetails?.qualification?.degree || HrDetails?.qualification?.degree || undefined}
                placeholder="Enter Degree"
                className={`border ${errors.degree ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleQualificationInput("degree", e)}
              />
              <ErrorMessage error={errors.degree} />
            </div>

            {/* SPECIALIZATION */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Specialization</p>
              <input
                type="text"
                value={EmployeeDetails?.qualification?.specialization || HrDetails?.qualification?.specialization || undefined}
                placeholder="Enter Specialization"
                className={`border ${errors.specialization ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleQualificationInput("specialization", e)}
              />
              <ErrorMessage error={errors.specialization} />
            </div>

            {/* YEAR OF COMPLETION */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Year Of Completion</p>
              <input
                type="text"
                value={EmployeeDetails?.qualification?.year_of_completion || HrDetails?.qualification?.year_of_completion || ''}
                placeholder="Enter Year Of Completion"
                className={`border ${errors.year_of_completion ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleQualificationInput("year_of_completion", e)}
              />
              <ErrorMessage error={errors.year_of_completion} />
            </div>

            {/* PERCENTAGE */}
            <div>
              <p style={{ ...FONTS.payroll_head, color: COLORS.primary }}>Percentage</p>
              <input
                type="text"
                value={EmployeeDetails?.qualification?.percentage || HrDetails?.qualification?.percentage || undefined}
                placeholder="Enter Percentage"
                className={`border ${errors.percentage ? "border-red-500" : "border-[#4A7079]"}
                 rounded-md px-3 py-2 outline-0 w-full`}
                onChange={(e) => handleQualificationInput("percentage", e)}
              />
              <ErrorMessage error={errors.percentage} />
            </div>

          </div>
        </section>

        {/* ---------------- BUTTONS ---------------- */}
        <div className="flex flex-wrap justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-[#4A70790D] border border-[#4A7079] px-6 py-1 rounded-md"
            onClick={onClose}
            style={{ ...FONTS.view_btn, color: COLORS.primary }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#4A7079] border border-[#4A7079] text-white px-6 py-1 rounded-md"
            style={{ ...FONTS.view_btn }}
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  </div>
);

}

export default Form
