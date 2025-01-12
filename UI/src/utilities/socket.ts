import { io } from 'socket.io-client';
const apiBaseUrl = import.meta.env.VITE_API_BASEURL;


// Extract the access token from the cookies
const accessTokenCookie = document.cookie
  .split('; ')
  .find((row) => row.startsWith('access_token='));

const token = accessTokenCookie ? accessTokenCookie.split('=')[1] : null;

const socket = io(apiBaseUrl, {
    auth: {
        Authorization: `Bearer ${token}`, // Send the token explicitly
      },
    withCredentials: true,
  });



  export default socket;