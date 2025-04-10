import { create } from 'zustand';
import apiService from '../services/api';

const useBookingStore = create((set, get) => ({
  meetingRoomBookings: [],
  suppliesBookings: [],
  isLoading: false,
  error: null,
  
  fetchAllBookings: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const data = await apiService.getBookingList();
      
      set({ 
        meetingRoomBookings: data.meetingRoomBookings || [],
        suppliesBookings: data.suppliesBookings || [],
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || '예약 목록을 불러오는 중 오류가 발생했습니다.' 
      });
    }
  },
  
  deleteMeetingRoomBooking: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      await apiService.deleteMeetingRoomBooking(id);
      
      const meetingRoomBookings = get().meetingRoomBookings.filter(booking => booking.id !== id);
      
      set({ 
        meetingRoomBookings,
        isLoading: false 
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting meeting room booking:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || '회의실 예약 취소 중 오류가 발생했습니다.' 
      });
      return { success: false, error: error.response?.data?.message || error.message };
    }
  },
  
  deleteSuppliesBooking: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      await apiService.deleteSuppliesBooking(id);
      
      const suppliesBookings = get().suppliesBookings.filter(booking => booking.id !== id);
      
      set({ 
        suppliesBookings,
        isLoading: false 
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting supplies booking:', error);
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || '비품 예약 취소 중 오류가 발생했습니다.' 
      });
      return { success: false, error: error.response?.data?.message || error.message };
    }
  },
}));

export default useBookingStore;