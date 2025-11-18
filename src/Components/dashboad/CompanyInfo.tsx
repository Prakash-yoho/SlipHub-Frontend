/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import yoho from '../../assets/Navbar/yohologo.png'
import { FONTS } from '../../constants/uiconstants'
import { MobileResponsive } from '../../hooks/MobileResponsive'

interface props {
    company_details?: any
}

const CompanyInfo: React.FC<props> = ({ company_details }) => {

    const { MobileView } = MobileResponsive()

    return (
        <div className="w-full p-4 flex flex-col items-center gap-5">

            {MobileView ? (
                <>
                    {/* MOBILE VIEW */}
                    <div className="flex flex-col w-full gap-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">

                            <div className="w-32 mx-auto sm:mx-0 p-2 flex items-center justify-center">
                                <img src={yoho} alt="" className="object-cover w-full" />
                            </div>

                            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                                p-4 flex flex-col gap-5 rounded-xl">
                                <h1 style={{ ...FONTS.table_head }}
                                    className="text-[#4A7079] !text-[12px] !font-bold">
                                    Organsation Name:
                                </h1>
                                <h1 style={{ ...FONTS.table_data }}
                                    className="text-[#4A7079] !text-[10px] !font-medium break-words">
                                    {company_details?.company_name}
                                </h1>
                            </div>

                            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                                p-4 flex flex-col gap-5 rounded-xl">
                                <h1 style={{ ...FONTS.table_head }}
                                    className="text-[#4A7079] !text-[12px] !font-bold">
                                    Organsation Mail:
                                </h1>
                                <h1 style={{ ...FONTS.table_data }}
                                    className="text-[#4A7079] !text-[10px] !font-medium break-words">
                                    {company_details?.contact_info?.email}
                                </h1>
                            </div>

                            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                                p-4 flex flex-col gap-5 rounded-xl">
                                <h1 style={{ ...FONTS.table_head }}
                                    className="text-[#4A7079] !text-[12px] !font-bold">
                                    Organsation Phone:
                                </h1>
                                <h1 style={{ ...FONTS.table_data }}
                                    className="text-[#4A7079] !text-[10px] !font-medium break-words">
                                    {company_details?.contact_info?.phone}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                        p-4 flex flex-col gap-5 rounded-xl">
                        <h1 style={{ ...FONTS.table_head }}
                            className="text-[#4A7079] !text-[12px] !font-bold">
                            Organsation Address:
                        </h1>
                        <h1 style={{ ...FONTS.table_data }}
                            className="text-[#4A7079] !text-[10px] !font-medium break-words">
                            {company_details?.contact_info?.address}
                        </h1>
                    </div>
                </>

            ) : (
                <>
                    {/* DESKTOP / TABLET VIEW */}
                    <div className="flex flex-col lg:flex-row w-full gap-10">

                        <div className="w-40 md:w-60 lg:w-80 p-2 flex items-center justify-center lg:justify-start">
                            <img src={yoho} alt="" className="object-contain w-full" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">

                            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                                p-4 flex flex-col gap-5 rounded-xl">
                                <h1 style={{ ...FONTS.table_head }}
                                    className="text-[#4A7079] !font-bold">
                                    Organsation Name:
                                </h1>
                                <h1 style={{ ...FONTS.table_data }}
                                    className="text-[#4A7079] !font-medium break-words">
                                    {company_details?.company_name}
                                </h1>
                            </div>

                            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                                p-4 flex flex-col gap-5 rounded-xl">
                                <h1 style={{ ...FONTS.table_head }}
                                    className="text-[#4A7079] !font-bold">
                                    Organsation Mail:
                                </h1>
                                <h1 style={{ ...FONTS.table_data }}
                                    className="text-[#4A7079] !font-medium break-words">
                                    {company_details?.contact_info?.email}
                                </h1>
                            </div>

                            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                                p-4 flex flex-col gap-5 rounded-xl">
                                <h1 style={{ ...FONTS.table_head }}
                                    className="text-[#4A7079] !font-bold">
                                    Organsation Phone:
                                </h1>
                                <h1 style={{ ...FONTS.table_data }}
                                    className="text-[#4A7079] !font-medium break-words">
                                    {company_details?.contact_info?.phone}
                                </h1>
                            </div>

                            <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                                p-4 flex flex-col gap-5 rounded-xl">
                                <h1 style={{ ...FONTS.table_head }}
                                    className="text-[#4A7079] !font-bold">
                                    website:
                                </h1>
                                <a href='https://yohotechnologies.com/' target='_blank' style={{ ...FONTS.table_data }}
                                    className="text-[#4A7079] !font-medium break-words">
                                    {company_details?.website}
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="w-full bg-[#EAEBE8] shadow-[0px_0px_15px_0px_#4A70791A] 
                        p-4 flex flex-col gap-5 rounded-xl">
                        <h1 style={{ ...FONTS.table_head }}
                            className="text-[#4A7079] !font-bold">
                            Organsation Address:
                        </h1>
                        <h1 style={{ ...FONTS.table_data }}
                            className="text-[#4A7079] !font-medium break-words">
                            {company_details?.contact_info?.address}
                        </h1>
                    </div>
                </>
            )}

        </div>
    )
}

export default CompanyInfo
