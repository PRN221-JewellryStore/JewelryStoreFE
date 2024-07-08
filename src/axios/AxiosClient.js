import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  timeout: 30000,
});

const noAuth = [
  {
    url: "/User/login",
    method: "post",
  },
  {
    url: "/User/register",
    method: "post",
  },
];

const onRequest = (config) => {
  const { url, method } = config;
  const permitAuthen = noAuth.some((o) => o.url === url && o.method === method);
  if (!permitAuthen) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
  }
  return config;
};

const onResponse = (response) => {
  return response.data;
};

const onError = (error) => {
  return Promise.reject(error);
};

axiosClient.interceptors.request.use(onRequest);
axiosClient.interceptors.response.use(onResponse, onError);

export { axiosClient };
