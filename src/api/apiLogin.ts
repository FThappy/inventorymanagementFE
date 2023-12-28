// eslint-disable-next-line no-unused-vars
import { publicRequest } from './requestMethod';

export const login = async ( username : string, password : string) => {
  const dataSend = {
    username: username,
    password: password,
  };
  try {
    const res = await publicRequest.post("/auth/login", dataSend);
    console.log(res.data);
    return res
  } catch (error : any) {
    console.log(error.response);
    throw error;
  }
};
