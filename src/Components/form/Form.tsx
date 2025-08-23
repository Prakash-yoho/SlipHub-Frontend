import React, { useState } from "react";
import { COLORS, FONTS } from "../../constants/uiconstants";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ isOpen, onClose }) => {

  const [preview, setPreview] = useState<string | null>(null)
  if (!isOpen) return null;
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
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

        <form className="">

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
                  placeholder="Enter Your Name"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
                  placeholder="Enter Your Name"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
                  placeholder="Enter EmployeeID"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
                  placeholder="Enter Email"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
                  placeholder="Enter Password"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
                  placeholder="Enter Contact"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
                  placeholder="Date of Joining"
                  className="border border-[#4A7079] rounded-md px-3 py-2 outline-0 w-full"
                  required
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
                />
              </div>

            </div>
          </section>

          <div className='  rounded-lg flex gap-3 justify-end items-center mt-4'>
            <button className='bg-[#4A70790D] border border-[#4A7079] px-6 py-1 rounded-md' style={{ ...FONTS.view_btn, color: COLORS.primary }}>Cancel</button>
            <button className='bg-[#4A7079] border border-[#4A7079] text-[#FFFFFF] px-6 py-1 rounded-md' style={{ ...FONTS.view_btn }}>Delete</button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Form;
