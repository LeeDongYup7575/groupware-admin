import { create } from 'zustand';
import apiService from '../services/api';

const useEmployeeStore = create((set, get) => ({
  employees: [],
  currentEmployee: null,
  departments: [],
  positions: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  
  // Fetch employees list with pagination
  fetchEmployees: async (page = 1, size = 10, searchTerm = '', deptId = null, posId = null) => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await apiService.getEmployeeList(page, size, searchTerm, deptId, posId);
      
      set({ 
        employees: data.employees || [],
        totalPages: data.totalPages || 0,
        currentPage: data.currentPage || 1,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || '직원 목록을 불러오는 중 오류가 발생했습니다.' 
      });
    }
  },
  
  // Fetch employee details
  fetchEmployeeDetails: async (id) => {
    set({ isLoading: true, error: null, currentEmployee: null });
    
    try {
      const employee = await apiService.getEmployeeDetails(id);
      set({ currentEmployee: employee, isLoading: false });
    } catch (error) {
      console.error('Error fetching employee details:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || '직원 정보를 불러오는 중 오류가 발생했습니다.' 
      });
    }
  },
  
  // Update employee
  updateEmployee: async (id, employeeData) => {
    set({ isLoading: true, error: null });
    
    try {
      const updatedEmployee = await apiService.updateEmployee(id, employeeData);
      
      // Update the employees list if the updated employee is in the list
      const employees = get().employees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      );
      
      set({ 
        employees,
        currentEmployee: updatedEmployee,
        isLoading: false 
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error updating employee:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || '직원 정보 업데이트 중 오류가 발생했습니다.' 
      });
      return { success: false, error: error.response?.data?.message || error.message };
    }
  },
  
  // Deactivate employee
  deactivateEmployee: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      await apiService.deactivateEmployee(id);
      
      // Remove the deactivated employee from the list
      const employees = get().employees.filter(emp => emp.id !== id);
      
      set({ 
        employees,
        currentEmployee: null,
        isLoading: false 
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error deactivating employee:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || '직원 비활성화 중 오류가 발생했습니다.' 
      });
      return { success: false, error: error.response?.data?.message || error.message };
    }
  },
  
  // Fetch departments (for filtering)
  fetchDepartments: async () => {
    try {
      const departments = await apiService.getDepartments();
      set({ departments });
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  },
  
  // Fetch positions (for filtering)
  fetchPositions: async () => {
    try {
      const positions = await apiService.getPositions();
      set({ positions });
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  },
  
  // Clear current employee (when leaving detail page)
  clearCurrentEmployee: () => {
    set({ currentEmployee: null });
  },
}));

export default useEmployeeStore;