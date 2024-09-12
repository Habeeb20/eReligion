import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ScheduleMeeting = () => {
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    // Send meeting data to backend
    alert(`Meeting scheduled for ${date}`);
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-lg font-bold mb-4">Schedule a Meeting</h2>
      <Calendar onChange={setDate} value={date} />
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4"
        onClick={handleSubmit}
      >
        Schedule
      </button>
    </div>
  );
};

export default ScheduleMeeting;
