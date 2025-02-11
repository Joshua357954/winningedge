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
};

// Function to check if running in the browser
const isBrowser = () => typeof window !== "undefined";

// Function to safely get data from localStorage
const getLocalStorage = (key, fallback) => {
  if (!isBrowser()) return fallback;
  try {
    const storedValue = localStorage?.getItem(key);
    return storedValue ? JSON?.parse(storedValue) : fallback;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
};

// Zustand store
const useAuthStore = create((set) => ({
  user: getLocalStorage("user", null),
  accessToken: null,
  isAuthenticated: !!getLocalStorage("user", null),
  dashboardData: getLocalStorage("DashboardData", mockDBD),
  loading: false,
  error: null,

  fetchUser: async ({ id, email }) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("/api/profile", {
        params: { id, email },
      });
      set({ user: response.data.user, loading: false, isAuthenticated: true });
      if (isBrowser()) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Failed to fetch user, using mock data", error);
      set({
        user: mockUser,
        loading: false,
        isAuthenticated: true,
        error: "Using mock data due to API failure",
      });
      if (isBrowser()) {
        localStorage.setItem("user", JSON.stringify(mockUser));
      }
    }
  },

  login: (user, token) => {
    set({ user, accessToken: token, isAuthenticated: true });
    if (isBrowser()) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  logout: () => {
    set({ user: null, accessToken: null, isAuthenticated: false });
    if (isBrowser()) {
      localStorage.removeItem("user");
      localStorage.removeItem("DashboardData");
    }
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
    set({ user: userData });
    if (isBrowser()) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  },

  setDashboardData: (data) => {
    set({ dashboardData: data });
    if (isBrowser()) {
      localStorage.setItem("DashboardData", JSON.stringify(data));
    }
  },
}));

export default useAuthStore;
