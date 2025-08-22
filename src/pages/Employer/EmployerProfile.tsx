import React from 'react'
import bg from '../../assets/Rectangle.png'
import { FONTS } from '../../constants/uiconstants'
import CalendarPicker from '../../Components/ui/CalendarPicker'

const EmployerProfile = () => {
    return (
        <div className="w-full h-full mt-5">
            <h1 style={{ ...FONTS.Main }}>Employer</h1>
            <div
                className="w-full h-[82vh] bg-cover rounded-4xl"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <div className="flex flex-row w-full gap-5">
                    <div className="flex flex-col w-8/12 gap-8">
                        <div className="w-full h-20 flex flex-row rounded-4xl items-baseline gap-5 p-4">
                            <CalendarPicker />
                            <div className="bg-[#7697A0] w-max p-2 px-6 h-max rounded-lg font-bold text-white text-md">Generated</div>
                        </div>
                        <div className="flex flex-col w-full h-[68vh] mx-4 rounded-3xl gap-5 p-4">
                            <div className="w-full h-52 bg-[#EAEBE8] rounded-2xl"></div>
                            <div className="w-full h-96 bg-[#EAEBE8] rounded-2xl p-4">
                                <h1>Previous silps</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#EAEBE8] w-3/10 h-[78vh] m-4 rounded-3xl">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployerProfile