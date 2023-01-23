import axios from "axios";

export const createInstance = (token) => {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  });
};
