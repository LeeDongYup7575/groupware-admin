// import { create } from 'zustand';

// const useAuthStore = create((set) => ({
//   // Initial state
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   error: null,
  
//   // Initialize authentication state from server
//   initAuth: async () => {
//     set({ isLoading: true });
//     try {
//       // Try the admin endpoint first
//       let response = await fetch('/api/admin/current-user', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include cookies for authentication
//       });
      
//       // If admin endpoint fails, try the regular user endpoint
//       if (!response.ok) {
//         response = await fetch('/api/auth/current-user', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });
        
//         if (!response.ok) {
//           throw new Error('Authentication failed');
//         }
//       }
      
//       const userData = await response.json();
//       set({ 
//         user: userData, 
//         isAuthenticated: true, 
//         isLoading: false,
//         error: null 
//       });
      
//       return { success: true };
//     } catch (error) {
//       set({ 
//         user: null, 
//         isAuthenticated: false, 
//         isLoading: false,
//         error: error.message 
//       });
      
//       return { success: false, error: error.message };
//     }
//   },
  
//   // Login functionality 
//   login: async (credentials) => {
//     set({ isLoading: true });
//     try {
//       // You could implement your login logic here
//       // But for admin portal, we're using the existing auth session
      
//       const userData = await fetch('/api/auth/current-user').then(res => res.json());
//       set({ 
//         user: userData, 
//         isAuthenticated: true, 
//         isLoading: false,
//         error: null 
//       });
      
//       return { success: true };
//     } catch (error) {
//       set({ 
//         isLoading: false,
//         error: error.message 
//       });
      
//       return { success: false, error: error.message };
//     }
//   },
  
//   // Navigate back to main groupware page
//   goToGroupware: () => {
//     // Redirect to the main Thymeleaf template page
//     window.location.href = '/main';
    
//     // If the redirect doesn't work, try with an absolute URL
//     // This ensures we break out of any client-side routing
//     setTimeout(() => {
//       if (window.location.pathname.includes('admin')) {
//         window.location.replace('/main');
//       }
//     }, 100);
//   },
// }));

// export default useAuthStore;

import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  
  initAuth: async () => {
    set({ isLoading: true });
    try {
      let response = await fetch('/api/admin/current-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함하여 사용자 인증하기
      });
      
      if (!response.ok) {
        response = await fetch('/api/auth/current-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
      }
      
      const userData = await response.json();
      set({ 
        user: userData, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
      
      return { success: true };
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: error.message 
      });
      
      return { success: false, error: error.message };
    }
  },
  
  // Login functionality 
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      // You could implement your login logic here
      // But for admin portal, we're using the existing auth session
      
      const userData = await fetch('/api/auth/current-user').then(res => res.json());
      set({ 
        user: userData, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
      
      return { success: true };
    } catch (error) {
      set({ 
        isLoading: false,
        error: error.message 
      });
      
      return { success: false, error: error.message };
    }
  },
  
  goToGroupware: () => {
    
    try {
      window.location.replace('/main');
      
      setTimeout(() => {
        if (window.location.pathname.includes('admin')) {
          window.location.href = '/main';
          
          setTimeout(() => {
            if (window.location.pathname.includes('admin')) {
              const form = document.createElement('form');
              form.method = 'GET';
              form.action = '/main';
              document.body.appendChild(form);
              form.submit();
            }
          }, 100);
        }
      }, 100);
    } catch (e) {
      console.error('Navigation error:', e);
      window.location = '/main';
    }
  },
}));

export default useAuthStore;