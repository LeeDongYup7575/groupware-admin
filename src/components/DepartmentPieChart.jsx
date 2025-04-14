import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentPieChart = ({ data }) => {
    const hasNoData = !data || data.length === 0 || data.every(d => d.count === 0);

    if (hasNoData) {
        return (
            <div className="p-4 bg-white rounded-2xl shadow-lg flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg font-semibold">부서별 인원 데이터가 없습니다 🏢</p>
            </div>
        );
    }

    const chartData = {
        labels: data.map((d) => d.name),
        datasets: [
            {
                label: '부서별 인원수',
                data: data.map((d) => d.count),
                backgroundColor: [
                    '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#EC407A', '#FF7043', '#29B6F6', '#D4E157'
                ],
                borderColor: '#fff',
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#555',
                    font: { size: 14 },
                    padding: 20,
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 },
                padding: 10,
                borderColor: '#ccc',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}명`;
                    }
                }
            }
        }
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default DepartmentPieChart;
