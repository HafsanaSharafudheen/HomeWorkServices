import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Get the API base URL from environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASEURL;

// Define the interface for the access token structure
interface AccessToken {
  token: string; // Adjust this based on your cookie's structure
}

// Create an Axios instance with default configuration
const instance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials for cross-origin requests
});

// Request Interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Extract access token from cookies
    const accessTokenCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='));

    if (accessTokenCookie) {
      // Parse the token and attach it to the Authorization header
      const accessToken: AccessToken = {
        token: accessTokenCookie.split('=')[1],
      };
      config.headers.Authorization = `Bearer ${accessToken.token}`;
    }

    return config; // Proceed with the updated config
  },
  (error) => {
    // Handle request errors
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Process the successful response
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      const { status, data } = error.response;

      // Handle specific error scenarios
      if (status === 403 && data.message === 'User blocked') {
        window.location.href = '/?isBlocked=true'; // Redirect if user is blocked
      }

      // Log or handle other specific HTTP errors here if needed
    }

    return Promise.reject(error); // Reject the promise with the error
  }
);

export default instance;
