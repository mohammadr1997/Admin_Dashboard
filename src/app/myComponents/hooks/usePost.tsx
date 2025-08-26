import axios from 'axios';
interface dataProp {
  imageName: string;
  src: string;
  date: string;
  realDate: string;
}
export function usePost() {
  const postData = async (data: dataProp | dataProp[]) => {
    try {
      const response = await axios.post('/api/data', data);
      return response.data.data;
    } catch (error:unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Post error:', error);
        throw new Error(error.response?.data?.message || 'Post failed');
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error occurred');
      }
    }
  };

  return { postData };
}
