import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { COLORS, FONTS } from "../../constants/uiconstants";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { CreateHrThunks } from "../../features/HrProfile/redux/thunks";
import type { HrProfileType } from "../../Type/HrProfiles/Type";
import type { EmployeeProfile } from "../../Type/Emp_profile/Type";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
  EmplopyEdit?: EmployeeProfile,
  HrEdit?: HrProfileType
}

const Form: React.FC<FormProps> = ({ isOpen, onClose, EmplopyEdit, HrEdit }) => {

  const [preview, setPreview] = useState<string | null>(null)
  const formType = "hr"
  const [HrDetails, setHrDetails] = useState<HrProfileType>({
    id: 0,
    auth_id: "",
    uuid: "",
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
    id: 0,
    auth_id: "",
    uuid: "",
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
  const dispatch = useDispatch<AppDispatch>()

  if (!isOpen) return null;
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handelsubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (formType === 'hr') {
        dispatch(CreateHrThunks(HrDetails))
      } else if (formType === 'employee') {
        // dispatch()
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
        setHrDetails((prev) => ({ ...prev, contact_info: { ...prev?.contact_info, [key]: value } }))
      } else if (formType === "employee") {
        setEmployeeDetails((prev) => ({ ...prev, contact_info: { ...prev?.contact_info, [key]: value } }))
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
                onChange={handleImageChange}
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


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  Department
                </p>
                <input
                  type="text"
                  name="Department"
                  placeholder="Enter Department"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
                // onChange={(e) => handleChangeInput('department', e)}
                />
              </div>


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
                  onChange={(e) => handleChangeInput('passward', e)}
                />
              </div>


              <div className="">
                <p
                  style={{ ...FONTS.payroll_head, color: COLORS.primary }}
                  className="pb-1"
                >
                  BloodGroup
                </p>
                <input
                  type="text"
                  name="BloodGroup"
                  placeholder="Enter BloodGroup"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
