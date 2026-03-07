const username = prompt("Enter your name:")

const socket = io("http://localhost:5000")

let map = L.map('map').setView([0,0], 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: "OpenStreetMap"
}).addTo(map)

const markers = {}

if (navigator.geolocation) {

  navigator.geolocation.watchPosition((position) => {

    const { latitude, longitude } = position.coords

    socket.emit("send-location", {
      latitude,
      longitude,
      username
    })

  })

}

socket.on("receive-location", (data) => {

  const { id, latitude, longitude, username } = data

  if(markers[id]){

    markers[id].setLatLng([latitude, longitude])

  } else {

    markers[id] = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(username)

  }

  map.setView([latitude, longitude], 15)

})

socket.on("user-disconnected", (id) => {

  if(markers[id]){

    map.removeLayer(markers[id])
    delete markers[id]

  }

})