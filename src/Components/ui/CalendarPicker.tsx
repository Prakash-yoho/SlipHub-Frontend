import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { COLORS, FONTS } from '../../constants/uiconstants';

interface props {
    setselecteDate?: (data: Date | null) => void
}

const CalendarPicker: React.FC<props> = ({ setselecteDate }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <div className="w-[100%]" style={{ ...FONTS.Nav, color: COLORS.primary }}>
            <DatePicker
                selected={startDate}
                onChange={(date) => {
                    setStartDate(date);
                    setselecteDate?.(date)
                }}
                
                dateFormat="MMM yyyy"
                showMonthYearPicker
                className="bg-[#EAEBE8] px-3 py-2 pr-10 rounded-lg w-[100%] border border-[#4A7079] outline-0
                             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholderText="Select month and year"
            />
        </div>
    );
};

export default CalendarPicker;
