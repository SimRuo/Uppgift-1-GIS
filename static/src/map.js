// Skickat med dessa från app.py -> index.html -> map.js
const supermarketData = JSON.parse(
    document.getElementById('supermarket-data').textContent
);
const fuelData = JSON.parse(
    document.getElementById('fuel-data').textContent
);
const schoolData = JSON.parse(
    document.getElementById('school-data').textContent
);

// Skapar en klass för att skapa en ny ikon för Leaflet
var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '/static/src/images/marker-shadow.png',
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [25, 50],
        shadowAnchor: [15, 63],
        popupAnchor: [-3, -76]
    }
});

var markers = {
    '#000000': new LeafIcon({ iconUrl: '/static/src/images/marker-black.png' }),
    '#0000FF': new LeafIcon({ iconUrl: '/static/src/images/marker-blue.png' }),
    '#F58231': new LeafIcon({ iconUrl: '/static/src/images/marker-orange.png' }),
    '#911EB4': new LeafIcon({ iconUrl: '/static/src/images/marker-purple.png' }),
    '#E6194B': new LeafIcon({ iconUrl: '/static/src/images/marker-red.png' }),
    '#FFE119': new LeafIcon({ iconUrl: '/static/src/images/marker-yellow.png' })
};


const map = L.map("map", {
    zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true
}).setView([60.486005, 15.430619], 17);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
}).addTo(map);

// animation för hover effekt på kartan
document.getElementById('map').addEventListener('mouseover', function () {
    this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
});

document.getElementById('map').addEventListener('mouseout', function () {
    this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
});

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

L.marker(latlng, { icon: markers['#0000FF'] }).addTo(task1Layer).bindPopup(
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
    L.marker(skola.kordinater, { icon: markers['#0000FF'] })
        .addTo(task2Layer)
        .on('click', function (e) {
            document.getElementById("informationSidebar").innerHTML = '';
            document.getElementById("informationSidebar").innerHTML = `
            <div class="card shadow rounded-4 p-3 mb-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-info">${skola.namn}</h5>
                    <p class="card-text text-muted mb-2">${skola.beskrivning}</p>
                    <p class="card-text mb-0"><strong>Antal elever:</strong> ${skola.elever}</p>
                </div>
            </div>
            `;
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
function setBuffer() {
    const buffers = [];

    supermarketData.features.forEach(feature => {
        const point = turf.point(feature.geometry.coordinates);
        const buffered = turf.buffer(point, 1, { units: 'kilometers' });
        buffers.push({ feature, buffered });
    });

    buffers.forEach((item, index) => {
        const feature = item.feature;
        const buffered = item.buffered;
        const coords = feature.geometry.coordinates;
        const [lng, lat] = coords;

        let overlaps = false;

        for (let i = 0; i < buffers.length; i++) {
            if (i !== index) {
                if (turf.booleanIntersects(buffered, buffers[i].buffered)) {
                    overlaps = true;
                    break;
                }
            }
        }

        const markerColor = overlaps ? '#911EB4' : '#0000FF';

        L.marker([lat, lng], { icon: markers[markerColor] }).addTo(task3Layer).bindPopup(
            `<h4>${feature.properties.name}</h4><p>${feature.properties.description}</p><p>Öppettider: ${feature.properties.opening_ho}</p>`
        );

        L.geoJSON(buffered, {
            color: 'blue',
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.2
        }).addTo(task3Layer);
    });
}

// HÄR STARTAR TASK 4
let task4Layer = L.layerGroup();


const imageUrl = '/static/src/images/njupeskär.jpg';
const imageBounds = [
    [61.547848, 12.726224],
    [61.597848, 12.852994]
];

L.imageOverlay(imageUrl, imageBounds).addTo(task4Layer);

// HÄR STARTAR TASK 5

let task5Layer = L.markerClusterGroup();

fuelData.features.forEach(feature => {
    const coords = feature.geometry.coordinates;
    const [lng, lat] = coords;
    L.marker([lat, lng], { icon: markers['#0000FF'] }).addTo(task5Layer).bindPopup(
        `<h4>${feature.properties.name}</h4>`
    );
});

// HÄR STARTAR TASK 6
// tänkte köra på SMHIs data men dom har cors restriktioner så får inte ut datan.
let task6Layer = L.layerGroup();

const cities = [
    { name: "Stockholm", lat: 59.33, lon: 18.06 },
    { name: "Gothenburg", lat: 57.71, lon: 11.98 },
    { name: "Malmö", lat: 55.61, lon: 13.00 },
    { name: "Uppsala", lat: 59.86, lon: 17.64 },
    { name: "Luleå", lat: 65.58, lon: 22.15 }
];

const API_KEY = "hemligt";
const container = document.getElementById('informationSidebar');

cities.forEach(city => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.main || !data.weather || !data.wind) {
                throw new Error("Fick inte med all data från API:et");
            }

            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            const marker = L.marker([city.lat, city.lon], { icon: markers['#0000FF'] }).addTo(task6Layer).bindPopup(`
                    <h5 class="card-title fw-bold text-primary">${city.name}</h5>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="card-img-top mx-auto" alt="${description}" style="width: 100px;">
                    <div class="card-body">
                        <p class="text-capitalize text-muted mb-1">${description}</p>
                        <p class="mb-1"><strong>Temperature:</strong> ${temperature} °C</p>
                        <p class="mb-0"><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                    </div>
            `);

            marker.on('click', function () {
                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(forecastData => {
                        if (!forecastData.list) {
                            throw new Error("Fick inte med all data från API:et");
                        }

                        let forecastHtml = `
                        <div class="card shadow rounded-3 text-center p-3">
                            <h5 class="card-title fw-bold text-primary">${city.name} Forecast</h5>
                            <div class="forecast-container">
                    `;

                        forecastData.list.forEach(forecast => {
                            const forecastTime = new Date(forecast.dt * 1000).toLocaleString();
                            const forecastTemp = forecast.main.temp;
                            const forecastDescription = forecast.weather[0].description;
                            const forecastIcon = forecast.weather[0].icon;
                            const forecastWindSpeed = forecast.wind.speed;

                            forecastHtml += `
                            <div class="card-body">
                                <p class="mb-1"><strong>Date:</strong> ${forecastTime}</p>
                                <img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" class="card-img-top mx-auto" alt="${forecastDescription}" style="width: 100px;">
                                <p class="text-capitalize text-muted mb-1">${forecastDescription}</p>
                                <p class="mb-1"><strong>Temperature:</strong> ${forecastTemp} °C</p>
                                <p class="mb-0"><strong>Wind Speed:</strong> ${forecastWindSpeed} m/s</p>
                                <hr>
                            </div>
                        `;
                        });

                        forecastHtml += `</div></div>`;

                        document.getElementById("informationSidebar").innerHTML = forecastHtml;
                    })
                    .catch(error => {
                        console.error("Error fetching forecast data", error);
                    });
            });
        })
        .catch(error => {
            console.error("Error fetching current weather data", city.name, error);
        });
});



// HÄR STARTAR TASK 7
let task7Layer = L.layerGroup();

schoolData.features.forEach(feature => {
    const coords = feature.geometry.coordinates;
    const [lng, lat] = coords;
    const color = feature.properties.Color;

    L.marker([lat, lng], { icon: markers[color] }).addTo(task7Layer);
});


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
    map.flyTo([60.486005, 15.430619], 17, {
        duration: 1
    });
});

document.getElementById("task2Button").addEventListener("click", () => {
    clearMap(task2Layer)
    map.flyTo([60.605866810126194, 15.628008842468262], 14, {
        duration: 1
    });
    polylineMeasure.seed([line1coords]) //avstånd mellan skolorna

});

document.getElementById("task3Button").addEventListener("click", () => {
    clearMap(task3Layer)
    map.flyTo([60.0586, 17.6389], 9, {
        duration: 1
    });
    setBuffer();
});

document.getElementById("task4Button").addEventListener("click", () => {
    clearMap(task4Layer)
    map.flyTo([61.547848, 12.776224], 12, {
        duration: 1
    });
});

document.getElementById("task5Button").addEventListener("click", () => {
    clearMap(task5Layer)
    map.flyTo([59.334591, 18.023240], 11, {
        duration: 1
    });
});

document.getElementById("task6Button").addEventListener("click", () => {
    clearMap(task6Layer)

    map.flyTo([62, 15], 6, {
        duration: 1
    });
});

document.getElementById("task7Button").addEventListener("click", () => {
    clearMap(task7Layer)
    map.flyTo([59.334591, 18.023240], 11, {
        duration: 1
    });
});
