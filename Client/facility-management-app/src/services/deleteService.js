import api from './api';

export const deleteData = async (id) => {
  try {
    const response = await api.delete(`/data/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
