import axios from 'axios';

const axiosService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVICE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Add other headers if needed
    }
});

axiosService.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an unauthorized (401) response
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Your logic for refreshing the token
                // ...

                // Retry the original request with the new access token
                // const newAccessToken = 'your_new_access_token';
                // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Retry the original request with the new access token
                return await axiosService(originalRequest);
            } catch (refreshError) {
                // Handle the refresh error or redirect to the login page
                console.error('Error refreshing token:', refreshError);
                // You might want to dispatch an action to logout the user
                // or redirect them to the login page
                throw refreshError;
            }
        }

        return await Promise.reject(error);
    }
);

export default axiosService;
