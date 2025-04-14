import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const AttendanceBarChart = ({ data = [] }) => {
    const hasNoData = !data || data.length === 0 || data.every(d => d.workHours === 0);

    if (hasNoData) {
        return (
            <div className="p-4 bg-white rounded-2xl shadow-lg flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg font-semibold">이번 달 근무 시간 데이터가 없습니다 🕒</p>
            </div>
        );
    }

    // 색상 배열
    const colors = [
        '#42A5F5', // 파랑
        '#66BB6A', // 연두
        '#FFA726', // 주황
        '#AB47BC', // 보라
        '#26C6DA', // 청록
        '#FF7043', // 코랄
        '#D4E157', // 연노랑
        '#78909C', // 그레이블루
        '#8D6E63', // 브라운
    ];

    const chartData = {
        labels: data.map((d) => d.name),
        datasets: [
            {
                label: "월별 근무시간",
                data: data.map((d) => d.workHours),
                backgroundColor: data.map((_, idx) => colors[idx % colors.length]),  // 막대별 다른 색
                borderColor: '#fff',    // 경계 흰색
                borderWidth: 1,
                borderRadius: 8,
                barThickness: 40,
            }
        ]
    };

    const options = {
        indexAxis:'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 },
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}시간`;
                    }
                },
                padding: 8,
            },
            title: {
                display: true,
                text: '이번 달 근무 시간 순위',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#333',
                padding: {
                    top: 10,
                    bottom: 20,
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#666',
                    font: { size: 13 },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: { size: 13 },
                    color: '#666',
                    stepSize: 10,
                },
                grid: {
                    color: '#eee',
                },
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg" style={{ height: '350px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default AttendanceBarChart;
