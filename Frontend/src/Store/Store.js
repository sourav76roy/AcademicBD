// zustand store for global state management
// this store is used to store the state of the application
// and to update the state of the application

import axios from "axios";
import create from "zustand";
import { devtools } from "zustand/middleware";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_serverURL });

// create Axios instance with interceptor for handling token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// create a stored state & api call
export const useStore = create(
  devtools((set) => ({
    // state of the application
    isUser: {
      user: null,
      isLogin: false,
      token: null,
      role: null,
    },
    books: [],
    userResults: [],
    users: [],
    allResults: [],
    allPaymentHistory: [],
    userPaymentHistory: [],

    // login action
    /**
     * @param {*} user data
     * @param {*} token
     * @param {*} isLogin
     * @param {*} user role
     */
    getLogin: (user, token, isLogin, role) => {
      set({
        isUser: {
          user: user,
          isLogin: isLogin,
          token: token,
          role: role,
        },
      });
    },

    // logout action
    logout: () => {
      localStorage.removeItem("authUser");
      set({
        isUser: { user: null, isLogin: false, token: null, role: null },
      });
    },

    // book action
    getBooks: (data) => {
      set({
        books: [...data],
      });
    },

    // get user result
    getUserResults: (data) => {
      set({
        userResults: [...data],
      });
    },

    // now get all users
    getAllUsers: async () => {
      try {
        const response = await axiosInstance.get("/auth/all-users");
        set({ users: response.data?.data ? response.data?.data : [] });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    // user role update
    updateUserRole: async (userId, role) => {
      try {
        const response = await axiosInstance.put(
          `/auth/update-user-role/${userId}`,
          {
            role,
          }
        );
        // console.log(response);
        // set({ users: response.data?.data ? response.data?.data : [] });
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    },

    // delete user
    deleteUser: async (userId) => {
      console.log("userId ", userId);
      try {
        const response = await axiosInstance.delete(
          `/auth/delete-user/${userId}`
        );

        console.log("response ", response);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },

    // get all result test
    getAllResultTest: async () => {
      try {
        const response = await axiosInstance.get("/result/all-results-marking");
        set({
          allResults: response?.data.results ? response?.data.results : [],
        });
      } catch (error) {
        console.log("getResultTest");
      }
    },

    // update user Result
    updateUserResult: async (resultId, data) => {
      try {
        const response = await axiosInstance.put(
          `/result/update-result/${resultId}`,
          data
        );
        console.log("response ", response);
        // recall getAllResultTest
      } catch (error) {
        console.error("Error updating user result:", error);
      }
    },

    // fetch user payment history
    getUserPaymentHistory: async (userId) => {
      try {
        const response = await axiosInstance.get(
          `/payment/user-payment-history/${userId}`
        );
        console.log("response ", response);
        set({
          userPaymentHistory: response?.data?.data ? response?.data?.data : [],
        });
      } catch (error) {
        console.error("Error fetching user payment history:", error);
      }
    },

    // payment
    paymentPost: async (data) => {
      try {
        const response = await axiosInstance.post("/payment/oder", data);
        // console.log("paymentPost response ", response);

        return response?.data?.data;
      } catch (err) {
        console.log("paymentPost err: ", err);
      }
    },

    // get all result test
    getAllPaymentHistory: async () => {
      try {
        const response = await axiosInstance.get("/payment/payment-history");
        set({
          allPaymentHistory: response?.data.data ? response?.data.data : [],
        });
      } catch (error) {
        console.log("getResultTest");
      }
    },
  }))
);
