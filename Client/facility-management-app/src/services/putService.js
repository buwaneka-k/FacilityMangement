import api from './api';

export const putData = async (url,id, data) => {
  try {
    const response = await api.put(url+id, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};
