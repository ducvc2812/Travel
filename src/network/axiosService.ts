import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosService.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an unauthorized (401) response
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("login 401");
            // Get the refresh token from the cookie
            // const refreshTokenAccount = getCookie('refreshTokenAccount');

            // Use your API endpoint to refresh the token
            // try {
            //     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVICE_URL}/sso-service/api/auth/refresh-token`, {
            //         headers: {
            //             Authorization: `Bearer ${refreshTokenAccount}`
            //         }
            //     });

                // Update the access token in the cookie
                // const newaccessTokenAccount = response.data.data.acceptToken;
                // setCookie('accessTokenAccount', newaccessTokenAccount);

                // Retry the original request with the new access token
                // originalRequest.headers.Authorization = `Bearer ${newaccessTokenAccount}`;
                // return axiosService(originalRequest);
            // } catch (refreshError) {
            //     // Handle the refresh error or redirect to the login page
            //     console.error('Error refreshing token:', refreshError);
            //     // Redirect to the login page or handle the error in another way
            //     // You might want to dispatch an action to logout the user
            //     // or redirect them to the login page
            //     throw refreshError;
            // }
        }

        return Promise.reject(error);
    }
);

export default axiosService;
