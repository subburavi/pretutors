import React, { useState, useEffect, useCallback, useRef, createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { SOCKETURL } from "../../ApiUrl";
  
 
export const SocketContext = createContext({
  isConnected: false,
  sendCommand: () => {},
  socket: null,
  onEvent: () => {},
});

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();
   const socketRef = useRef(null);

   const [readyState, setReadyState] = useState(false);
   // Initialize Socket
  useEffect(() => {
  
//https://aiserver.gitam.edu:3005
    const socket = io(SOCKETURL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    const handleConnect = () => {
      setReadyState(true);
     // dispatch(socketStateupdate({ state: true }));
      console.log("✅ Socket connected");
    };

    const handleDisconnect = () => {
      setReadyState(false);
     // dispatch(socketStateupdate({ state: false }));
      console.warn("❌ Socket disconnected");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, [dispatch]);

  // Emit events
  const sendCommand = useCallback((cmd, data) => {
    if (readyState && socketRef.current?.connected) {
     // console.log(`📡 Emitting command: ${cmd}`, data);
      socketRef.current.emit(cmd, data);
    } else {
      console.warn("⚠️ Socket not connected");
    }
  }, [readyState]);

  // Register socket event listeners
  const onEvent = useCallback((event, callback) => {
    if (!socketRef.current) {
      console.warn("⚠️ Socket not initialized");
      return;
    }

    socketRef.current.on(event, callback);

    return () => {
      socketRef.current.off(event, callback);
    };
  }, []);
const offEvent = useCallback((event, callback) => {
  if (!socketRef.current) {
    console.warn("⚠️ Socket not initialized");
    return;
  }
  socketRef.current.off(event, callback);
}, []);
  return (
    <SocketContext.Provider value={{
      isConnected: readyState,
      sendCommand,
      socket: socketRef.current,
      onEvent,
       offEvent,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
