import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL 

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Post = (url, payload) => instance.post(url, payload);

export const Patch = (url, payload) => instance.patch(url, payload);

export const Delete = (url) => instance.delete(url);

export const Get = (url) => instance.get(url);

export const PostwithBuffer = (url, payload) =>
  instance.post(url, payload, {
    responseType: "arraybuffer",
    headers: { "Content-Type": "application/json" },
  });

export default instance;
