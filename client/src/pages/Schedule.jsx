import { useState } from 'react';
import axios from 'axios';

const Schedule = () => {
    const [scheduleData, setScheduleData] = useState({ date: '', time: '' });
    const [meetingLink, setMeetingLink] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScheduleData({ ...scheduleData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/schedules', scheduleData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMeetingLink(response.data.meetingLink);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Schedule a Meeting</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Date</label>
                    <input type="date" name="date" value={scheduleData.date} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Time</label>
                    <input type="time" name="time" value={scheduleData.time} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Schedule</button>
                {meetingLink && <p className="mt-4 text-green-500">Meeting Link: <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a></p>}
            </form>
        </div>
    );
};

export default Schedule;
