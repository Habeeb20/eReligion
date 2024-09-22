// import React, { useContext, useState } from 'react'
// import { Button, TextField, Grid2, Typography, Container, Paper } from '@mui/material'
// import { makeStyles } from '@mui/styles'
// import { copyToClipboard } from 'react-copy-to-clipboard'
// import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material'
// import CopyToClipboard from 'react-copy-to-clipboard'
// import { SocketContext } from '../../context/SocketContext'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     gridContainer: {
//         width: '100%',
//         //   [theme.breakpoints.down('xs')]: {
//         //     flexDirection: 'column',
//         //   },
//     },
//     container: {
//         width: '600px',
//         margin: '35px 0',
//         padding: 0,
//         //   [theme.breakpoints.down('xs')]: {
//         //     width: '80%',
//         //   },
//     },
//     margin: {
//         marginTop: 20,
//     },
//     padding: {
//         padding: 20,
//     },
//     paper: {
//         padding: '10px 20px',
//         border: '2px solid black',
//     },
// }));
// const Options = ({ children }) => {
//     const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
//     const [idToCall, setIdToCall ] = useState('');
//     const classes = useStyles();

//     return (
//         <Container className={classes.container}>
//         <Paper elevation={10} className={classes.paper}>
//           <form className={classes.root} noValidate autoComplete="off">
//             <Grid2 container className={classes.gridContainer}>
//               <Grid2 item xs={12} md={6} className={classes.padding}>
//                 <Typography gutterBottom variant="h6">Account Info</Typography>
//                 <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
             
//                 <CopyToClipboard text={me} className={classes.margin}>
//                   <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
//                     Copy Your ID
//                   </Button>
//                 </CopyToClipboard>
//               </Grid2>
//               <Grid2 item xs={12} md={6} className={classes.padding}>
//                 <Typography gutterBottom variant="h6">Make a call</Typography>
//                 <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
//                 {callAccepted && !callEnded ? (
//                   <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
//                     Hang Up
//                   </Button>
//                 ) : (
//                   <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
//                     Call
//                   </Button>
//                 )}
//               </Grid2>
//             </Grid2>
//           </form>
//           {children}
//         </Paper>
//       </Container>
//     )
// }

// export default Options




import React, { useContext, useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SocketContext } from '../../context/SocketContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    marginTop:"-15%",
    backgroundColor: '#f0f4f8', // Soft background
  },
  paper: {
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputField: {
    marginBottom: '1rem',
    '& input': {
      padding: '10px',
    },
  },
  button: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    textTransform: 'none',
    borderRadius: '8px',
  },
  margin: {
    marginTop: '1.5rem',
  },
  title: {
    marginBottom: '0.75rem',
    fontWeight: 500,
    color: '#212121',
  },
}));

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={3}>
            {/* Account Info Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>Account Info</Typography>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                className={classes.inputField}
              />
              <CopyToClipboard text={me}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment />}
                  className={classes.button}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            {/* Call Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>Make a Call</Typography>
              <TextField
                label="ID to Call"
                variant="outlined"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
                className={classes.inputField}
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled />}
                  fullWidth
                  onClick={leaveCall}
                  className={classes.button}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  className={classes.button}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
