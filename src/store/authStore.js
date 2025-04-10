// import { create } from 'zustand';
// import apiService from '../services/api';

// const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
  
//   // Check if the user is already authenticated on app load
//   initAuth: () => {
//     const accessToken = localStorage.getItem('accessToken');
//     const user = JSON.parse(localStorage.getItem('user'));
    
//     if (accessToken && user) {
//       set({ user, isAuthenticated: true });
//     }
//   },
  
//   // Login user
//   login: async (empNum, password) => {
//     set({ isLoading: true, error: null });
    
//     try {
//       const response = await apiService.login(empNum, password);
      
//       // Check if the user is an admin
//       if (response.role !== 'ROLE_ADMIN') {
//         throw new Error('관리자 권한이 없습니다.');
//       }
      
//       // Store tokens in localStorage
//       localStorage.setItem('accessToken', response.accessToken);
//       localStorage.setItem('refreshToken', response.refreshToken);
      
//       // Store user info
//       const user = {
//         id: response.id,
//         empNum: response.empNum,
//         name: response.name,
//         email: response.email,
//         role: response.role,
//         departmentName: response.departmentName,
//         positionTitle: response.positionTitle,
//       };
      
//       localStorage.setItem('user', JSON.stringify(user));
      
//       set({ user, isAuthenticated: true, isLoading: false });
//       return { success: true };
//     } catch (error) {
//       console.error('Login error:', error);
//       set({ 
//         isLoading: false, 
//         error: error.response?.data?.message || error.message || '로그인 중 오류가 발생했습니다.' 
//       });
//       return { success: false, error: error.response?.data?.message || error.message };
//     }
//   },
  
//   // Logout user
//   logout: () => {
//     // Remove tokens and user data from localStorage
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
    
//     set({ user: null, isAuthenticated: false });
//   },
// }));

// export default useAuthStore;

import { create } from 'zustand';

// 더미 인증 상태를 제공하는 스토어
const useAuthStore = create((set) => ({
  // 기본값으로 관리자로 인증된 상태로 설정
  user: {
    id: 1,
    empNum: '2024-001',
    name: '홍길동',
    email: 'hong@techx.kro.kr',
    role: 'ROLE_ADMIN',
    departmentName: '개발팀',
    positionTitle: '책임 개발자',
  },
  isAuthenticated: true,
  isLoading: false,
  error: null,
  
  // 아무것도 하지 않는 기능들 (더미)
  initAuth: () => {},
  login: async () => ({ success: true }),
  logout: () => {},
}));

export default useAuthStore;