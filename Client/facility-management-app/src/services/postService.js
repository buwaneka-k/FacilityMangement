import api from './api';

export const postData = async (data) => {
  try {
    const response = await api.post('/data', data); // Example endpoint
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
