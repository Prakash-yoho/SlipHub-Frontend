import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarPicker: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <div className="p-4">
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select month and year"
            />
        </div>
    );
};

export default CalendarPicker;
