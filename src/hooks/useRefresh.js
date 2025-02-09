import axios from "../api/axios";
import useAuthStore from "@/store/userStore";

const useRefreshToken = () => {
  const { setAccessToken } = useAuthStore();

  const refresh = async () => {
    const { data } = await axios.get("/api/auth/refresh", { withCredentials: true });
    setAccessToken(data.accessToken);
    return data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
