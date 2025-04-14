import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement);

const EmployeeStatusChart = ({ data }) => {
    const hasNoData = !data || data.length === 0 || data.every(d => d.count === 0);

    if (hasNoData) {
        return (
            <div className="p-4 bg-white rounded-2xl shadow-lg flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg font-semibold">등록된 직급 정보가 없습니다 🧑‍💻</p>
            </div>
        );
    }

    const chartData = {
        labels: data.map((d) => d.title),
        datasets: [
            {
                label: "직급별 인원수",
                data: data.map((d) => d.count),
                backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC", "#EC407A", "#FF7043"],
                borderRadius: 8,
                barThickness: 30,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false // ✨ 필요 없으면 없애자
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
                ticks: {
                    font: { size: 14 },
                    color: '#666'
                }
            },
            y: {
                grid: {
                    drawBorder: false,
                    color: "rgba(200, 200, 200, 0.2)"
                },
                ticks: {
                    font: { size: 14 },
                    color: '#666',
                    beginAtZero: true,
                    precision: 0   // y축 소수점 없애기
                }
            }
        }
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg">
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default EmployeeStatusChart;
