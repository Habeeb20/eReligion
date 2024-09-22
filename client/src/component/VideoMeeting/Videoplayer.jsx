import React, { useContext } from 'react'
import { Grid2, Typography, Paper} from '@mui/material'
import { SocketContextProvider } from '../../context/SocketContext'
import {SocketContext} from '../../context/SocketContext'
import {makeStyles} from "@mui/styles"

    
const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
    //   [theme.breakpoints.down('xs')]: {
    //     width: '300px',
    //   },
    },
    gridContainer: {
      justifyContent: 'center',
    //   [theme.breakpoints.down('xs')]: {
    //     flexDirection: 'column',
    //   },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));




const Videoplayer = () => {
  
    const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext)
    const classes= useStyles()
  return (
    <Grid2 container className={classes.gridContainer} >
      {stream && (
          <Paper className={classes.paper} >
          <Grid2 item xs={12} md={6}>
              <Typography variant= "h5" gutterBottom>{name || 'Name'} </Typography>
              <video playsInLine muted ref={myVideo} autoPlay className='={classes.Video' />

          </Grid2>

      </Paper>
      )}
      {callAccepted && !callEnded && (
         <Paper className={classes.paper}>
         <Grid2 item xs={12} md={6}>
           <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
           <video playsInline ref={userVideo} autoPlay className={classes.video} />
         </Grid2>
       </Paper>
      )}
    </Grid2>
  )
}

export default Videoplayer
