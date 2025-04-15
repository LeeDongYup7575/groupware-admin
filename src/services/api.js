import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:80', // 스프링 부트 서버 주소 -> 각자 자기 포트에 맞게 수정해주세여. 아마 다들 80일듯
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키 전송 활성화 (인증 정보 포함)
});

// 요청 인터셉터 추가 - JWT 토큰 헤더에 추가
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API methods 
// 각자 자신이 구축한 서버 api에 get,post,delete ...등의 요청을 보내주시면 됩니다.
const apiService = {
    // DashBoard
    getDashboardData: async () => {
        const response = await api.get('/api/admin/dashboard');
        return response.data;
    },

    getDepartmentDistribution: async () => {
        const response = await api.get(`/api/admin/department-distribution`);
        return response.data;
    },

    getEmployeeStatus: async () => {
        const response = await api.get(`/api/admin/employee-status`);
        return response.data;
    },

    getAttendanceRanking: async () => {
        const response = await api.get(`/api/admin/attendance-ranking`);
        return response.data;
    },

    getTodayAbsences: async () => {
        const response = await api.get(`/api/admin/today-absences`);
        return response.data;
    },

    // Employee
    getEmployeeList: async (page = 1, size = 10, searchTerm = '', deptId = null, posId = null) => {
        const params = {page, size};

        if (searchTerm) params.searchTerm = searchTerm;
        if (deptId) params.deptId = deptId;
        if (posId) params.posId = posId;

        const response = await api.get('/api/admin/employees/list', {params});
        return response.data;
    },

    getEmployeeDetails: async (id) => {
        const response = await api.get(`/api/admin/employees/details/${id}`);
        return response.data;
    },

    updateEmployee: async (id, employeeData) => {
        const response = await api.put(`/api/admin/employees/details/${id}`, employeeData);
        return response.data;
    },

    deactivateEmployee: async (id) => {
        const response = await api.delete(`/api/admin/employees/details/${id}`);
        return response.data;
    },

    activateEmployee: async (id, currentEmployee) => {
        const response = await api.put(`/api/admin/employees/activate/${id}`);
        return response.data;
    },

    // Departments and Positions - 임직원 필터링용
    getDepartments: async () => {
        const response = await api.get('/api/admin/employees/departments');
        return response.data;
    },

    getPositions: async () => {
        const response = await api.get('/api/admin/employees/positions');
        return response.data;
    },

    // Bookings
    getBookingList: async () => {
        const response = await api.get('/api/admin/booking/list');
        return response.data;
    },

    deleteMeetingRoomBooking: async (id) => {
        const response = await api.delete(`/api/admin/booking/meeting-room/${id}`);
        return response.data;
    },

    deleteSuppliesBooking: async (id) => {
        const response = await api.delete(`/api/admin/booking/supplies/${id}`);
        return response.data;
    },

    // BoardList
    getBoardList: async () => {
        const response = await api.get(`/api/admin/boards/list`);
        return response.data;
    },

    updateBoardStatus: async (id, currentStatus) => {
        const response = await api.put(`/api/admin/boards/updateStatus/${id}`, {isActive: !currentStatus});
        return response.data;
    },

    // DepartmentPositionManage
    getManageDepartment: async () => {
        const response = await api.get('/api/admin/manage/department');
        return response.data;
    },

    getManagePosition: async () => {
        const response = await api.get('/api/admin/manage/position');
        return response.data;
    },

    addDepartment: async (name) => {
        const response = await api.put(`api/admin/manage/addDepartment/${name}`);
        return response.data;
    },
    deleteDepartment: async (ids) => {
        const response = await api.delete(`/api/admin/manage/deleteDepartment`,{params:{ids}});
        return response.data;
    }


    // addPosition : async(title) => {
    //     const response = await api.put(`api/admin/manage/addposition/${title}`);
    //     return response.data;
    // }
};

export default apiService;