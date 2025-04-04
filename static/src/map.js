const map = L.map("map").setView([60.486005, 15.430619], 17);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
}).addTo(map);

// HÄR STARTAR TASK 1
let task1Layer = L.layerGroup();


const polygonKordinater = [
    [60.485414, 15.429997],
    [60.485753, 15.430488],
    [60.485247, 15.43202],
    [60.4849, 15.431558],
    [60.485414, 15.429997],
];

const polygon = L.polygon(polygonKordinater, { color: "red" })
    .bindPopup("<h4>Högskolan Dalarna</h4><img src='/static/src/images/DU.jpg' width='200px'><p>Här är Högskolan Dalarna!</p>")
    .addTo(task1Layer);

const linjeKordinater = [
    [60.485402, 15.43256],
    [60.485859, 15.43089],
];

const linje = L.polyline(linjeKordinater, { color: "blue" })
    .bindPopup("<h4>Borlänge Bussgata</h4><img src='/static/src/images/buss.webp' width='200px'><p>Här är Borlänges bussgata!</p>")
    .addTo(task1Layer);

// Man skulle använda L.point och kommer inte på något bättre sätt att visa det på.
var centerPoint = L.point(map.getSize().x / 2, map.getSize().y / 2);

// gör om pixlarna till latlng
var latlng = map.containerPointToLatLng(centerPoint);

L.marker(latlng).addTo(task1Layer).bindPopup(
    "<h4>Svensk Fastighetsförmedling</h4><img src='/static/src/images/SF.jpg' width='200px'><p>Här är Svensk Fastighetsförmedling!</p>"
);


let task2Layer = L.layerGroup();



document.getElementById("task1Button").addEventListener("click", () => {
    map.removeLayer(task2Layer);
    task1Layer.addTo(map);
});

document.getElementById("task2Button").addEventListener("click", () => {
    map.removeLayer(task1Layer);
    task2Layer.addTo(map);
});
