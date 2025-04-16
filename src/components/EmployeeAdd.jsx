import React, { useState, useEffect } from 'react';
import { FiSave, FiXCircle } from 'react-icons/fi';
import axios from 'axios';

const EmployeeAdd = ({ onClose, onEmployeeAdded }) => {
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    empNum: '',
    name: '',
    email: '',
    phone: '',
    ssn: '',
    depId: '',
    posId: '',
    gender: '',
    role: 'ROLE_USER',
    enabled: true,
    hireDate: new Date().toISOString().split('T')[0]
  });

  // Fetch departments and positions on component mount
  useEffect(() => {
    const fetchDepartmentsAndPositions = async () => {
      try {
        const [deptResponse, posResponse] = await Promise.all([
          axios.get('/api/admin/employees/departments'),
          axios.get('/api/admin/employees/positions')
        ]);
        
        setDepartments(deptResponse.data);
        setPositions(posResponse.data);
      } catch (err) {
        setError('부서 및 직급 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching data:', err);
      }
    };

    fetchDepartmentsAndPositions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Form validation
      if (!formData.name || !formData.empNum || !formData.email || !formData.ssn || 
          !formData.depId || !formData.posId || !formData.gender) {
        throw new Error('필수 항목을 모두 입력해주세요.');
      }

      // API call to add employee
      const response = await axios.post('/api/admin/employees/add', formData);
      
      setLoading(false);
      if (response.data.success) {
        // Notify parent component that employee was added
        onEmployeeAdded(response.data.employee);
        onClose();
      } else {
        setError(response.data.message || '직원 추가에 실패했습니다.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || '직원 추가 중 오류가 발생했습니다.');
      console.error('Error adding employee:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">직원 추가</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiXCircle size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 사원번호 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                사원번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="empNum"
                value={formData.empNum}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="사원번호"
                required
              />
            </div>

            {/* 이름 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="이름"
                required
              />
            </div>

            {/* 성별 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                성별 <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">선택</option>
                <option value="남">남</option>
                <option value="여">여</option>
              </select>
            </div>

            {/* 주민등록번호 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주민등록번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="주민등록번호 (예: 000000-0000000)"
                required
              />
            </div>

            {/* 이메일 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="이메일"
                required
              />
            </div>

            {/* 전화번호 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                전화번호
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="전화번호 (예: 010-0000-0000)"
              />
            </div>

            {/* 부서 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                부서 <span className="text-red-500">*</span>
              </label>
              <select
                name="depId"
                value={formData.depId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">부서 선택</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 직급 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                직급 <span className="text-red-500">*</span>
              </label>
              <select
                name="posId"
                value={formData.posId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">직급 선택</option>
                {positions.map(pos => (
                  <option key={pos.id} value={pos.id}>
                    {pos.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 입사일 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                입사일 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* 권한 */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                권한
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="ROLE_USER">일반 사용자</option>
                <option value="ROLE_ADMIN">관리자</option>
              </select>
            </div>

            {/* 활성화 상태 */}
            <div className="form-group flex items-center">
              <input
                type="checkbox"
                name="enabled"
                checked={formData.enabled}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm font-medium text-gray-700">
                활성화
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="glass-btn px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  저장 중...
                </span>
              ) : (
                <span className="flex items-center">
                  <FiSave className="mr-2" /> 저장
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAdd;