import React, {useEffect, useState} from 'react';
import {FiUsers, FiCalendar, FiPackage, FiClock} from 'react-icons/fi';
import apiService from '../services/api';
import DashboardCard from '../components/DashboardCard';
import {useNavigate} from 'react-router-dom';
import '../styles/glassmorphism.css';
import AttendanceBarChart from '../components/AttendanceBarChart';
import DepartmentPieChart from '../components/DepartmentPieChart';
import EmployeeStatusChart from '../components/EmployeeStatusChart';
import TodayAbsenceChart from '../components/TodayAbsenceChart';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalEmployees: 0,
        todayMeetingRoomBookings: 0,
        todaySuppliesBookings: 0,
        recentEmployees: [],
    });
    // 차트 데이터 담을 상태 변수
    const [departmentData, setDepartmentData] = useState([]);
    const [attendanceRanking, setAttendanceRanking] = useState([]);
    const [employeeStatus, setEmployeeStatus] = useState([]);
    const [todayAbsence, setTodayAbsence] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                // const data = await apiService.getDashboardData();
                // setDashboardData(data);

                const [departmentResp, attendanceResp, employeeStatusResp, todayAbsenceResp] = await Promise.all([apiService.getDepartmentDistribution(), apiService.getAttendanceRanking(), apiService.getEmployeeStatus(), apiService.getTodayAbsences()]);

                setDepartmentData(departmentResp || []);
                setAttendanceRanking(attendanceResp || []);
                setEmployeeStatus(employeeStatusResp || []);
                setTodayAbsence(todayAbsenceResp || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('대시보드 데이터를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex-1 ml-64 bg-gray-50 p-8 flex justify-center items-center">
                <div className="loading-spinner"></div>
                <span className="ml-3">데이터를 불러오는 중...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 ml-64 bg-gray-50 p-8">
                <div className="glass-card p-6 bg-red-50">
                    <h2 className="text-red-600 font-medium">오류 발생</h2>
                    <p className="text-red-500">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 ml-64 bg-gray-50 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">대시보드</h1>

            {/* 상단에 출력되는 카드 형식의 총계인데,,,, 필요에 따라서 navigate경로와 데이터 바꿔서 출력하면 될 것 같습니다! */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <DashboardCard
                    title="전체 임직원"
                    value={dashboardData.totalEmployees}
                    icon={<FiUsers size={24}/>}
                    color="blue"
                    onClick={() => navigate('/employees')}
                />

                <DashboardCard
                    title="오늘 회의실 예약"
                    value={dashboardData.todayMeetingRoomBookings}
                    icon={<FiCalendar size={24}/>}
                    color="green"
                    onClick={() => navigate('/bookings')}
                />

                <DashboardCard
                    title="오늘 비품 예약"
                    value={dashboardData.todaySuppliesBookings}
                    icon={<FiPackage size={24}/>}
                    color="purple"
                    onClick={() => navigate('/bookings')}
                />
            </div>

            {/* 최근 로그인한 임직원 + 근태 순위로 보여줄 수 있도록 추가 부탁드려요!! */}
            <div className="glass-card p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">최근 로그인한 임직원</h2>

                {dashboardData.recentEmployees && dashboardData.recentEmployees.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    사번
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    이름
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    부서
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    직급
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    마지막 로그인
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {dashboardData.recentEmployees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => navigate(`/employees/${employee.id}`)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {employee.empNum}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{employee.departmentName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{employee.positionTitle}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(employee.lastLogin).toLocaleString('ko-KR')}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">최근 로그인한 임직원이 없습니다.</p>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">부서별 인원 분포</h2>
                    <DepartmentPieChart data={departmentData} />
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">임직원 현황</h2>
                    <EmployeeStatusChart data={employeeStatus} />
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">근무 시간 순위</h2>
                    <AttendanceBarChart data={attendanceRanking} />
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">오늘 결근 수</h2>
                    <TodayAbsenceChart data={todayAbsence} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;