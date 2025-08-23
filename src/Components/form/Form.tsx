import React from "react";
import { COLORS, FONTS } from "../../constants/uiconstants";

const Form = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // don’t render if modal is closed

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add HR</h2>
        
        {/* Example form fields */}
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
                        onClick={onClose}
                      >
                        x
                      </div>
                    </div>
        
                    <div className="h-[1px] w-full bg-[#7697A066]"></div>
        
                    <form  className="grid gap-30">
                      
                    </form>
                  </div>
        
      </div>
    </div>
  );
};

export default Form;
