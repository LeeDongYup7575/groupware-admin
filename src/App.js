// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import EmployeeList from './pages/EmployeeList';
// import EmployeeDetail from './pages/EmployeeDetail';
// import BookingList from './pages/BookingList';
// import Sidebar from './components/Sidebar';
// import useAuthStore from './store/authStore';
// import './App.css';
// import './styles/glassmorphism.css';

// function App() {
//   const { isAuthenticated, isLoading, initAuth } = useAuthStore();
//   const [isInitialized, setIsInitialized] = useState(false);
  
//   useEffect(() => {
//     // Initialize authentication state from stored tokens
//     initAuth();
//     setIsInitialized(true);
//   }, []);
  
//   if (!isInitialized) {
//     return (
//       <div className="app-gradient flex items-center justify-center h-screen">
//         <div className="loading-spinner"></div>
//         <span className="ml-3 text-gray-700">앱을 초기화하는 중...</span>
//       </div>
//     );
//   }
  
//   return (
//     <Router>
//       <div className="app-gradient flex min-h-screen">
//         {isAuthenticated && <Sidebar />}
        
//         <Routes>
//           {isAuthenticated ? (
//             <>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/employees" element={<EmployeeList />} />
//               <Route path="/employees/:id" element={<EmployeeDetail />} />
//               <Route path="/bookings" element={<BookingList />} />
              
//               {/* Redirect any unknown routes to the dashboard */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </>
//           ) : (
//             <>
//               {/* Login Page (placeholder for now, replace with your actual login component) */}
//               <Route path="/" element={
//                 <div className="w-full flex items-center justify-center min-h-screen">
//                   <div className="glass-card p-8 w-full max-w-md">
//                     <h1 className="text-2xl font-bold text-center mb-6">그룹웨어 관리자 시스템</h1>
//                     <LoginForm />
//                   </div>
//                 </div>
//               } />
              
//               {/* Redirect any other routes to the login page */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // Simple login form component
// const LoginForm = () => {
//   const [empNum, setEmpNum] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login, isLoading } = useAuthStore();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!empNum || !password) {
//       setError('사원번호와 비밀번호를 입력해주세요.');
//       return;
//     }
    
//     const result = await login(empNum, password);
    
//     if (!result.success) {
//       setError(result.error || '로그인에 실패했습니다.');
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
//           {error}
//         </div>
//       )}
      
//       <div>
//         <label htmlFor="empNum" className="block text-sm font-medium text-gray-700 mb-1">
//           사원번호
//         </label>
//         <input
//           id="empNum"
//           type="text"
//           value={empNum}
//           onChange={(e) => setEmpNum(e.target.value)}
//           className="glass-input w-full px-4 py-2 rounded-lg"
//           placeholder="사원번호를 입력하세요"
//           disabled={isLoading}
//         />
//       </div>
      
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//           비밀번호
//         </label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="glass-input w-full px-4 py-2 rounded-lg"
//           placeholder="비밀번호를 입력하세요"
//           disabled={isLoading}
//         />
//       </div>
      
//       <div>
//         <button
//           type="submit"
//           className="glass-btn w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <span className="loading-spinner inline-block mr-2"></span>
//               로그인 중...
//             </>
//           ) : (
//             '로그인'
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import BookingList from './pages/BookingList';
import Sidebar from './components/Sidebar';
import './App.css';
import './styles/glassmorphism.css';

function App() {
  // 로그인 없이 항상 인증된 상태로 가정
  const isAuthenticated = true;
  
  return (
    <Router>
      <div className="app-gradient flex min-h-screen">
        {isAuthenticated && <Sidebar />}
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/bookings" element={<BookingList />} />
          
          {/* 나머지 경로 여기에 추가해주세요..~ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;