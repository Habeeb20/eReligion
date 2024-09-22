import React from "react";

const MeetingStep = () => {
  return (
    <div className="meeting-container">
      <div className="meeting-card">
        {/* Left section - Profile */}
        <div className="left-section">
          <img
            src="/path-to-image/pastor.jpg" // Replace with actual image path
            alt="Pastor"
            className="profile-image"
          />
          <h2 className="profile-name">Pst. James Johnson</h2>
          <p className="church-name">
            <i className="fa fa-church" aria-hidden="true"></i> Body of Christ Church
          </p>
          <div className="bio-section">
            <h3>Bio</h3>
            <p>I am a pastor from humble beginnings.</p>
            <p>I am a pastor.</p>
          </div>
          <div className="duration-section">
            <h3>Duration</h3>
            <p>30-45 min</p>
          </div>
        </div>

        {/* Right section - Form */}
        <div className="right-section">
          <div className="header">
            <h2>Step 3 of 3</h2>
            <button className="close-btn">&times;</button>
          </div>
          <div className="form-section">
            <h3>Purpose for meeting</h3>
            <label>Define the purpose</label>
            <input
              type="text"
              placeholder="e.g 30-45 minutes breakthrough prayers"
              className="input-field"
            />
            <label>Add more details (optional)</label>
            <textarea
              placeholder="e.g 30-45 minutes breakthrough prayers"
              className="textarea-field"
            ></textarea>
            <button className="payment-btn">Go to Payment Platform</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingStep;
