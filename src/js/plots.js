'use strict';
const dataURL = 'https://studenter.miun.se/~mallar/dt211g/';

async function fetchData() {
    const response = await fetch(dataURL);
    const data = await response.json(); // Förutsätter att servern returnerar JSON
//tar fram namn på kurserna och antal sökande   
    const barLabels = data.map(item => item.name); 
    const barDataPoints = data.map(item => item.applicantsTotal);

    renderChart(barLabels, barDataPoints);
}

function renderChart(barLabels, barDataPoints) {
    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: barLabels,
            datasets: [{
                label: '#sökande',
                data: barDataPoints,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

fetchData();
