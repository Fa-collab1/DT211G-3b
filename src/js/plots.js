'use strict';
const dataURL = 'https://studenter.miun.se/~mallar/dt211g/';

async function fetchData() {
    const response = await fetch(dataURL);
    const data = await response.json(); // Förutsätter att servern returnerar JSON
    data.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

//tar fram data för stapeldiagrammet
// Först filtrerar vi ut element där item.type är "Kurs".
const kurser = data.filter(item => item.type === "Kurs");
// Sedan tar vi fram namn på kurserna och antal sökande, men endast för de filtrerade elementen.
const barLabels = kurser.map(item => item.name).slice(0, 6);
const barDataPoints = kurser.map(item => item.applicantsTotal).slice(0, 6);

    renderBarChart(barLabels, barDataPoints);
}








function renderBarChart(barLabels, barDataPoints) {
    // Hämtar canvas-elementet där diagrammet ska visas, och förbereder det för 2d-ritning.
    const ctx = document.getElementById('barChart').getContext('2d');
    // Skapar ett nytt stapeldiagram med Chart.js.
    const barChart = new Chart(ctx, {
        type: 'bar', // Anger typen av diagram till stapeldiagram.
        data: {
            labels: barLabels, // Sätter etiketterna för x-axeln, baserat på barLabels-arrayen.
            datasets: [{
                label: '#sökande', // Titeln för datasetet som visas i diagrammets legend.
                data: barDataPoints, // Data för varje stapel, baserat på barDataPoints-arrayen.
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)' // Färgen på staplarna.
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)' // Färgen på staplarnas kant.
                ],
                borderWidth: 1 // Bredden på staplarnas kant.
            }]
        },
        options: {
            responsive: true, // Gör så att diagrammet automatiskt anpassar storleken efter sin container.
            maintainAspectRatio: true, // Behåller diagrammets ursprungliga proportioner när det skalas om.
            scales: { // Konfiguration för axlarna.
                y: { // Konfiguration för y-axeln.
                    beginAtZero: true, // Startar y-axeln från noll.
                    grid: { // Inställningar för rutnätet.
                        color: 'rgba(0, 0, 0, 0.2)', // Färgen på rutnätets linjer.
                    },
                    ticks: { // Inställningar för siffrorna vid axeln.
                        color: '#000', // Färgen på texten för ticks.
                    }
                },
                x: { // Konfiguration för x-axeln.
                    grid: {
                        display: false, // Döljer rutnätet för x-axeln.
                    },
                    ticks: {
                        color: '#000', // Färgen på texten för ticks.
                    }
                }
            },
            plugins: {
                legend: { // Inställningar för diagrammets "legend".
                    labels: {
                        font: {
                            size: 14 // Storleken på texten i "legend"-en.
                        }
                    }
                },
                tooltip: { // Konfiguration för verktygstips/tooltips som visas när man håller musen över en stapel.
                    enabled: true, // Aktiverar verktygstips.
                    backgroundColor: 'rgba(0,0,0,0.7)', // Bakgrundsfärgen för verktygstipsen.
                    titleFont: {
                        size: 16, // Storleken på texten i verktygstipsens titel.
                        weight: 'bold', // Gör texten i titeln fet.
                    },
                    bodyFont: {
                        size: 14, // Storleken på texten i verktygstipsens brödtext.
                    },
                    cornerRadius: 6, // Rundar hörnen på verktygstipsen.
                    caretSize: 10, // Storleken på pekpilen på från verktygstipsrutan.
                }
            }
        }
    });
}



fetchData();
