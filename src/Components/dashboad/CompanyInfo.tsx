import React from 'react'
import yoho from '../../assets/Navbar/yohologo.png'
import { COLORS, FONTS } from '../../constants/uiconstants'

const CompanyInfo: React.FC = () => {
    return (
        <div className='w-full h-full p-4 flex flex-row gap-10 items-center bg-[#cdcec9ee] rounded-xl' >
            <img src={yoho} alt="" className='w-40 h-20 object-cover p-2' />
            <div className="flex flex-col w-full gap-10">
                <div className="flex flex-row justify-between">
                    <div className="w-96">
                        <h1 style={{ ...FONTS.table_head }}>Organsation Name:</h1>
                        <h1 style={{ ...FONTS.table_data }}>Yoho Technologies pvt ltd</h1>
                    </div>
                    <div className="w-96">
                        <h1 style={{ ...FONTS.table_head }}>Organsation Mail:</h1>
                        <h1 style={{ ...FONTS.table_data }}>hr@yohotechnologies.com</h1>
                    </div>
                    <div className="w-96">
                        <h1 style={{ ...FONTS.table_head }}>Organsation Phone:</h1>
                        <h1 style={{ ...FONTS.table_data }}>+91 12345 67890</h1>
                    </div>
                </div>

                <div className="flex flex-row justify-between w-full">
                    <div className="">
                        <h1 style={{ ...FONTS.table_head }}>Organsation Address:</h1>
                        <h1 style={{ ...FONTS.table_data }}>SF1, Second Floor, Plot. No. 29, Sri Ambal Nagar Main Road, Keelkattalai, Chennai - 600117.</h1>
                    </div>

                    <div className="w-96">
                        <h1 style={{ ...FONTS.table_head }}>website:</h1>
                        <h1 style={{ ...FONTS.table_data }}>https://yohotechnologies.com</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfo