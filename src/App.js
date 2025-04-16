import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import Sidebar from './components/Sidebar';
import BoardList from './pages/BoardList';
import DepartmentPositionManageMent from './pages/DepartmentPositionManage';
import './App.css';
import './styles/glassmorphism.css';

function App() {
  // 로그인 없이 항상 인증된 상태로 가정
  const isAuthenticated = true;
  
  return (
    <Router basename='/admin'>
      <div className="app-gradient flex min-h-screen">
        {isAuthenticated && <Sidebar />}
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/boards" element={<BoardList/>}/>
          <Route path="/departmentpositionmanagement" element={<DepartmentPositionManageMent/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;