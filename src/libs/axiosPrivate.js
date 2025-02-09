import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "@/hooks/useRefresh";
import useAuthStore from "@/store/userStore";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {accessToken} = useAuthStore()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                config.headers["Authorization"] = config.headers["Authorization"] || `Bearer ${accessToken}`;
                return config;
            },
            Promise.reject
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error?.response?.status === 403 && !error.config?.sent) {
                    error.config.sent = true;
                    error.config.headers["Authorization"] = `Bearer ${await refresh()}`;
                    return axiosPrivate(error.config);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
