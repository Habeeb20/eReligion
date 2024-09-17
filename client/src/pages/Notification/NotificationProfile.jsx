// MinisterProfile.js or UserProfile.js
import React from 'react';
import Notification from './Notification';

const NotificationProfile = ({ userId }) => {
  return (
    <div className="container mx-auto">
      {/* Other profile components */}
      <Notification userId={userId} />
    </div>
  );
};

export default NotificationProfile;
