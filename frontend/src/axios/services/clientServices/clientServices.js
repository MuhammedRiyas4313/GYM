
import { axiosClientInstance } from '../../axios';

  export const clientRegister = async (value) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axiosClientInstance.post('/clientregister', value, config);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log('error in clientRegister service')
    }
  };

  export const ClientLogin = async ( values ) => {
    try {
      const response = await axiosClientInstance.post('/clientlogin',values)
      return response;
    } catch (error) {
      console.log('error in client login......')
    }
  }