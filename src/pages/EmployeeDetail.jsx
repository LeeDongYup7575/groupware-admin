import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import useEmployeeStore from '../store/employeeStore';
import { formatDate, formatPhoneNumber } from '../utils/formatters';
import '../styles/glassmorphism.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    currentEmployee, 
    isLoading, 
    error, 
    fetchEmployeeDetails, 
    updateEmployee, 
    deactivateEmployee,
    clearCurrentEmployee,
    departments,
    positions,
    fetchDepartments,
    fetchPositions
  } = useEmployeeStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    depId: '',
    posId: '',
    role: '',
    enabled: true
  });
  
  useEffect(() => {
    // Fetch data when component mounts
    fetchEmployeeDetails(id);
    fetchDepartments();
    fetchPositions();
    
    // Clear employee data when component unmounts
    return () => clearCurrentEmployee();
  }, [id]);
  
  // Update form data when employee data is loaded
  useEffect(() => {
    if (currentEmployee) {
      setFormData({
        id: currentEmployee.id,
        name: currentEmployee.name || '',
        email: currentEmployee.email || '',
        phone: currentEmployee.phone || '',
        depId: currentEmployee.depId || '',
        posId: currentEmployee.posId || '',
        role: currentEmployee.role || 'ROLE_USER',
        enabled: currentEmployee.enabled !== undefined ? currentEmployee.enabled : true
      });
    }
  }, [currentEmployee]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await updateEmployee(id, formData);
    
    if (result.success) {
      setIsEditing(false);
    }
  };
  
  const handleDeactivate = async () => {
    // Show confirm dialog
    if (!window.confirm('정말로 이 직원을 비활성화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }
    
    const result = await deactivateEmployee(id);
    
    if (result.success) {
      navigate('/employees');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex-1 ml-64 bg-gray-50 p-8 flex justify-center items-center">
        <div className="loading-spinner"></div>
        <span className="ml-3">직원 정보를 불러오는 중...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex-1 ml-64 bg-gray-50 p-8">
        <div className="glass-card p-6 bg-red-50">
          <h2 className="text-red-600 font-medium">오류 발생</h2>
          <p className="text-red-500">{error}</p>
          <div className="mt-4 flex space-x-3">
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => navigate('/employees')}
            >
              <FiArrowLeft className="inline mr-2" /> 목록으로 돌아가기
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => fetchEmployeeDetails(id)}
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentEmployee) {
    return (
      <div className="flex-1 ml-64 bg-gray-50 p-8 flex justify-center items-center">
        <div className="glass-card p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">직원 정보를 찾을 수 없습니다</h2>
          <p className="text-gray-500 mb-4">요청하신 직원 정보가 존재하지 않거나 접근 권한이 없습니다.</p>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
            onClick={() => navigate('/employees')}
          >
            <FiArrowLeft className="inline mr-2" /> 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 ml-64 bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={() => navigate('/employees')}
          >
            <FiArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">직원 상세 정보</h1>
        </div>
        
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                className="glass-btn px-4 py-2 text-gray-700 rounded-lg flex items-center"
                onClick={() => setIsEditing(false)}
              >
                <FiX className="mr-1" /> 취소
              </button>
              <button
                className="glass-btn px-4 py-2 bg-indigo-500 text-white rounded-lg flex items-center"
                onClick={handleSubmit}
              >
                <FiSave className="mr-1" /> 저장
              </button>
            </>
          ) : (
            <>
              <button
                className="glass-btn px-4 py-2 text-gray-700 rounded-lg flex items-center"
                onClick={() => setIsEditing(true)}
              >
                <FiEdit className="mr-1" /> 수정
              </button>
              <button
                className="glass-btn px-4 py-2 bg-red-500 text-white rounded-lg flex items-center"
                onClick={handleDeactivate}
                disabled={!currentEmployee.enabled}
              >
                <FiTrash2 className="mr-1" /> 비활성화
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="glass-card p-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img
                src={currentEmployee.profileImgUrl || "/assets/images/default-profile.png"}
                alt={currentEmployee.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{currentEmployee.name}</h2>
            <p className="text-gray-500">{currentEmployee.positionTitle}</p>
            <p className="text-gray-500">{currentEmployee.departmentName}</p>
            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              currentEmployee.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {currentEmployee.enabled ? "활성 계정" : "비활성 계정"}
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <div>
              <p className="text-sm text-gray-500">사번</p>
              <p className="font-medium">{currentEmployee.empNum}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">입사일</p>
              <p className="font-medium">{formatDate(currentEmployee.hireDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">마지막 로그인</p>
              <p className="font-medium">{currentEmployee.lastLogin ? new Date(currentEmployee.lastLogin).toLocaleString('ko-KR') : '로그인 기록 없음'}</p>
            </div>
          </div>
        </div>
        
        {/* Employee Information Form */}
        <div className="glass-card p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">직원 정보 {isEditing ? '수정' : ''}</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    disabled={!isEditing}
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{currentEmployee.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    disabled={!isEditing}
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{currentEmployee.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    disabled={!isEditing}
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{formatPhoneNumber(currentEmployee.phone)}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내부 이메일</label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg">
                  {currentEmployee.internalEmail || '없음'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                {isEditing ? (
                  <select
                    name="depId"
                    value={formData.depId}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    disabled={!isEditing}
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{currentEmployee.departmentName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
                {isEditing ? (
                  <select
                    name="posId"
                    value={formData.posId}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    disabled={!isEditing}
                  >
                    {positions.map((pos) => (
                      <option key={pos.id} value={pos.id}>{pos.title}</option>
                    ))}
                  </select>
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{currentEmployee.positionTitle}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">권한</label>
                {isEditing ? (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    disabled={!isEditing}
                  >
                    <option value="ROLE_USER">일반 사용자</option>
                    <option value="ROLE_ADMIN">관리자</option>
                  </select>
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {currentEmployee.role === 'ROLE_ADMIN' ? '관리자' : '일반 사용자'}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">계정 상태</label>
                {isEditing ? (
                  <div className="px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="enabled"
                        checked={formData.enabled}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-indigo-600"
                        disabled={!isEditing}
                      />
                      <span className="ml-2">활성화</span>
                    </label>
                  </div>
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {currentEmployee.enabled ? '활성화' : '비활성화'}
                  </p>
                )}
              </div>
            </div>
            
            {/* More employee details here */}
            <div className="mt-6">
              <h4 className="text-md font-medium mb-2">휴가 정보</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연차 총 일수</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {currentEmployee.totalLeave || 0}일
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">사용 연차</label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {currentEmployee.usedLeave || 0}일
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;