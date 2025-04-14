import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement);

const TodayAbsenceChart = ({ data }) => {
    // ✨ 오늘 결근자가 없는지 확인
    const hasNoAbsences = !data || data.length === 0 || data.every(d => d.count === 0);

    if (hasNoAbsences) {
        return (
            <div className="p-4 bg-white rounded-2xl shadow-lg flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg font-semibold">오늘 결근자가 없습니다 🎉</p>
            </div>
        );
    }

    const chartData = {
        labels: data.map((d) => d.name),
        datasets: [
            {
                label: "오늘 결근자 수",
                data: data.map((d) => d.count),
                backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"],
                borderRadius: 8,
                barThickness: 30,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.7)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 },
                padding: 10,
                borderColor: '#ccc',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 14 }, color: '#666' }
            },
            y: {
                grid: { drawBorder: false, color: "rgba(200, 200, 200, 0.2)" },
                ticks: { font: { size: 14 }, color: '#666', beginAtZero: true }
            }
        }
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg">
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default TodayAbsenceChart;
