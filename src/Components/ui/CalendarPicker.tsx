import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface props {
    setselecteDate?: (data: Date | null) => void
}

const CalendarPicker: React.FC<props> = ({ setselecteDate }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <div className="p-4">
            <DatePicker
                selected={startDate}
                onChange={(date) => {
                    setStartDate(date);
                    setselecteDate?.(date)
                }}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select month and year"
            />
        </div>
    );
};

export default CalendarPicker;
