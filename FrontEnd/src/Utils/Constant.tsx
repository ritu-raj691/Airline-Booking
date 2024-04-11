import { Dayjs } from "dayjs";
//import jwt from "jsonwebtoken";

export const formatDayJsDate = (date: Dayjs | null) => {
  return new Date(date as any);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Split the token into its parts (header, payload, signature)
      const [headerEncoded, payloadEncoded, signature] = token.split(".");
      const decodedToken = JSON.parse(atob(payloadEncoded));
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds (30 mins expiry time)
      const currentTime = Date.now();
      if (currentTime > expirationTime) {
        return false; // Token expires
      } else {
        return true; // Token is valid
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    return false; // Token not found in local storage
  }

  return false;
};
