import axios from 'axios';
const API_URL = 'https://smart-waste-management-n9yk.onrender.com/api';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

export const reportAPI = {
  create: (data) => api.post('/reports', data),
  getAll: (params) => api.get('/reports', { params }),
  getById: (id) => api.get(`/reports/${id}`),
  update: (id, data) => api.put(`/reports/${id}`, data),
  delete: (id) => api.delete(`/reports/${id}`),
  getNearby: (params) => api.get('/reports/nearby', { params }),
};

export const scheduleAPI = {
  getAll: (params) => api.get('/schedules', { params }),
  getById: (id) => api.get(`/schedules/${id}`),
  getToday: () => api.get('/schedules/today'),
  create: (data) => api.post('/schedules', data),
  update: (id, data) => api.put(`/schedules/${id}`, data),
  delete: (id) => api.delete(`/schedules/${id}`),
};

export const adminAPI = {
  // Dashboard Stats
  getStats: () => api.get('/admin/stats'),
  // ADD these 3 methods to adminAPI:
getAllSchedules: () => api.get('/admin/schedules'),
updateScheduleStatus: (id, data) => api.patch(`/admin/schedules/${id}/status`, data),
assignCollectors: (id, data) => api.patch(`/admin/schedules/${id}/collectors`, data),
  // User Management
  getUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  getUsersByRole: (role) => api.get(`/admin/users/role/${role}`),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateUserRole: (id, data) => api.patch(`/admin/users/${id}/role`, data),
  resetUserPassword: (id, data) => api.patch(`/admin/users/${id}/reset-password`, data),
  bulkDeleteUsers: (data) => api.post('/admin/users/bulk-delete', data),
  
  // Report Management
  updateReportStatus: (id, data) => api.put(`/admin/reports/${id}/status`, data),
  assignReport: (id, data) => api.put(`/admin/reports/${id}/assign`, data),
  getAllReports: (params) => api.get('/admin/reports', { params }),

  // ADD SCHEDULE MANAGEMENT METHODS
  getAllSchedules: () => api.get('/admin/schedules'),
  updateScheduleStatus: (id, data) => api.patch(`/admin/schedules/${id}/status`, data),
  assignCollectors: (id, data) => api.patch(`/admin/schedules/${id}/collectors`, data),
};

export default api;