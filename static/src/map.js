const supermarketData = JSON.parse(
    document.getElementById('supermarket-data').textContent
);

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

// HÄR STARTAR TASK 2
let task2Layer = L.layerGroup();

const skolor = [
    {
        namn: "Högskolan Dalarna, Falun",
        beskrivning: "En ledande högskola i Dalarna som erbjuder utbildningar inom flera områden, inklusive teknik, ekonomi och samhällsvetenskap. Skolan är känd för sin innovativa undervisning och nära samarbete med företag och organisationer.",
        kordinater: [60.614990, 15.652626],
        elever: "en miljon",
    },
    {
        namn: "Östra skolan",
        beskrivning: "En mångsidig grundskola belägen i hjärtat av staden, med fokus på att skapa en trygg och inspirerande lärandemiljö. Skolan erbjuder både teoretiska och praktiska ämnen för att förbereda eleverna för framtiden.",
        kordinater: [60.611392, 15.630756],
        elever: "en miljon",
    },
    {
        namn: "Hagströmska Gymnasiet",
        beskrivning: "En gymnasieskola som erbjuder högkvalitativ utbildning med fokus på både akademiska ämnen och kreativa yrkesprogram. Eleverna får möjlighet att utveckla sina färdigheter och förbereda sig för vidare studier eller arbetslivet.",
        kordinater: [60.604957, 15.629480],
        elever: "en miljon",
    },
    {
        namn: "Hälsinggårdsskolan",
        beskrivning: "En skolform som strävar efter att ge eleverna en balanserad utbildning med betoning på både akademiska prestationer och personlig utveckling. Skolan har ett starkt engagemang för att inkludera alla elever.",
        kordinater: [60.592884, 15.685372],
        elever: "en miljon",
    },
    {
        namn: "Kristinegymnasiet",
        beskrivning: "En modern gymnasieskola som erbjuder både teoretiska och yrkesinriktade utbildningar. Här får eleverna möjlighet att fördjupa sig i sitt intresseområde samtidigt som de utvecklas som individer.",
        kordinater: [60.609604, 15.632517],
        elever: "en miljon",
    },
];

const line1coords = [];

skolor.forEach((skola) => {
    line1coords.push({ lat: skola.kordinater[0], lng: skola.kordinater[1] });
    L.marker(skola.kordinater)
        .addTo(task2Layer)
        .on('click', function (e) {
            document.getElementById("informationSidebar").innerHTML = '';
            document.getElementById("informationSidebar").innerHTML = `<h4>${skola.namn}</h4><p>${skola.beskrivning}</p><p>Antal elever: ${skola.elever}</p>`;
        });
});

let polylineMeasure = L.control.polylineMeasure({
    position: 'topleft',
    unit: 'kilometres',
    showBearings: false,
    clearMeasurementsOnStop: false,
    showClearControl: false,
    showUnitControl: false,
    measureControlClasses: ["d-none"], // Vi använder css för att gömma knappen för att mäta avståndet.
})
polylineMeasure.addTo(map);

// HÄR STARTAR TASK 3
let task3Layer = L.layerGroup();

// lägga till lite if null checks här för att inte rendera en massa undefined
supermarketData.features.forEach(feature => {
    const coords = feature.geometry.coordinates;
    const [lng, lat] = coords;
    L.marker([lat, lng]).addTo(task3Layer).bindPopup(
        `<h4>${feature.properties.name}</h4><p>${feature.properties.description}</p><p>Öppettider: ${feature.properties.opening_ho}</p>`
    );

    // vet inte om det är såhär vi ska göra eller om vi ska använda typ turf.buffer som vijay visade i föreläsningen.
    L.circle([lat, lng], {
        radius: 1000,
        color: 'blue',
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.2
    }).addTo(task3Layer);
});

// HÄR STARTAR TASK 4
let task4Layer = L.layerGroup();










let activeLayer = task1Layer;

// mycket repeterande kod så skapar en liten funktion för att rensa kartan och rendera det lagret vi vill ha.
function clearMap(newLayer) {
    document.getElementById("informationSidebar").innerHTML = '';
    map.removeLayer(activeLayer);
    activeLayer = newLayer;
    activeLayer.addTo(map);
}

// Event för knapparna, vi rensar bara allt som ska rensas och renderar lagret som vi behöver.
// Sparar activeLayer i en variabel så att vi kan ta bort det lagret som är aktivt just nu.
document.getElementById("task1Button").addEventListener("click", () => {
    clearMap(task1Layer)
    map.setView([60.486005, 15.430619], 17);
});

document.getElementById("task2Button").addEventListener("click", () => {
    clearMap(task2Layer)
    map.setView([60.605866810126194, 15.628008842468262], 14);
    polylineMeasure.seed([line1coords]) //avstånd mellan skolorna

});

document.getElementById("task3Button").addEventListener("click", () => {
    clearMap(task3Layer)
    map.setView([60.0586, 17.6389], 9);
});

document.getElementById("task4Button").addEventListener("click", () => {
    document.getElementById("informationSidebar").innerHTML = '';
    map.removeLayer(activeLayer);
    task4Layer.addTo(map);
    activeLayer = task4Layer;
});

document.getElementById("task5Button").addEventListener("click", () => {
    document.getElementById("informationSidebar").innerHTML = '';
    map.removeLayer(activeLayer);
    task5Layer.addTo(map);
    activeLayer = task5Layer;
});

document.getElementById("task6Button").addEventListener("click", () => {
    document.getElementById("informationSidebar").innerHTML = '';
    map.removeLayer(activeLayer);
    task6Layer.addTo(map);
    activeLayer = task6Layer;
});
