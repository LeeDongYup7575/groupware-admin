// Date formatters
export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  
  export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format a time-only string
  export const formatTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format duration between two dates (in hours and minutes)
  export const formatDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const durationMs = end - start;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes}분`;
    } else if (minutes === 0) {
      return `${hours}시간`;
    } else {
      return `${hours}시간 ${minutes}분`;
    }
  };
  
  // Format Korean phone number
  export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Format based on length
    if (digitsOnly.length === 11) {
      // Mobile: 010-XXXX-XXXX
      return digitsOnly.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (digitsOnly.length === 10) {
      // Mobile or Landline: 02-XXX-XXXX or 010-XXX-XXXX
      if (digitsOnly.startsWith('02')) {
        return digitsOnly.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      } else {
        return digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    } else if (digitsOnly.length === 9 && digitsOnly.startsWith('02')) {
      // Seoul Landline: 02-XXX-XXXX
      return digitsOnly.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
      // Return as is if it doesn't match any format
      return phoneNumber;
    }
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.substring(0, maxLength) + '...';
  };
  
  // Format Korean employee number (사원번호)
  export const formatEmpNum = (empNum) => {
    if (!empNum) return '';
    
    // Remove all non-digit characters
    const digitsOnly = empNum.replace(/\D/g, '');
    
    // Format: XXXX-XXX
    if (digitsOnly.length === 7) {
      return digitsOnly.replace(/(\d{4})(\d{3})/, '$1-$2');
    } else {
      // Return as is if it doesn't match the format
      return empNum;
    }
  };