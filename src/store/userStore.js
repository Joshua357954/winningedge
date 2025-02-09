import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const mockUser = {
  name: "Uje Boyi",
  email: "boyijoshua72@gmail.com",
  balance: 100.0,
  userId: "mock123",
};

const mockDBD = {
    balance: { bal1: 0, bal2: 0 },
    dataLevel2: { totalInvestments: 0, totalEarnings: 0, activeInvestments: 0 },
    transactions: [],
  }

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")),
  accessToken: null,
  isAuthenticated: false,
  dashboardData: JSON.parse(localStorage.getItem("DashboardData")) || mockDBD,
  loading: false,
  error: null,

  fetchUser: async ({ id, email }) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("/api/profile", {
        params: { id, email },
      });
      set({ user: response.data.user, loading: false, isAuthenticated: true });
    } catch (error) {
      console.error("Failed to fetch user, using mock data", error);
      set({
        user: mockUser,
        loading: false,
        isAuthenticated: true,
        error: "Using mock data due to API failure",
      });
    }
  },

  login: (user, token) => {
    set({ user, accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
    Cookies.remove("refresh_token");
  },

  refreshAccessToken: async () => {
    try {
      const response = await axios.post(
        "/api/auth/refresh",
        {},
        { withCredentials: true }
      );
      set({ accessToken: response.data.accessToken, isAuthenticated: true });
    } catch (error) {
      console.error("Failed to refresh token", error);
      set({ user: null, accessToken: null, isAuthenticated: false });
    }
  },
  setAccessToken: (data) => set({ accessToken: data }),
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
  setDashboardData: (data) => {
    localStorage.setItem("DashboardData", JSON.stringify(data));
    set({ dashboardData: data });
  }
}));

export default useAuthStore;
