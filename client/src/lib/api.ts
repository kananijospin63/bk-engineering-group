import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('bk_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('bk_token');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bk_user');
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/change-password', { currentPassword, newPassword }),
};

// ─── Public ───────────────────────────────────────────────────────────────────
export const projectsAPI = {
  getAll: (params?: Record<string, string | number>) =>
    api.get('/projects', { params }),
  getById: (id: number) => api.get(`/projects/${id}`),
  getCategories: () => api.get('/projects/categories'),
};

export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id: number) => api.get(`/services/${id}`),
};

export const blogAPI = {
  getAll: (params?: Record<string, string | number>) =>
    api.get('/blog', { params }),
  getBySlug: (slug: string) => api.get(`/blog/${slug}`),
  getCategories: () => api.get('/blog/categories'),
};

export const teamAPI = {
  getAll: () => api.get('/team'),
};

export const contactAPI = {
  send: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post('/contact', data),
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),

  // Projects — JSON avec URL image Uploadthing
  getProjects: () => api.get('/admin/projects'),
  createProject: (data: Record<string, string>) =>
    api.post('/admin/projects', data),
  updateProject: (id: number, data: Record<string, string>) =>
    api.put(`/admin/projects/${id}`, data),
  deleteProject: (id: number) => api.delete(`/admin/projects/${id}`),

  // Services
  getServices: () => api.get('/admin/services'),
  updateService: (id: number, data: Record<string, string>) =>
    api.put(`/admin/services/${id}`, data),

  // Team
  getTeam: () => api.get('/admin/team'),
  createTeamMember: (data: Record<string, string>) =>
    api.post('/admin/team', data),
  updateTeamMember: (id: number, data: Record<string, string>) =>
    api.put(`/admin/team/${id}`, data),
  deleteTeamMember: (id: number) => api.delete(`/admin/team/${id}`),

  // Blog
  getBlogPosts: () => api.get('/admin/blog'),
  createBlogPost: (data: Record<string, string>) =>
    api.post('/admin/blog', data),
  updateBlogPost: (id: number, data: Record<string, string>) =>
    api.put(`/admin/blog/${id}`, data),
  deleteBlogPost: (id: number) => api.delete(`/admin/blog/${id}`),

  // Messages
  getMessages: (params?: Record<string, string>) => api.get('/admin/messages', { params }),
  markMessageRead: (id: number) => api.put(`/admin/messages/${id}/read`),
  deleteMessage: (id: number) => api.delete(`/admin/messages/${id}`),
};

export default api;
