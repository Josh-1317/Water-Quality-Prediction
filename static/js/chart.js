document.addEventListener("DOMContentLoaded", () => {
    // --- Dark Mode Toggle ---
    const toggle = document.getElementById("darkToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            toggle.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "🌞";
        });
    }

    // --- Chart Generation ---
    const canvas = document.getElementById("pollutionChart");
    if (canvas) {
        const labels = JSON.parse(canvas.dataset.labels || "[]");
        const values = JSON.parse(canvas.dataset.values || "[]");

        if (labels.length > 0 && values.length > 0) {
            new Chart(canvas, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Pollutant Level (mg/L)",
                        data: values,
                        backgroundColor: [
                            "#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336", "#00bcd4"
                        ],
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: ctx => `${ctx.label}: ${ctx.parsed.y} mg/L`
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: "Concentration (mg/L)" }
                        }
                    }
                }
            });
        }
    }

    // --- Auto-scroll to results ---
    const resultsSection = document.getElementById("results-section");
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// --- Download Functions ---
function downloadCSV() {
    const canvas = document.getElementById("pollutionChart");
    if (!canvas) return;
    
    const labels = JSON.parse(canvas.dataset.labels || "[]");
    const values = JSON.parse(canvas.dataset.values || "[]");

    let csvContent = "Pollutant,Value (mg/L)\n";
    labels.forEach((label, i) => {
        csvContent += `${label},${values[i]}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "pollution_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadPDF() {
    const chartArea = document.getElementById("chart-area");
    if (chartArea) {
        html2pdf().from(chartArea).set({
            margin: 1,
            filename: 'pollution_report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }).save();
    }
}