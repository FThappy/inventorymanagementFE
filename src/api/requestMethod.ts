import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "../redux/store";

const BASE_URL = "http://localhost:8080/api/";

// const TOKEN = JSON?.parse(
//   JSON?.parse(localStorage?.getItem("persist:root"))?.currentUser
// )?.access_token;
// const EMAIL = JSON?.parse(
//   JSON?.parse(localStorage?.getItem("persist:root"))?.currentUser
// )?.email;

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc4OWJiYzczMjZkMDBjOTU0YjE3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5Mjk3ODI4OCwiZXhwIjoxNjkzMjM3NDg4fQ.Naxwjo9FR4m_wyd6nG60p67XOPLLMv5azQAR0-yqqpE"
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).accessToken);
// const EMAIL = 'admin123@gmail.com'
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { Authorization: `Bearer ${TOKEN}` },
//   params: {
//     email: EMAIL,
//   },
// });

const userRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
userRequest.interceptors.request.use(
  function (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    
    const res = store.getState()
    
    console.log(res);
    const TOKEN = res.currentUser.currentUser?.access_token
    const EMAIL = res.currentUser.currentUser?.email;

    const newParams = {
      ...request.params,
      email: EMAIL,
    };
    request.headers.Authorization = `Bearer ${TOKEN}`;
    request.params = newParams;
    return request;
  },

  function (error) {
    return Promise.reject(error);
  }
);
export { userRequest };
