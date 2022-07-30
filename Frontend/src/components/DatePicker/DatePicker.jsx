import React, { useState } from 'react';
import DatePicker from "react-datepicker";

const DatepickerTimehooks = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <div>
            <DatePicker showTimeInput
                timeFormat="HH:mm:ss"
                timeIntervals={15}
                timeCaption="time"
                showTimeSelect selected={currentDate} onChange={date => setCurrentDate(date)} />

        </div>
    );
};

export default DatepickerTimehooks;