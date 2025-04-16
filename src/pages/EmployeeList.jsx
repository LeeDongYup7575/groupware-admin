import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiRefreshCw, FiChevronLeft, FiChevronRight, FiUserPlus } from 'react-icons/fi';
import useEmployeeStore from '../store/employeeStore';
import { formatPhoneNumber, formatEmpNum } from '../utils/formatters';
import '../styles/glassmorphism.css';
import EmployeeAdd from '../components/EmployeeAdd';

const EmployeeList = () => {
  const navigate = useNavigate();
  const { 
    employees, 
    totalPages, 
    currentPage, 
    isLoading, 
    error, 
    fetchEmployees,
    fetchDepartments,
    fetchPositions,
    departments,
    positions
  } = useEmployeeStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedPosId, setSelectedPosId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchEmployees(1);
    fetchDepartments();
    fetchPositions();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(1, 10, searchTerm, selectedDeptId || null, selectedPosId || null);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedDeptId('');
    setSelectedPosId('');
    fetchEmployees(1);
  };

  const handlePageChange = (page) => {
    fetchEmployees(page, 10, searchTerm, selectedDeptId || null, selectedPosId || null);
  };

  const handleRowClick = (id) => {
    navigate(`/employees/${id}`);
  };

  const handleEmployeeAdded = () => {
    // 직원이 추가되면 목록 다시 불러오기
    fetchEmployees(currentPage, 10, searchTerm, selectedDeptId || null, selectedPosId || null);
  };

  return (
    <div className="flex-1 ml-64 bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">임직원 관리</h1>
      </div>

      <div className="glass-card p-6 mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">검색어</label>
            <div className="relative">
              <input
                type="text"
                placeholder="이름, 사번, 이메일로 검색"
                className="glass-input w-full px-4 py-2 pl-10 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
            <select
              className="glass-input w-full px-4 py-2 rounded-lg"
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
            >
              <option value="">전체 부서</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
            <select
              className="glass-input w-full px-4 py-2 rounded-lg"
              value={selectedPosId}
              onChange={(e) => setSelectedPosId(e.target.value)}
            >
              <option value="">전체 직급</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.title}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4 flex justify-end space-x-3">
         
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center"
              onClick={handleReset}
            >
              <FiRefreshCw className="mr-2" /> 초기화
            </button>
            <button
              type="button"
              className="glass-btn px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              onClick={() => setShowAddModal(true)}
            >
              <FiUserPlus className="mr-2" /> 추가
            </button>
            <button
              type="submit"
              className="glass-btn px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              검색
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Employees Table */}
      <div className="glass-card overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="loading-spinner"></div>
            <span className="ml-3">임직원 정보를 불러오는 중...</span>
          </div>
        ) : employees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            임직원 정보가 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
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
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    전화번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(employee.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatEmpNum(employee.empNum)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 mr-3 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={employee.profileImgUrl || "/assets/images/default-profile.png"}
                            alt={employee.name}
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.departmentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.positionTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPhoneNumber(employee.phone)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.enabled
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.enabled ? "활성" : "비활성"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              총 {totalPages} 페이지 중 {currentPage} 페이지
            </div>
            <div className="flex space-x-2">
              <button
                className={`p-2 rounded-md ${
                  currentPage <= 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FiChevronLeft size={18} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = currentPage - 2 + i;
                
                // Show pages around current page
                if (pageNumber < 1 || pageNumber > totalPages) return null;
                
                return (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded-md ${
                      pageNumber === currentPage
                        ? "bg-indigo-500 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                className={`p-2 rounded-md ${
                  currentPage >= totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 직원 추가 모달 */}
      {showAddModal && (
        <EmployeeAdd
          onClose={() => setShowAddModal(false)}
          onEmployeeAdded={handleEmployeeAdded}
        />
      )}
    </div>
  );
};

export default EmployeeList;