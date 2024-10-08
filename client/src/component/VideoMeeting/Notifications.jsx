import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { SocketContext } from '../../context/SocketContext'


const Notifications = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);

    return (
        <div>
            {call.isReceivingCall && !callAccepted && (
                <div>
                    <h1>{call.name} is calling:</h1>
                    <Button variant="contained" color="primary" onClick={answerCall}>
                        Answer
                    </Button>

                </div>
            )}

        </div>
    )
}

export default Notifications
