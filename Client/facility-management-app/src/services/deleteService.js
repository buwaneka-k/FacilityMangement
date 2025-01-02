import api from './api';

export const deleteData = async (url,id) => {
  try {
    const response = await api.delete(url+'/'+id);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
