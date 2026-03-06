const socket = io("http://localhost:5000")

let map = L.map('map').setView([0,0], 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: "OpenStreetMap"
}).addTo(map)

let marker

if (navigator.geolocation) {

  navigator.geolocation.watchPosition((position) => {

    const { latitude, longitude } = position.coords

    console.log(latitude, longitude)

    socket.emit("send-location", { latitude, longitude })

    if(marker){
      marker.setLatLng([latitude, longitude])
    }
    else{
      marker = L.marker([latitude, longitude]).addTo(map)
    }

    map.setView([latitude, longitude], 15)

  })

}