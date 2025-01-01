import api from './api';

export const postData = async (url,data) => {
  try {
    const response = await api.post(url, data); // Example endpoint
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
