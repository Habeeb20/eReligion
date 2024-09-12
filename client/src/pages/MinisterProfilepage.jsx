import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MinisterProfilePage = () => {
  const { id } = useParams();
  const [minister, setMinister] = useState(null);

  useEffect(() => {
    const fetchMinister = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/minister/${id}`);
        setMinister(res.data);
      } catch (error) {
        console.error('Error fetching minister:', error);
      }
    };
    fetchMinister();
  }, [id]);

  if (!minister) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-xl font-bold">Minister Profile: {minister.firstName} {minister.lastName}</h2>
      
      <div className="my-5">
        <h3 className="font-semibold">Scheduled Meetings</h3>
        {minister.scheduledMeetings.length > 0 ? (
          minister.scheduledMeetings.map((meeting) => (
            <div key={meeting._id} className="border p-2 my-2">
              <p>Meeting Date: {new Date(meeting.date).toLocaleString()}</p>
              <p>Scheduled by: {meeting.userId?.firstName} {meeting.userId?.lastName}</p>
            </div>
          ))
        ) : (
          <p>No meetings scheduled.</p>
        )}
      </div>

      <div className="my-5">
        <h3 className="font-semibold">Reviews</h3>
        {minister.reviews.length > 0 ? (
          minister.reviews.map((review) => (
            <div key={review._id} className="border p-2 my-2">
              <p>Comment: {review.comment}</p>
              <p>By: {review.userId?.firstName} {review.userId?.lastName}</p>
              <p>Date: {new Date(review.date).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default MinisterProfilePage;
