import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8082', // 스프링 부트 서버 주소
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
const apiService = {
  // Dashboard
  getDashboardData: async () => {
    const response = await api.get('/api/admin/dashboard');
    return response.data;
  },
  
  // Employees
  getEmployeeList: async (page = 1, size = 10, searchTerm = '', deptId = null, posId = null) => {
    const params = { page, size };
    
    if (searchTerm) params.searchTerm = searchTerm;
    if (deptId) params.deptId = deptId;
    if (posId) params.posId = posId;
    
    const response = await api.get('/api/admin/employees/list', { params });
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
  
  // Departments and Positions (for dropdowns)
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
};

export default apiService;