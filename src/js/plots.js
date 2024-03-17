'use strict';
const dataURL = 'https://studenter.miun.se/~mallar/dt211g/';

async function generateGraphs() {
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

//tar fram data för cirkeldiagrammet
// Först filtrerar vi ut element där item.type är "Program".
const program = data.filter(item => item.type === "Program");
// Sedan tar vi fram namn på kurserna och antal sökande, men endast för de filtrerade elementen.
const pieLabels = program.map(item => item.name).slice(0, 5);
const pieDataPoints = program.map(item => item.applicantsTotal).slice(0, 5);

    renderPieChart(pieLabels, pieDataPoints);

}

function renderPieChart(pieLabels, pieDataPoints) {
    // Hämtar canvas-elementet där diagrammet ska visas.
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    // Skapar ett nytt cirkeldiagram.
    const pieChart = new Chart(ctx, {
        type: 'pie', // Ange typen av diagram till 'pie' för cirkeldiagram.
        data: {
            labels: pieLabels, // Använder pieLabels för etiketterna i cirkeldiagrammet.
            datasets: [{
                label: '#sökande', // Beskrivning av datamängden.
                data: pieDataPoints, // Data för varje "skiva" i cirkeldiagrammet.
                backgroundColor: [ // Olika färger för varje "skiva".
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [ // Färg på kanterna för varje "skiva".
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1 // Bredd på kanterna för varje "skiva".
            }]
        },
        options: {
            responsive: true, // Gör diagrammet responsivt.
            legend: {
                position: 'top', // Placering av legend (beskrivning av färger/datamängder).
            },
            title: {
                display: true,
                text: 'Antal sökande per program' // Titel på diagrammet.
            }
        }
    });
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



generateGraphs();
