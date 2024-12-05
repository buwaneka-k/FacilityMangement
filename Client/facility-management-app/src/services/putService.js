import api from './api';

export const putData = async (id, data) => {
  try {
    const response = await api.put(`/data/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};
