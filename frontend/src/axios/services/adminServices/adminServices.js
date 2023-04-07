import { axiosAdminInstance } from "../../axios";

export const AdminLogin = async ( values ) => {
    try {
      const response = await axiosAdminInstance.post('/login',values)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }