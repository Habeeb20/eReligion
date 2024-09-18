const createMeeting = async (token) => {
    const response = await fetch("https://api.videosdk.live/v1/meetings", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const { meetingId } = await response.json();
    return meetingId;
  };
  