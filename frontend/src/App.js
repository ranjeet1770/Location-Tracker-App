import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {

  const [location, setLocation] = useState(null);

  const sendLocation = () => {

    navigator.geolocation.getCurrentPosition((position) => {

      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      socket.emit("send-location", data);

    });

  };

  useEffect(() => {

    socket.on("receive-location", (data) => {

      console.log("Location update:", data);

      setLocation(data);

    });

  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>TrackSafe</h1>

      <button onClick={sendLocation}>
        Share My Location
      </button>

      {location && (
        <div style={{marginTop:"30px"}}>
          <h3>Latitude: {location.latitude}</h3>
          <h3>Longitude: {location.longitude}</h3>
        </div>
      )}

    </div>
  );
}

export default App;