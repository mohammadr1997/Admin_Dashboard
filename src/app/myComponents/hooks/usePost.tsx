import axios from "axios";
interface dataProp{
  imageName:string,
  src:string,
date:string,
realDate:string
}
export function usePost() {
  const postData = async (data:dataProp) => {
    try {
      const response = await axios.post("/api/data", data);
      return response.data.data;
    } catch (error: any) {
      console.error("Post error:", error);
      throw new Error(error.response?.data?.message || "Post failed");
    }
  };

  return { postData };
}
