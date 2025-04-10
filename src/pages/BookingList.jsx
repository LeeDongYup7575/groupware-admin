import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { FiCalendar, FiPackage, FiRefreshCw } from 'react-icons/fi';
import BookingTable from '../components/BookingTable';
import useBookingStore from '../store/bookingStore';
import '../styles/glassmorphism.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BookingList = () => {
  const { 
    meetingRoomBookings, 
    suppliesBookings, 
    isLoading, 
    error, 
    fetchAllBookings,
    deleteMeetingRoomBooking,
    deleteSuppliesBooking
  } = useBookingStore();
  
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  
  useEffect(() => {
    fetchAllBookings();
  }, []);
  
  const handleMeetingRoomDelete = async (id) => {
    if (window.confirm('이 회의실 예약을 취소하시겠습니까?')) {
      const result = await deleteMeetingRoomBooking(id);
      if (result.success) {
        alert('회의실 예약이 취소되었습니다.');
      } else {
        alert(`오류 발생: ${result.error}`);
      }
    }
  };
  
  const handleSuppliesDelete = async (id) => {
    if (window.confirm('이 비품 예약을 취소하시겠습니까?')) {
      const result = await deleteSuppliesBooking(id);
      if (result.success) {
        alert('비품 예약이 취소되었습니다.');
      } else {
        alert(`오류 발생: ${result.error}`);
      }
    }
  };
  
  const handleRefresh = () => {
    fetchAllBookings();
  };
  
  return (
    <div className="flex-1 ml-64 bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">예약 관리</h1>
        <button
          className="flex items-center glass-btn px-4 py-2 rounded-lg"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <FiRefreshCw className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          새로고침
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="glass-card p-6">
        <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-50 p-1 mb-6">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all',
                  'flex items-center justify-center',
                  selected
                    ? 'bg-white shadow text-blue-700'
                    : 'text-gray-500 hover:bg-white/[0.3] hover:text-blue-600'
                )
              }
            >
              <FiCalendar className="mr-2" size={18} />
              회의실 예약 ({meetingRoomBookings.length})
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all',
                  'flex items-center justify-center',
                  selected
                    ? 'bg-white shadow text-blue-700'
                    : 'text-gray-500 hover:bg-white/[0.3] hover:text-blue-600'
                )
              }
            >
              <FiPackage className="mr-2" size={18} />
              비품 예약 ({suppliesBookings.length})
            </Tab>
          </Tab.List>
          
          <Tab.Panels>
            <Tab.Panel>
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <div className="loading-spinner"></div>
                  <span className="ml-3">회의실 예약 정보를 불러오는 중...</span>
                </div>
              ) : (
                <BookingTable 
                  bookings={meetingRoomBookings} 
                  bookingType="meetingRoom" 
                  onDelete={handleMeetingRoomDelete} 
                />
              )}
            </Tab.Panel>
            
            <Tab.Panel>
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <div className="loading-spinner"></div>
                  <span className="ml-3">비품 예약 정보를 불러오는 중...</span>
                </div>
              ) : (
                <BookingTable 
                  bookings={suppliesBookings} 
                  bookingType="supplies" 
                  onDelete={handleSuppliesDelete} 
                />
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default BookingList;