import React from 'react';
import { FiTrash2, FiInfo } from 'react-icons/fi';
import { formatDateTime, formatTime, formatDuration } from '../utils/formatters';
import '../styles/glassmorphism.css';

const BookingTable = ({ bookings, bookingType, onDelete }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-gray-500">예약 정보가 없습니다.</p>
      </div>
    );
  }
  
  return (
    <div className="glass-table w-full overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="px-4 py-3 font-medium">예약자</th>
            <th className="px-4 py-3 font-medium">부서</th>
            <th className="px-4 py-3 font-medium">
              {bookingType === 'meetingRoom' ? '회의실' : '비품'}
            </th>
            <th className="px-4 py-3 font-medium">날짜 및 시간</th>
            <th className="px-4 py-3 font-medium">목적</th>
            <th className="px-4 py-3 font-medium">상태</th>
            <th className="px-4 py-3 font-medium">관리</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-blue-50">
              <td className="px-4 py-3">{booking.empName}</td>
              <td className="px-4 py-3">{booking.deptName}</td>
              <td className="px-4 py-3">
                {bookingType === 'meetingRoom' 
                  ? booking.roomName 
                  : `${booking.supplyName} (${booking.quantity}개)`}
              </td>
              <td className="px-4 py-3">
                <div>{formatDateTime(booking.start).split(' ')[0]}</div>
                <div className="text-sm text-gray-500">
                  {`${formatTime(booking.start)} ~ ${formatTime(booking.end)}`}
                  <span className="ml-1 text-xs">
                    ({formatDuration(booking.start, booking.end)})
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 max-w-xs truncate">
                {booking.purpose || booking.title || '-'}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                  booking.bookingStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.bookingStatus === 'CONFIRMED' ? '예약 확정' : 
                   booking.bookingStatus === 'CANCELLED' ? '취소됨' : 
                   '대기 중'}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <button 
                    className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                    onClick={() => onDelete(booking.id)}
                    title="예약 취소"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;