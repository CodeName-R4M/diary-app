import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Diary API calls
export const createDiaryEntry = async (formData) => {
  const response = await api.post('/api/diary/entries', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getDiaryEntries = async () => {
  const response = await api.get('/api/diary/entries');
  return response.data;
};

export const getDiaryEntry = async (id) => {
  const response = await api.get(`/api/diary/entries/${id}`);
  return response.data;
};

export const deleteDiaryEntry = async (id) => {
  const response = await api.delete(`/api/diary/entries/${id}`);
  return response.data;
};

export default api;

