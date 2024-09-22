// import React, { useContext, useEffect, useState, useRef } from "react"
// import { createContext } from "react"
// import { useAuthContext } from "./AuthContext"
// import { io } from "socket.io-client"
// import Peer from 'simple-peer'
// export const SocketContext = createContext()



// export const useSocketContext = () => {
//   return useContext(SocketContext)
// }

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null)
//   const [onlineUsers, setOnlineUsers] = useState([])
//   const { authUser } = useAuthContext()
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [stream, setStream] = useState()
//   const [name, setName] = useState();
//   const [call, setCall] = useState({});
//   const [me, setMe] = useState('');

//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();


//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://localhost:9000", {
//         query: {
//           userId: authUser._id,
//         },
//       })

//       setSocket(socket)

//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users)
//       })

//       return () => socket.close()
//     } else {
//       if (socket) {
//         socket.close()
//         setSocket(null)
//       }
//     }
//   }, [authUser])



//   useEffect(() => {
//     const socket = io("http://localhost:9000")
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);

//         myVideo.current.srcObject = currentStream;
//       });

//     socket.on('me', (id) => setMe(id));

//     socket.on('callUser', ({ from, name: callerName, signal }) => {
//       setCall({ isReceivingCall: true, from, name: callerName, signal });
//     });
//   }, []);


//   const answerCall = () => {
//     setCallAccepted(true);

//     const peer = new Peer({initiator: false, trickle: false, stream});

//     peer.on("signal", (data) => {
//       socket.emit('answerCall', {signal: data, to: call.from})
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     })

//     peer.signal(call.signal)


//     connectionRef.current = peer
//   }

//   const callUser = (id) => {
//     const peer = new Peer({initiator: true, trickle: false, stream});

//     peer.on('signal', (data) => {
//       socket.emit('callUser', {userToCall: id, signalData:data, from:me, name})
//     })

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });

//     socket.on('callAccepted', (signal) => {
//       setCallAccepted(true);

//       peer.signal(signal);
//     });

//     connectionRef.current =peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);

//     connectionRef.current.destroy();

//     window.location.reload();
//   }



//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers, call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
//       {children}
//     </SocketContext.Provider>
//   )
// }

// export default SocketContext



import React, { useContext, useEffect, useState, useRef } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
import Peer from 'simple-peer';

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:9000", {
        transports: ['websocket', 'polling'],
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, socket]);

  useEffect(() => {
    const newSocket = io("http://localhost:9000", {
      transports:["websocket", 'polling']
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    newSocket.on('me', (id) => setMe(id));

    newSocket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    setSocket(newSocket); // set socket state after initialization

    return () => newSocket.close(); // cleanup when component unmounts
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      if (socket) {
        socket.emit('answerCall', { signal: data, to: call.from });
      }
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      if (socket) {
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
      }
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
